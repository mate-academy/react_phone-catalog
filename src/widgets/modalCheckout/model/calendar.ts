import { Months } from '@shared/api/types/bodies.enums';

const days: Record<Months, number> = {
  [Months.JAN]: 31,
  [Months.FEB]: 28,
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

export { days };
