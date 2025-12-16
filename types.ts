export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';

export enum ClassType {
  Lecture = 'Lecture',
  Lab = 'Computer Lab',
  Tutorial = 'Tutorial',
}

export interface ClassSession {
  id: string;
  subjectCode: string;
  subjectName: string;
  type: ClassType;
  day: DayOfWeek;
  startTime: string; // "08:30"
  endTime: string;   // "10:30"
  startFloat: number; // 8.5
  endFloat: number;   // 10.5
  room: string;
  teacher: string;
}

export interface TeacherRating {
  name: string;
  status: 'recommended' | 'avoid' | 'neutral';
  reason?: string;
}

export interface Timetable {
  sessions: ClassSession[];
  daysCount: number;
  score: number; // Higher is better
  warnings: string[];
}

export interface UserPreferences {
  preferredDays: DayOfWeek[];
  mustHaveTeachers: string[];
  avoidTeachers: string[];
}
