import React, { useState, useEffect } from 'react';
import { TimeRemaining } from '../types';
import { calculateTimeRemaining } from '../utils/dateUtils';
import { Timer, CalendarClock } from 'lucide-react';

interface CountdownDisplayProps {
  targetDate: Date;
  title: string;
  subtitle?: string;
  isHighlight?: boolean;
}

export const CountdownDisplay: React.FC<CountdownDisplayProps> = ({ targetDate, title, subtitle, isHighlight }) => {
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>(calculateTimeRemaining(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeRemaining(targetDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const isArrived = timeLeft.totalSeconds <= 0;

  return (
    <div className={`relative overflow-hidden rounded-2xl p-6 shadow-lg transition-all duration-300 hover:shadow-xl ${
      isHighlight 
        ? 'bg-gradient-to-br from-blue-600 to-indigo-700 text-white ring-4 ring-blue-100' 
        : 'bg-white text-slate-800 border border-slate-200'
    }`}>
      {/* Decorative Icon Background */}
      <div className="absolute -right-6 -top-6 opacity-10 rotate-12">
        {isHighlight ? <Timer size={150} /> : <CalendarClock size={150} />}
      </div>

      <div className="relative z-10 flex flex-col h-full justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className={`text-lg font-bold tracking-wide uppercase ${isHighlight ? 'text-blue-100' : 'text-slate-500'}`}>
              {title}
            </h2>
            {isHighlight && <span className="bg-amber-400 text-amber-900 text-xs font-bold px-2 py-0.5 rounded-full">TARGET</span>}
          </div>
          {subtitle && <p className={`text-sm ${isHighlight ? 'text-blue-200' : 'text-slate-400'}`}>{subtitle}</p>}
        </div>

        <div className="mt-6">
          {isArrived ? (
            <div className="text-3xl font-bold">
              {isHighlight ? '考試開始 / 已結束' : '今日發生'}
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-2 text-center">
              <TimeUnit value={timeLeft.days} label="天" isHighlight={isHighlight} />
              <TimeUnit value={timeLeft.hours} label="時" isHighlight={isHighlight} />
              <TimeUnit value={timeLeft.minutes} label="分" isHighlight={isHighlight} />
              <TimeUnit value={timeLeft.seconds} label="秒" isHighlight={isHighlight} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const TimeUnit: React.FC<{ value: number; label: string; isHighlight?: boolean }> = ({ value, label, isHighlight }) => (
  <div className={`flex flex-col items-center p-2 rounded-lg ${isHighlight ? 'bg-white/10 backdrop-blur-sm' : 'bg-slate-100'}`}>
    <span className={`text-2xl sm:text-3xl font-mono font-bold ${isHighlight ? 'text-white' : 'text-slate-800'}`}>
      {value}
    </span>
    <span className={`text-xs ${isHighlight ? 'text-blue-200' : 'text-slate-500'}`}>{label}</span>
  </div>
);
