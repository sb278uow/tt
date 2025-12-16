import { ClassSession, ClassType, TeacherRating } from './types';

// Helper to create sessions quickly
const createSession = (
  id: string,
  subjectCode: string,
  subjectName: string,
  type: ClassType,
  day: string,
  start: string,
  end: string,
  room: string,
  teacher: string
): ClassSession => {
  const parseTime = (t: string) => {
    const [h, m] = t.split(':').map(Number);
    return h + m / 60;
  };

  return {
    id: `${subjectCode}-${type}-${id}`,
    subjectCode,
    subjectName,
    type,
    day: day as any,
    startTime: start,
    endTime: end,
    startFloat: parseTime(start),
    endFloat: parseTime(end),
    room,
    teacher: teacher.trim(),
  };
};

export const SENIOR_RATINGS: TeacherRating[] = [
  // CSIT115
  { name: 'Omar Daoudi', status: 'recommended', reason: 'Seniors say "Goat", good for lab.' },
  { name: 'Sonia Dagou', status: 'recommended', reason: 'Pretty good for lab.' },
  { name: 'Nkqubela Ruxwana', status: 'recommended', reason: '"Go for Nkqubela" for lecture.' },
  { name: 'Patrick Mukala', status: 'avoid', reason: 'Senior said "Sooooo bad, avoid him".' },
  { name: 'Hoda Elhamy', status: 'neutral', reason: 'Mixed reviews, others preferred.' },

  // CSIT127
  { name: 'Akanksha Singh', status: 'recommended', reason: 'Good for tutorial.' },
  { name: 'Manoj Kumar', status: 'avoid', reason: '"Avoid at all costs" for lecture.' },
  { name: 'Tina Thomas', status: 'avoid', reason: '"Avoid as much as u can", strictly 2nd option.' },
  { name: 'Obaid Ullah', status: 'avoid', reason: 'Senior said "Avoid".' },
  { name: 'Pradnya Bhagwat', status: 'recommended', reason: 'Good if you pay attention, slightly strict.' },
  { name: 'Suzan Sallam', status: 'recommended', reason: 'Rated "good" by seniors.' },
  { name: 'HC Lim', status: 'recommended', reason: 'Nice lecturer.' },

  // CSIT121
  { name: 'Muath Al Rammal', status: 'neutral', reason: 'No specific strong data, fallback.' },
  { name: 'Deepa Keshavamurthy', status: 'neutral', reason: 'Standard option.' },
];

