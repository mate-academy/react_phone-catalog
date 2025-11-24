import styles from './personalDataForm.module.scss';
import { useCheckout } from '../../model';
import { BirthdayForm } from './birthday/BirthdayForm';

export const PersonalDataForm = () => {
  const { userDetails } = useCheckout();

  type ItemList = {
    title: string;
    id: Exclude<keyof typeof userDetails.current, 'birthday'>;
  };

  const inputs: ItemList[] = [
    {
      title: 'first name *',
      id: 'firstName',
    },
    {
      title: 'last name *',
      id: 'lastName',
    },
    {
      title: 'email *',
      id: 'email',
    },
    {
      title: 'phone number *',
      id: 'tel',
    },
  ];

  return (
    <fieldset className={styles['form-container']}>
      <legend className={styles.heading}>Personal details</legend>
      {inputs.map(el => (
        <div className={styles['input-wrapper']} key={el.id}>
          <label htmlFor={el.id}>{el.title}</label>
          <input
            type="text"
            id={el.id}
            name={el.id}
            required
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              (userDetails.current[el.id] = e.target.value)
            }
          />
        </div>
      ))}
      <BirthdayForm />
    </fieldset>
  );
};
