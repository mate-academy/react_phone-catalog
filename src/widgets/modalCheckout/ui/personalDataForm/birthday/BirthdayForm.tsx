import { ArrowIcon } from '@shared/icons';
import { Months } from '@shared/api/types/bodies.enums';
import styles from './birthdayForm.module.scss';
import { days } from '@widgets/modalCheckout/model';
import { Birthday } from '@shared/api/types/bodies.types';
import { useState } from 'react';

export const BirthdayForm = () => {
  const [birthday, setBirthday] = useState<Birthday>({
    day: 0,
    month: '' as Months,
    year: 0,
  });

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
  const months = Object.values(Months);

  const getDays = () => {
    const isLeap =
      birthday.year % 400 === 0 ||
      (birthday.year % 4 === 0 && birthday.year % 100 !== 0);

    if (isLeap && birthday.month === Months.FEB) {
      return Array.from({ length: 29 }, (_, i) => i + 1);
    }

    return Array.from({ length: days[birthday.month] }, (_, i) => i + 1);
  };

  return (
    <fieldset className={styles.birthdate}>
      <legend>Date of birth</legend>

      <label htmlFor="birthMonth">month</label>
      <div className={styles['select-wrapper']}>
        <select
          name="birthMonth"
          id="birthMonth"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setBirthday({ ...birthday, month: e.target.value as Months })
          }
        >
          <option selected disabled>
            Please, select month
          </option>
          {months.map(el => (
            <option key={el}>{el}</option>
          ))}
        </select>
        <ArrowIcon direction="down" />
      </div>

      <label htmlFor="birthDay">day</label>
      <div className={styles['select-wrapper']}>
        <select
          name="birthDay"
          id="birthDay"
          disabled={birthday.month === ('' as Months)}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setBirthday({ ...birthday, day: +e.target.value })
          }
        >
          <option selected disabled>
            Please, select day
          </option>
          {getDays().map(el => (
            <option key={el}>{el}</option>
          ))}
        </select>
        <ArrowIcon direction="down" />
      </div>

      <label htmlFor="birthYear">year</label>
      <div className={styles['select-wrapper']}>
        <select
          name="birthYear"
          id="birthYear"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setBirthday({ ...birthday, year: +e.target.value })
          }
        >
          <option selected disabled>
            Please, select year
          </option>
          {years.map(el => (
            <option key={el}>{el}</option>
          ))}
        </select>
        <ArrowIcon direction="down" />
      </div>
    </fieldset>
  );
};