export const RAW_CLASSES: ClassSession[] = [
  // --- CSIT115 ---
  createSession('1', 'CSIT115', 'Database Management', ClassType.Lab, 'Wednesday', '08:30', '10:30', '6.39', 'Omar Daoudi'),
  createSession('2', 'CSIT115', 'Database Management', ClassType.Lab, 'Wednesday', '12:30', '14:30', '1.52', 'Omar Daoudi'),
  createSession('3', 'CSIT115', 'Database Management', ClassType.Lab, 'Wednesday', '14:30', '16:30', '6.36', 'Sonia Dagou'),
  createSession('4', 'CSIT115', 'Database Management', ClassType.Lab, 'Friday', '14:30', '16:30', '6.33', 'Sonia Dagou'),
  createSession('5', 'CSIT115', 'Database Management', ClassType.Lab, 'Wednesday', '12:30', '14:30', '6.36', 'Sonia Dagou'),
  createSession('6', 'CSIT115', 'Database Management', ClassType.Lab, 'Friday', '10:30', '12:30', '2.50', 'Sonia Dagou'),
  createSession('7', 'CSIT115', 'Database Management', ClassType.Lab, 'Wednesday', '14:30', '16:30', '4.42', 'Sara Majeed'),
  createSession('8', 'CSIT115', 'Database Management', ClassType.Lab, 'Tuesday', '16:30', '18:30', '6.39', 'Sara Majeed'),
  createSession('9', 'CSIT115', 'Database Management', ClassType.Lab, 'Wednesday', '12:30', '14:30', '4.42', 'Sara Majeed'),
  createSession('10', 'CSIT115', 'Database Management', ClassType.Lab, 'Thursday', '08:30', '10:30', '6.36', 'Sara Azeem Khan'),
  createSession('11', 'CSIT115', 'Database Management', ClassType.Lab, 'Wednesday', '14:30', '16:30', '2.50', 'Sara Azeem Khan'),
  createSession('12', 'CSIT115', 'Database Management', ClassType.Lab, 'Wednesday', '12:30', '14:30', '2.50', 'Sara Azeem Khan'),
  createSession('13', 'CSIT115', 'Database Management', ClassType.Lab, 'Thursday', '12:30', '14:30', '6.36', 'Sara Azeem Khan'),
  createSession('14', 'CSIT115', 'Database Management', ClassType.Lab, 'Thursday', '14:30', '16:30', '6.36', 'Sara Azeem Khan'),
  createSession('15', 'CSIT115', 'Database Management', ClassType.Lab, 'Wednesday', '08:30', '10:30', '4.42', 'Sara Azeem Khan'),
  createSession('16', 'CSIT115', 'Database Management', ClassType.Lab, 'Thursday', '12:30', '14:30', '4.42', 'Hoda Elhamy'),
  createSession('17', 'CSIT115', 'Database Management', ClassType.Lab, 'Thursday', '14:30', '16:30', '4.42', 'Hoda Elhamy'),
  createSession('18', 'CSIT115', 'Database Management', ClassType.Lab, 'Friday', '10:30', '12:30', '1.52', 'Hoda Elhamy'),
  
  createSession('L1', 'CSIT115', 'Database Management', ClassType.Lecture, 'Tuesday', '08:30', '11:30', '2.62/63', 'Nkqubela Ruxwana'),
  createSession('L2', 'CSIT115', 'Database Management', ClassType.Lecture, 'Tuesday', '13:30', '16:30', '2.62/63', 'Nkqubela Ruxwana'),
  createSession('L3', 'CSIT115', 'Database Management', ClassType.Lecture, 'Thursday', '08:30', '11:30', '2.62/63', 'Patrick Mukala'),
  createSession('L4', 'CSIT115', 'Database Management', ClassType.Lecture, 'Wednesday', '08:30', '11:30', '2.62/63', 'Patrick Mukala'),

  // --- CSIT127 ---
  createSession('19', 'CSIT127', 'Networks', ClassType.Lab, 'Wednesday', '14:30', '16:30', '6.39', 'Obaid Ullah'),
  createSession('20', 'CSIT127', 'Networks', ClassType.Lab, 'Friday', '14:30', '16:30', '6.39', 'Obaid Ullah'),
  createSession('21', 'CSIT127', 'Networks', ClassType.Lab, 'Wednesday', '10:30', '12:30', '3.52', 'Manoj Kumar'),
  createSession('22', 'CSIT127', 'Networks', ClassType.Lab, 'Wednesday', '14:30', '16:30', '6.33', 'Akanksha Singh'),
  createSession('23', 'CSIT127', 'Networks', ClassType.Lab, 'Wednesday', '16:30', '18:30', '6.40', 'Akanksha Singh'),
  createSession('24', 'CSIT127', 'Networks', ClassType.Lab, 'Monday', '14:30', '16:30', '6.36', 'Tina Thomas'),
  createSession('25', 'CSIT127', 'Networks', ClassType.Lab, 'Tuesday', '11:30', '13:30', '6.36', 'Tina Thomas'),
  createSession('26', 'CSIT127', 'Networks', ClassType.Lab, 'Tuesday', '14:30', '16:30', '6.40', 'Tina Thomas'),
  createSession('27', 'CSIT127', 'Networks', ClassType.Lab, 'Thursday', '12:30', '14:30', '3.52', 'Akanksha Singh'),
  createSession('28', 'CSIT127', 'Networks', ClassType.Lab, 'Thursday', '14:30', '16:30', '3.52', 'Akanksha Singh'),
  createSession('29', 'CSIT127', 'Networks', ClassType.Lab, 'Monday', '14:30', '16:30', '3.52', 'Pradnya Bhagwat'),
  createSession('30', 'CSIT127', 'Networks', ClassType.Lab, 'Thursday', '14:30', '16:30', '2.50', 'Suzan Sallam'),
  createSession('31', 'CSIT127', 'Networks', ClassType.Lab, 'Wednesday', '12:30', '14:30', '3.52', 'Suzan Sallam'),
  createSession('32', 'CSIT127', 'Networks', ClassType.Lab, 'Thursday', '14:30', '16:30', '1.52', 'Pradnya Bhagwat'),
  createSession('33', 'CSIT127', 'Networks', ClassType.Lab, 'Wednesday', '10:30', '12:30', '2.50', 'Obaid Ullah'),
  createSession('34', 'CSIT127', 'Networks', ClassType.Lab, 'Wednesday', '16:30', '18:30', '6.33', 'Obaid Ullah'),
  createSession('35', 'CSIT127', 'Networks', ClassType.Lab, 'Friday', '10:30', '12:30', '6.33', 'Obaid Ullah'),

  createSession('L5', 'CSIT127', 'Networks', ClassType.Lecture, 'Monday', '08:30', '10:30', '2.62/63', 'Akanksha Singh'),
  createSession('L6', 'CSIT127', 'Networks', ClassType.Lecture, 'Monday', '10:30', '12:30', '2.62/63', 'Akanksha Singh'),
  createSession('L7', 'CSIT127', 'Networks', ClassType.Lecture, 'Monday', '08:30', '10:30', '2.66/67', 'Manoj Kumar'),
  createSession('L8', 'CSIT127', 'Networks', ClassType.Lecture, 'Monday', '10:30', '12:30', '2.66/67', 'Manoj Kumar'),

  createSession('T1', 'CSIT127', 'Networks', ClassType.Tutorial, 'Wednesday', '11:30', '12:30', '5.19', 'Suzan Sallam'),
  createSession('T2', 'CSIT127', 'Networks', ClassType.Tutorial, 'Tuesday', '12:30', '13:30', '3.48', 'Pradnya Bhagwat'),
  createSession('T3', 'CSIT127', 'Networks', ClassType.Tutorial, 'Tuesday', '12:30', '13:30', '4.45', 'Suzan Sallam'),
  createSession('T4', 'CSIT127', 'Networks', ClassType.Tutorial, 'Monday', '12:30', '13:30', '3.48', 'Tina Thomas'),
  createSession('T5', 'CSIT127', 'Networks', ClassType.Tutorial, 'Tuesday', '10:30', '11:30', '4.45', 'Tina Thomas'),
  createSession('T6', 'CSIT127', 'Networks', ClassType.Tutorial, 'Monday', '13:30', '14:30', '3.48', 'Tina Thomas'),
  createSession('T7', 'CSIT127', 'Networks', ClassType.Tutorial, 'Thursday', '08:30', '09:30', '4.50', 'Akanksha Singh'),
  createSession('T8', 'CSIT127', 'Networks', ClassType.Tutorial, 'Thursday', '09:30', '10:30', '4.50', 'Akanksha Singh'),
  createSession('T9', 'CSIT127', 'Networks', ClassType.Tutorial, 'Monday', '12:30', '13:30', '4.48', 'Pradnya Bhagwat'),
  createSession('T10', 'CSIT127', 'Networks', ClassType.Tutorial, 'Monday', '09:30', '10:30', '3.46', 'Pradnya Bhagwat'),
  createSession('T11', 'CSIT127', 'Networks', ClassType.Tutorial, 'Monday', '13:30', '14:30', '4.48', 'Pradnya Bhagwat'),
  createSession('T12', 'CSIT127', 'Networks', ClassType.Tutorial, 'Tuesday', '15:30', '16:30', '4.45', 'Pradnya Bhagwat'),
  createSession('T13', 'CSIT127', 'Networks', ClassType.Tutorial, 'Tuesday', '13:30', '14:30', '3.48', 'Pradnya Bhagwat'),

  // --- CSIT121 ---
  createSession('36', 'CSIT121', 'OO Design', ClassType.Lab, 'Friday', '08:30', '10:30', '1.52', 'Hoda Elhamy'),
  createSession('37', 'CSIT121', 'OO Design', ClassType.Lab, 'Friday', '14:30', '16:30', '1.52', 'Hoda Elhamy'),
  createSession('38', 'CSIT121', 'OO Design', ClassType.Lab, 'Thursday', '14:30', '16:30', '6.40', 'Sonia Dagou'),
  createSession('39', 'CSIT121', 'OO Design', ClassType.Lab, 'Thursday', '12:30', '14:30', '6.40', 'Sonia Dagou'),
  createSession('40', 'CSIT121', 'OO Design', ClassType.Lab, 'Thursday', '12:30', '14:30', '1.52', 'Deepa Keshavamurthy'),
  createSession('41', 'CSIT121', 'OO Design', ClassType.Lab, 'Thursday', '10:30', '12:30', '1.52', 'Deepa Keshavamurthy'),
  createSession('42', 'CSIT121', 'OO Design', ClassType.Lab, 'Tuesday', '12:30', '14:30', '6.33', 'Deepa Keshavamurthy'),
  createSession('43', 'CSIT121', 'OO Design', ClassType.Lab, 'Tuesday', '14:30', '16:30', '6.33', 'Deepa Keshavamurthy'),
  createSession('44', 'CSIT121', 'OO Design', ClassType.Lab, 'Tuesday', '08:30', '10:30', '6.36', 'Omar Daoudi'),
  createSession('45', 'CSIT121', 'OO Design', ClassType.Lab, 'Wednesday', '14:30', '16:30', '1.52', 'Omar Daoudi'),
  createSession('46', 'CSIT121', 'OO Design', ClassType.Lab, 'Tuesday', '12:30', '14:30', '1.52', 'Omar Daoudi'),
  createSession('47', 'CSIT121', 'OO Design', ClassType.Lab, 'Tuesday', '14:30', '16:30', '1.52', 'Omar Daoudi'),
  createSession('48', 'CSIT121', 'OO Design', ClassType.Lab, 'Thursday', '12:30', '14:30', '6.39', 'Omar Daoudi'),
  createSession('49', 'CSIT121', 'OO Design', ClassType.Lab, 'Thursday', '08:30', '10:30', '1.52', 'Omar Daoudi'),
  createSession('50', 'CSIT121', 'OO Design', ClassType.Lab, 'Tuesday', '14:30', '16:30', '6.39', 'Obaid Ullah'),
  createSession('51', 'CSIT121', 'OO Design', ClassType.Lab, 'Tuesday', '12:30', '14:30', '6.39', 'Obaid Ullah'),
  createSession('52', 'CSIT121', 'OO Design', ClassType.Lab, 'Tuesday', '08:30', '10:30', '6.33', 'Obaid Ullah'),

  createSession('L9', 'CSIT121', 'OO Design', ClassType.Lecture, 'Monday', '13:30', '16:30', '2.62/63', 'HC Lim'),
  createSession('L10', 'CSIT121', 'OO Design', ClassType.Lecture, 'Tuesday', '08:30', '11:30', '2.66/67', 'Muath Al Rammal'),
  createSession('L11', 'CSIT121', 'OO Design', ClassType.Lecture, 'Wednesday', '08:30', '11:30', '2.66/67', 'HC Lim'),
  createSession('L12', 'CSIT121', 'OO Design', ClassType.Lecture, 'Thursday', '08:30', '11:30', '2.66/67', 'Muath Al Rammal'),
];
