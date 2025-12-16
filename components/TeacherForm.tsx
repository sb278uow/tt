import React from 'react';
import { SENIOR_RATINGS } from '../constants';
import { getUniqueTeachers } from '../services/scheduleService';
import { ThumbsUp, ThumbsDown, AlertTriangle } from 'lucide-react';

interface TeacherFormProps {
  mustHave: string[];
  setMustHave: React.Dispatch<React.SetStateAction<string[]>>;
  avoid: string[];
  setAvoid: React.Dispatch<React.SetStateAction<string[]>>;
  onNext: () => void;
  onBack: () => void;
}

export const TeacherForm: React.FC<TeacherFormProps> = ({
  mustHave, setMustHave, avoid, setAvoid, onNext, onBack
}) => {
  const teachers = getUniqueTeachers();

  const toggleMustHave = (t: string) => {
    if (mustHave.includes(t)) setMustHave(mustHave.filter(x => x !== t));
    else {
      setMustHave([...mustHave, t]);
      setAvoid(avoid.filter(x => x !== t)); // Can't be both
    }
  };

  const toggleAvoid = (t: string) => {
    if (avoid.includes(t)) setAvoid(avoid.filter(x => x !== t));
    else {
      setAvoid([...avoid, t]);
      setMustHave(mustHave.filter(x => x !== t));
    }
  };

  const getSeniorFeedback = (name: string) => {
    return SENIOR_RATINGS.find(r => r.name === name);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Teacher Preferences</h2>
        <p className="text-gray-500 text-sm mb-6">
          Based on the senior's chat logs, we've highlighted recommended teachers.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {teachers.map(teacher => {
            const rating = getSeniorFeedback(teacher);
            const isRec = rating?.status === 'recommended';
            const isAvoid = rating?.status === 'avoid';

            return (
              <div 
                key={teacher} 
                className={`
                  p-4 rounded-lg border transition-all
                  ${mustHave.includes(teacher) ? 'border-green-500 bg-green-50 ring-1 ring-green-500' : 
                    avoid.includes(teacher) ? 'border-red-500 bg-red-50 ring-1 ring-red-500' : 'border-gray-200 bg-white hover:border-indigo-300'}
                `}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="font-medium text-gray-900">{teacher}</span>
                  {isRec && <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full flex items-center gap-1"><ThumbsUp size={10}/> Good</span>}
                  {isAvoid && <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full flex items-center gap-1"><AlertTriangle size={10}/> Avoid</span>}
                </div>
                
                {rating?.reason && (
                  <p className="text-xs text-gray-500 italic mb-3">"{rating.reason}"</p>
                )}

                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => toggleMustHave(teacher)}
                    className={`flex-1 text-xs py-1.5 rounded border flex items-center justify-center gap-1
                      ${mustHave.includes(teacher) ? 'bg-green-600 text-white border-green-600' : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'}
                    `}
                  >
                    <ThumbsUp size={12} /> Want
                  </button>
                  <button
                    onClick={() => toggleAvoid(teacher)}
                    className={`flex-1 text-xs py-1.5 rounded border flex items-center justify-center gap-1
                      ${avoid.includes(teacher) ? 'bg-red-600 text-white border-red-600' : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'}
                    `}
                  >
                    <ThumbsDown size={12} /> Avoid
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-between">
        <button onClick={onBack} className="text-gray-600 hover:text-gray-900 font-medium px-4">
          Back
        </button>
        <button
          onClick={onNext}
          className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 font-medium shadow-sm"
        >
          Generate Timetable
        </button>
      </div>
    </div>
  );
};
