import { useState } from 'react';
import styles from './personalDataForm.module.scss';
import { days, Months } from '../../model';
import { ArrowIcon } from '@shared/icons';
import { InlineInput } from '../inlineInput/InlineInput';

export const PersonalDataForm = () => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    tel: '',
  });

  const [birthday, setBirthday] = useState({
    day: 0,
    month: '',
    year: 0,
  });

  type ItemList = {
    title: string;
    id: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };

  const fieldList: ItemList[] = [
    {
      title: 'first name',
      id: 'firstName',
      onChange: e => setUserData({ ...userData, firstName: e.target.value }),
    },
    {
      title: 'last name',
      id: 'lastName',
      onChange: e => setUserData({ ...userData, lastName: e.target.value }),
    },
    {
      title: 'email',
      id: 'email',
      onChange: e => setUserData({ ...userData, email: e.target.value }),
    },
    {
      title: 'phone number',
      id: 'phoneNumber',
      onChange: e => setUserData({ ...userData, tel: e.target.value }),
    },
  ];

  return (
    <fieldset className={styles.main}>
      <legend className={styles.h3}>Personal details</legend>
      {fieldList.map(el => (
        <InlineInput key={el.id} {...el} />
      ))}
      <fieldset className={styles.birthdate}>
        <legend>Date of birth *</legend>
        <div className={styles['select-wrapper']}>
          <select
            name="birthMonth"
            id="birthMonth"
            onChange={e => setBirthday({ ...birthday, month: e.target.value })}
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
          <select name="birthDay" id="birthDay">
            {birthday.month === '' ? (
              <option disabled selected>
                Please, select month first
              </option>
            ) : (
              <>
                <option disabled selected>
                  day
                </option>
                {Array.from(
                  { length: days[birthday.month as Months] as number },
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
          <select name="birthYear" id="birthYear">
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
