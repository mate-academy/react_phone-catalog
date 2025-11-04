import { days, Months } from '@server/static';
import { ValidationCheck } from '@server/types';

const validateMonth = (arg: unknown): ValidationCheck => {
  const check =
    typeof arg === 'string' && Object.values(Months).some(el => el === arg);

  return check
    ? { ok: true }
    : { ok: false, value: [422, `unrecognized month: ${arg}`] };
};

const validateDay = (day: unknown, month: Months): ValidationCheck => {
  if (typeof day !== 'number' || isNaN(day)) {
    return { ok: false, value: [422, `unexpected day type: ${day}`] };
  }

  const check = day > 0 && day <= days[month];

  if (!check) {
    return { ok: false, value: [422, `unexpected day value: ${day}`] };
  }

  return { ok: true };
};

const validateYear = (arg: unknown): ValidationCheck => {
  if (typeof arg !== 'number') {
    return { ok: false, value: [422, `unexpected year type: ${arg}`] };
  }

  const currentYear = new Date().getFullYear();
  const check = arg <= currentYear && arg > currentYear - 100;

  if (!check) {
    return { ok: false, value: [422, `unexpected year value: ${arg}`] };
  }

  return { ok: true };
};

export { validateMonth, validateDay, validateYear };
