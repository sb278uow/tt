import React from 'react';
import { clsx } from 'clsx';
import { Check } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
}

const steps = [
  { id: 1, name: 'Preferences' },
  { id: 2, name: 'Teachers' },
  { id: 3, name: 'Results' },
];

export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  return (
    <nav aria-label="Progress" className="mb-8">
      <ol role="list" className="flex items-center">
        {steps.map((step, stepIdx) => {
          const isComplete = currentStep > step.id;
          const isCurrent = currentStep === step.id;

          return (
            <li key={step.name} className={clsx(stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : '', 'relative')}>
              {stepIdx !== steps.length - 1 ? (
                <div className="absolute top-4 left-0 -ml-px mt-0.5 h-0.5 w-full bg-indigo-600/20" aria-hidden="true" />
              ) : null}
              <div className="group relative flex items-center gap-x-2">
                <span className="flex h-9 items-center">
                  <span
                    className={clsx(
                      'relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2',
                      isComplete ? 'bg-indigo-600 border-indigo-600' : 
                      isCurrent ? 'border-indigo-600 bg-white' : 'border-gray-300 bg-white'
                    )}
                  >
                    {isComplete ? (
                      <Check className="h-5 w-5 text-white" aria-hidden="true" />
                    ) : (
                      <span className={clsx('h-2.5 w-2.5 rounded-full', isCurrent ? 'bg-indigo-600' : 'bg-transparent')} />
                    )}
                  </span>
                </span>
                <span className={clsx('ml-2 text-sm font-medium', isCurrent ? 'text-indigo-600' : 'text-gray-500')}>
                  {step.name}
                </span>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
