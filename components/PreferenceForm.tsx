import React from 'react';
import { DayOfWeek } from '../types';
import { Calendar } from 'lucide-react';

interface PreferenceFormProps {
  preferredDays: DayOfWeek[];
  setPreferredDays: (days: DayOfWeek[]) => void;
  onNext: () => void;
}

const DAYS: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

export const PreferenceForm: React.FC<PreferenceFormProps> = ({ preferredDays, setPreferredDays, onNext }) => {
  
  const toggleDay = (day: DayOfWeek) => {
    if (preferredDays.includes(day)) {
      setPreferredDays(preferredDays.filter(d => d !== day));
    } else {
      setPreferredDays([...preferredDays, day]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-indigo-600" />
          Which days do you prefer to be on campus?
        </h2>
        <p className="text-gray-500 mb-6 text-sm">
          We will try to squeeze all your classes into these days. Fewer days selected = more compact schedule.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {DAYS.map(day => (
            <button
              key={day}
              onClick={() => toggleDay(day)}
              className={`
                px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
                ${preferredDays.includes(day)
                  ? 'bg-indigo-600 text-white shadow-md transform scale-105'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'}
              `}
            >
              {day}
            </button>
          ))}
        </div>
        
        {preferredDays.length === 0 && (
          <p className="text-red-500 text-xs mt-2">Please select at least one day.</p>
        )}
      </div>

      <div className="flex justify-end">
        <button
          onClick={onNext}
          disabled={preferredDays.length === 0}
          className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-sm transition-colors"
        >
          Next Step
        </button>
      </div>
    </div>
  );
};
