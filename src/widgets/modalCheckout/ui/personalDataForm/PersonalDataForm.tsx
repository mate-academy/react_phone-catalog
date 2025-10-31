import React, { useRef, useState } from 'react';
import styles from './personalDataForm.module.scss';
import { days, Months } from '../../model';
import { ArrowIcon } from '@shared/icons';

interface Birthday {
  month: Months;
  day: number | string;
  year: number;
}

export const PersonalDataForm = () => {
  const [monthIsSet, setMonthIsSet] = useState(false);
  const birthdayRef = useRef<Birthday>({
    month: Months.NS,
    day: days[Months.NS],
    year: 2000,
  });

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  return (
    <fieldset className={styles.main}>
      <legend className={styles.h3}>Personal details</legend>
      <div className={styles['input-wrapper']}>
        <label htmlFor="firstName">first name</label>
        <input type="text" id="firstName" name="firstName" required />
      </div>
      <div className={styles['input-wrapper']}>
        <label htmlFor="lastName">last name</label>
        <input type="text" id="lastName" name="lastName" required />
      </div>
      <div className={styles['input-wrapper']}>
        <label htmlFor="email">email</label>
        <input type="email" id="email" name="email" required />
      </div>
      <div className={styles['input-wrapper']}>
        <label htmlFor="phoneNumber">phone number</label>
        <input type="tel" id="phoneNumber" name="phoneNumber" required />
      </div>

      <fieldset className={styles.birthdate}>
        <legend>Date of birth</legend>
        <div className={styles['select-wrapper']}>
          <select
            name="birthMonth"
            id="birthMonth"
            required
            onChange={e => {
              birthdayRef.current.month = e.target.value as Months;
              setMonthIsSet(true);
            }}
          >
            {Object.values(Months).map(el => (
              <option
                key={el}
                {...(el === Months.NS && { disabled: true, selected: true })}
              >
                {el}
              </option>
            ))}
          </select>
          <ArrowIcon direction="down" />
        </div>

        <div className={styles['select-wrapper']}>
          <select name="birthDay" id="birthDay" required>
            {!monthIsSet ? (
              <option disabled selected>
                Please, select month first
              </option>
            ) : (
              <>
                <option disabled selected>
                  day
                </option>
                {Array.from(
                  { length: days[birthdayRef.current.month] as number },
                  (_, i) => i + 1,
                ).map(el => (
                  <option key={el}>{el}</option>
                ))}
              </>
            )}
          </select>
          <ArrowIcon direction="down" />
        </div>

        <div className={styles['select-wrapper']}>
          <select name="birthYear" id="birthYear" required>
            <option disabled selected>
              year
            </option>
            {years.map(el => (
              <option key={el}>{el}</option>
            ))}
          </select>
          <ArrowIcon direction="down" />
        </div>
      </fieldset>
    </fieldset>
  );
};
