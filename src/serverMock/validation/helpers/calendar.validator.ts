import { Months } from '../../types';

const days: Record<Months, number> = {
  [Months.JAN]: 31,
  [Months.FEB]: 29,
  [Months.MAR]: 31,
  [Months.APR]: 30,
  [Months.MAY]: 31,
  [Months.JUN]: 30,
  [Months.JUL]: 31,
  [Months.AUG]: 31,
  [Months.SEP]: 30,
  [Months.OCT]: 31,
  [Months.NOV]: 30,
  [Months.DEC]: 31,
};

const validateMonth = (arg: unknown): arg is Months => {
  return (
    typeof arg === 'string' && Object.values(Months).some(el => el === arg)
  );
};

const validateDay = (day: unknown, month: Months): day is number => {
  if (typeof day !== 'number' || isNaN(day)) {
    return false;
  }

  const check = day > 0 && day <= days[month];

  return check;
};

const validateYear = (arg: unknown): arg is number => {
  if (typeof arg !== 'number') {
    return false;
  }

  const currentYear = new Date().getFullYear();
  const check = arg <= currentYear && arg > currentYear - 100;

  return check;
};

export { validateMonth, validateDay, validateYear };
