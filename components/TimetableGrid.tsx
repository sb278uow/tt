import React from 'react';
import { Timetable, ClassSession } from '../types';
import { Download } from 'lucide-react';

interface TimetableGridProps {
  timetable: Timetable;
  index: number;
}

const HOURS = Array.from({ length: 11 }, (_, i) => i + 8); // 8am to 6pm
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const getPositionStyle = (start: number, end: number) => {
  // Grid starts at 8:00 (row 1). Each hour is roughly 60px height.
  // 8:30 -> 8.5. Row index logic relative to 8.
  const startOffset = (start - 8) * 4; // 15 min increments = 1 unit
  const duration = (end - start) * 4;
  return {
    top: `${startOffset * 1.5}rem`, // 1.5rem ~ 6 units tailwind
    height: `${duration * 1.5}rem`
  };
};

const SubjectColor: Record<string, string> = {
  'CSIT115': 'bg-blue-100 border-blue-300 text-blue-800',
  'CSIT127': 'bg-purple-100 border-purple-300 text-purple-800',
  'CSIT121': 'bg-orange-100 border-orange-300 text-orange-800',
};

export const TimetableGrid: React.FC<TimetableGridProps> = ({ timetable, index }) => {
  const sessionsByDay = (day: string) => timetable.sessions.filter(s => s.day === day);

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden mb-12">
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Option #{index + 1}</h3>
          <div className="text-sm text-gray-500 mt-1 flex gap-4">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              {timetable.daysCount} Days on Campus
            </span>
            <span className="flex items-center gap-1">
               <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
               Score: {timetable.score}
            </span>
          </div>
        </div>
        <button 
          onClick={() => window.print()}
          className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors"
          title="Print / Save PDF"
        >
          <Download size={20} />
        </button>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[800px] p-4">
          <div className="grid grid-cols-6 gap-2">
            {/* Header */}
            <div className="col-span-1"></div>
            {DAYS.map(d => (
              <div key={d} className="text-center font-semibold text-gray-600 py-2 bg-gray-50 rounded">
                {d.slice(0, 3)}
              </div>
            ))}

            {/* Time Grid */}
            <div className="col-span-6 relative mt-2" style={{ height: '700px' }}>
              {/* Background Lines */}
              {HOURS.map((h, i) => (
                <div key={h} className="absolute w-full border-t border-gray-100 text-xs text-gray-400 pl-2" style={{ top: `${i * 4 * 1.5}rem` }}>
                  {h}:00
                </div>
              ))}

              {/* Sessions */}
              <div className="absolute inset-0 grid grid-cols-6 gap-2 pl-2">
                <div className="col-span-1 border-r border-gray-100"></div> {/* Time Col */}
                
                {DAYS.map((day) => (
                  <div key={day} className="col-span-1 relative h-full border-r border-gray-50">
                    {sessionsByDay(day).map((session) => (
                      <div
                        key={session.id}
                        className={`absolute w-[95%] left-[2.5%] rounded p-2 text-xs border border-l-4 shadow-sm z-10 overflow-hidden ${SubjectColor[session.subjectCode] || 'bg-gray-100'}`}
                        style={getPositionStyle(session.startFloat, session.endFloat)}
                      >
                        <div className="font-bold truncate">{session.subjectCode} {session.type === 'Computer Lab' ? 'Lab' : session.type}</div>
                        <div className="truncate">{session.startTime} - {session.endTime}</div>
                        <div className="truncate text-gray-600 mt-1">{session.room}</div>
                        <div className="font-medium mt-1 truncate">{session.teacher}</div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
