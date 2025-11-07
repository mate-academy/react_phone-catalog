import { createError } from '@server/helpers';
import { days, Months } from '@server/static';

const validateMonth = (arg: unknown) => {
  const check =
    typeof arg === 'string' && Object.values(Months).some(el => el === arg);

  return check ? true : createError(422, `unrecognized month: ${arg}`);
};

const validateDay = (day: unknown, month: Months) => {
  if (typeof day !== 'number' || isNaN(day)) {
    return createError(422, `unexpected day type: ${day}`);
  }

  const check = day > 0 && day <= days[month];

  if (!check) {
    return createError(422, `unexpected day value: ${day}`);
  }

  return true;
};

const validateYear = (arg: unknown) => {
  if (typeof arg !== 'number') {
    return createError(422, `unexpected year type: ${arg}`);
  }

  const currentYear = new Date().getFullYear();
  const check = arg <= currentYear && arg > currentYear - 100;

  if (!check) {
    return createError(422, `unexpected year value: ${arg}`);
  }

  return true;
};

export { validateMonth, validateDay, validateYear };
