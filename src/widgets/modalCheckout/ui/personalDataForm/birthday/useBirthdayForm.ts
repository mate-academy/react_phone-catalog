import { days, Months, useCheckout } from '@widgets/modalCheckout/model';
import { useState } from 'react';

export const useBirthdayForm = () => {
  const { birthdayRef } = useCheckout();
  const [tick, setTick] = useState<boolean>(false);
  const rerender = () => setTick(!tick);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
  const months = Object.values(Months);

  const getDays = () => {
    const isLeap =
      birthdayRef.current.year % 400 === 0 ||
      (birthdayRef.current.year % 4 === 0 &&
        birthdayRef.current.year % 100 !== 0);

    if (isLeap && birthdayRef.current.month === Months.FEB) {
      return Array.from({ length: 29 }, (_, i) => i + 1);
    }

    return Array.from(
      { length: days[birthdayRef.current.month] },
      (_, i) => i + 1,
    );
  };

  const daysData = {
    placeholder:
      birthdayRef.current.month === ('' as Months)
        ? 'Please, select month first'
        : 'Please, select day',
    array: birthdayRef.current.month === ('' as Months) ? null : [...getDays()],
  };

  const onChange = {
    month: (e: React.ChangeEvent<HTMLSelectElement>) => {
      birthdayRef.current.month = e.target.value as Months;
      rerender();
    },
    day: (e: React.ChangeEvent<HTMLSelectElement>) => {
      birthdayRef.current.day = +e.target.value;
      rerender();
    },
    year: (e: React.ChangeEvent<HTMLSelectElement>) => {
      birthdayRef.current.year = +e.target.value;
      rerender();
    },
  };

  return { years, months, daysData, onChange };
};
