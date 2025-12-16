import React, { useState } from 'react';
import { DayOfWeek, Timetable } from './types';
import { generateTimetables } from './services/scheduleService';
import { StepIndicator } from './components/StepIndicator';
import { PreferenceForm } from './components/PreferenceForm';
import { TeacherForm } from './components/TeacherForm';
import { TimetableGrid } from './components/TimetableGrid';
import { GraduationCap, AlertCircle, RefreshCcw } from 'lucide-react';

function App() {
  const [step, setStep] = useState(1);
  const [preferredDays, setPreferredDays] = useState<DayOfWeek[]>(['Monday', 'Tuesday', 'Wednesday']);
  const [mustHaveTeachers, setMustHaveTeachers] = useState<string[]>([]);
  const [avoidTeachers, setAvoidTeachers] = useState<string[]>([]);
  const [results, setResults] = useState<Timetable[]>([]);

  const handleGenerate = () => {
    const timetables = generateTimetables({
      preferredDays,
      mustHaveTeachers,
      avoidTeachers
    });
    setResults(timetables);
    setStep(3);
  };

  const reset = () => {
    setStep(1);
    setResults([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pb-20">
      {/* Header */}
      <header className="bg-indigo-700 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-8 w-8 text-indigo-200" />
            <span className="text-xl font-bold tracking-tight">UniSchedule Optimizer</span>
          </div>
          {step === 3 && (
            <button 
              onClick={reset}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 rounded text-sm transition-colors"
            >
              <RefreshCcw size={16} /> Start Over
            </button>
          )}
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {step < 3 && (
          <div className="flex justify-center mb-10">
            <StepIndicator currentStep={step} />
          </div>
        )}

        {step === 1 && (
          <PreferenceForm
            preferredDays={preferredDays}
            setPreferredDays={setPreferredDays}
            onNext={() => setStep(2)}
          />
        )}

        {step === 2 && (
          <TeacherForm
            mustHave={mustHaveTeachers}
            setMustHave={setMustHaveTeachers}
            avoid={avoidTeachers}
            setAvoid={setAvoidTeachers}
            onNext={handleGenerate}
            onBack={() => setStep(1)}
          />
        )}

        {step === 3 && (
          <div className="space-y-8 animate-in fade-in duration-500">
            {results.length === 0 ? (
              <div className="text-center bg-white p-12 rounded-xl shadow-sm border border-red-100">
                <div className="inline-flex bg-red-100 p-4 rounded-full mb-4">
                  <AlertCircle className="w-10 h-10 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">No schedules found</h2>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  We couldn't fit all classes with your current strict preferences. 
                  Try removing some "Avoid" teachers or adding more preferred days.
                </p>
                <button
                  onClick={() => setStep(2)}
                  className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
                >
                  Adjust Preferences
                </button>
              </div>
            ) : (
              <>
                <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r-lg">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <GraduationCap className="h-5 w-5 text-indigo-500" aria-hidden="true" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-indigo-700">
                        Found <span className="font-bold">{results.length}</span> possible timetables. 
                        Sorted by fewest days and best teacher ratings.
                      </p>
                    </div>
                  </div>
                </div>

                {results.map((timetable, idx) => (
                  <TimetableGrid key={idx} timetable={timetable} index={idx} />
                ))}
              </>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
