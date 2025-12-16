import { RAW_CLASSES } from '../constants';
import { ClassSession, ClassType, Timetable, UserPreferences } from '../types';

export const getUniqueTeachers = () => {
  const teachers = Array.from(new Set(RAW_CLASSES.map(c => c.teacher))).sort();
  return teachers;
};

// Check if two sessions overlap
const hasOverlap = (s1: ClassSession, s2: ClassSession): boolean => {
  if (s1.day !== s2.day) return false;
  return Math.max(s1.startFloat, s2.startFloat) < Math.min(s1.endFloat, s2.endFloat);
};

// Cartesian Product generator
function cartesian<T>(...a: T[][]): T[][] {
  return a.reduce((a, b) => a.flatMap(d => b.map(e => [d, e].flat())), [[]] as any);
}

export const generateTimetables = (prefs: UserPreferences): Timetable[] => {
  // 1. Filter out absolutely avoided teachers immediately
  const safeClasses = RAW_CLASSES.filter(c => !prefs.avoidTeachers.includes(c.teacher));

  // 2. Group by Subject and Type
  const getOptions = (code: string, type: ClassType) => 
    safeClasses.filter(c => c.subjectCode === code && c.type === type);

  // CSIT115 Components
  const c115Lec = getOptions('CSIT115', ClassType.Lecture);
  const c115Lab = getOptions('CSIT115', ClassType.Lab);

  // CSIT127 Components
  const c127Lec = getOptions('CSIT127', ClassType.Lecture);
  const c127Lab = getOptions('CSIT127', ClassType.Lab);
  const c127Tut = getOptions('CSIT127', ClassType.Tutorial);

  // CSIT121 Components
  const c121Lec = getOptions('CSIT121', ClassType.Lecture);
  const c121Lab = getOptions('CSIT121', ClassType.Lab);

  // Valid Combinations for each subject (Internal Overlap Check)
  const valid115: ClassSession[][] = [];
  for (const lec of c115Lec) {
    for (const lab of c115Lab) {
      if (!hasOverlap(lec, lab)) valid115.push([lec, lab]);
    }
  }

  const valid127: ClassSession[][] = [];
  for (const lec of c127Lec) {
    for (const lab of c127Lab) {
      if (hasOverlap(lec, lab)) continue;
      for (const tut of c127Tut) {
        if (!hasOverlap(lec, tut) && !hasOverlap(lab, tut)) valid127.push([lec, lab, tut]);
      }
    }
  }

  const valid121: ClassSession[][] = [];
  for (const lec of c121Lec) {
    for (const lab of c121Lab) {
      if (!hasOverlap(lec, lab)) valid121.push([lec, lab]);
    }
  }

  // 3. Limit options for performance if too many
  // We prioritize sessions on preferred days first in the subsets to prune search space
  const prioritize = (sessionsList: ClassSession[][]) => {
    return sessionsList.sort((a, b) => {
      const aBadDays = a.filter(s => !prefs.preferredDays.includes(s.day)).length;
      const bBadDays = b.filter(s => !prefs.preferredDays.includes(s.day)).length;
      return aBadDays - bBadDays;
    }).slice(0, 50); // Take top 50 valid configs per subject to prevent combinatorial explosion (50^3 = 125k checks)
  };

  const best115 = prioritize(valid115);
  const best127 = prioritize(valid127);
  const best121 = prioritize(valid121);

  // 4. Combine Subjects (Full Cartesian)
  const allTimetables: Timetable[] = [];

  for (const s115 of best115) {
    for (const s127 of best127) {
      // Quick check overlap between 115 and 127
      let clash = false;
      for (const s1 of s115) {
        for (const s2 of s127) {
          if (hasOverlap(s1, s2)) { clash = true; break; }
        }
        if (clash) break;
      }
      if (clash) continue;

      for (const s121 of best121) {
        // Check overlap with 121
        let clashFinal = false;
        const currentSet = [...s115, ...s127];
        for (const s3 of s121) {
          for (const existing of currentSet) {
            if (hasOverlap(s3, existing)) { clashFinal = true; break; }
          }
          if (clashFinal) break;
        }

        if (!clashFinal) {
          const fullSchedule = [...s115, ...s127, ...s121];
          const uniqueDays = new Set(fullSchedule.map(s => s.day)).size;
          
          // Scoring Logic
          let score = 1000;
          score -= (uniqueDays * 50); // Penalty for each day on campus

          // Penalty for non-preferred days
          fullSchedule.forEach(s => {
            if (!prefs.preferredDays.includes(s.day)) score -= 20;
          });

          // Bonus for preferred teachers
          fullSchedule.forEach(s => {
            if (prefs.mustHaveTeachers.includes(s.teacher)) score += 30;
          });

          allTimetables.push({
            sessions: fullSchedule,
            daysCount: uniqueDays,
            score,
            warnings: []
          });
        }
      }
    }
  }

  // Sort: Fewest Days > Highest Score
  return allTimetables.sort((a, b) => b.score - a.score).slice(0, 20); // Return top 20
};
