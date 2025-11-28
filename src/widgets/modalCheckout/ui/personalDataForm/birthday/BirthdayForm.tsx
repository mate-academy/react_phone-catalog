import { ArrowIcon } from '@shared/icons';
import styles from './birthdayForm.module.scss';
import { useBirthdayForm } from './useBirthdayForm';

export const BirthdayForm = () => {
  const { years, months, daysData, onChange } = useBirthdayForm();

  return (
    <fieldset className={styles.birthdate}>
      <legend>Date of birth</legend>
      <div className={styles['inner-container']}>
        <label htmlFor="birthMonth">month</label>
        <div className={styles['select-wrapper']}>
          <select name="birthMonth" id="birthMonth" onChange={onChange.month}>
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
            disabled={daysData.array === null}
            onChange={onChange.day}
          >
            <option selected disabled>
              {daysData.placeholder}
            </option>
            {daysData.array !== null &&
              daysData.array.map(el => <option key={el}>{el}</option>)}
          </select>
          <ArrowIcon direction="down" />
        </div>

        <label htmlFor="birthYear">year</label>
        <div className={styles['select-wrapper']}>
          <select name="birthYear" id="birthYear" onChange={onChange.year}>
            <option selected disabled>
              Please, select year
            </option>
            {years.map(el => (
              <option key={el}>{el}</option>
            ))}
          </select>
          <ArrowIcon direction="down" />
        </div>
      </div>
    </fieldset>
  );
};
