import { TimeRemaining } from '../types';

export const calculateTimeRemaining = (targetDate: Date): TimeRemaining => {
  const now = new Date();
  // Set target to beginning of day (00:00:00) if we just want day difference, 
  // but for a countdown, we usually target 8:00 AM of that day or just midnight.
  // Let's target Midnight (00:00:00) of the target date.
  const target = new Date(targetDate);
  target.setHours(0, 0, 0, 0);

  const diff = target.getTime() - now.getTime();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, totalSeconds: 0 };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds, totalSeconds: diff / 1000 };
};

export const formatROCDate = (date: Date): string => {
  const year = date.getFullYear() - 1911;
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}/${month}/${day}`;
};

export const getDayOfWeek = (date: Date): string => {
  const days = ['週日', '週一', '週二', '週三', '週四', '週五', '週六'];
  return days[date.getDay()];
};
