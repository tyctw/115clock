import React from 'react';
import { ExamEvent } from '../types';
import { formatROCDate, getDayOfWeek } from '../utils/dateUtils';
import { CheckCircle2, Circle, CalendarDays, MapPin } from 'lucide-react';

interface EventTimelineProps {
  events: ExamEvent[];
}

export const EventTimeline: React.FC<EventTimelineProps> = ({ events }) => {
  const now = new Date();
  now.setHours(0, 0, 0, 0); // Normalize today

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        <CalendarDays className="text-blue-600" />
        重要日程表 (民國115年)
      </h3>
      
      <div className="relative pl-4">
        {/* Vertical Line */}
        <div className="absolute left-[27px] top-2 bottom-4 w-0.5 bg-slate-200" />

        <div className="space-y-8">
          {events.map((event) => {
            const isPast = event.endDate ? event.endDate < now : event.startDate < now;
            // Check if today is within the range
            const isCurrent = (() => {
                if (event.endDate) {
                    return now >= event.startDate && now <= event.endDate;
                }
                return now.getTime() === event.startDate.getTime();
            })();

            return (
              <div key={event.id} className={`relative flex gap-4 group ${isPast ? 'opacity-60' : ''}`}>
                {/* Icon Node */}
                <div className={`relative z-10 flex-shrink-0 w-6 h-6 mt-1 rounded-full border-2 flex items-center justify-center bg-white
                  ${isCurrent ? 'border-blue-600 text-blue-600 scale-125 shadow-md shadow-blue-200' : 
                    isPast ? 'border-slate-400 text-slate-400' : 'border-slate-300 text-slate-300'}`}
                >
                  {isPast ? <CheckCircle2 size={16} /> : isCurrent ? <MapPin size={16} className="fill-blue-600 text-white" /> : <Circle size={12} className="fill-white" />}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h4 className={`font-bold text-lg ${isCurrent ? 'text-blue-700' : 'text-slate-800'}`}>
                      {event.title}
                    </h4>
                    <span className={`text-sm font-mono ${isCurrent ? 'text-blue-600 font-bold' : 'text-slate-500'}`}>
                      {formatROCDate(event.startDate)} ({getDayOfWeek(event.startDate)})
                    </span>
                  </div>
                  
                  <p className="text-slate-600 mt-1 text-sm">
                    {event.note}
                  </p>

                  {event.isMainExam && !isPast && (
                    <div className="mt-2 inline-block px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full">
                      關鍵決戰日
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
