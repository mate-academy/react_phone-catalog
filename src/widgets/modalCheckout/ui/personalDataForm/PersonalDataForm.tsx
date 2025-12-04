import styles from './personalDataForm.module.scss';
import { useCheckout, useSteps } from '../../model';
import { BirthdayForm } from './birthday/BirthdayForm';
import { FormIDs, InputType } from '@widgets/modalCheckout/types';
import { capitalize, numInput } from '@widgets/modalCheckout/lib';

export const PersonalDataForm = () => {
  const { userDetails, filled } = useCheckout();
  const { step, setStep } = useSteps();

  type ItemList = {
    title: string;
    props: {
      id: Exclude<keyof typeof userDetails.current, 'birthday'>;
      type: InputType;
      required?: boolean;
      defaultValue?: string;
      onInput?: (e: React.FormEvent<HTMLInputElement>) => void;
    };
  };

  const inputs: ItemList[] = [
    {
      title: 'first name *',
      props: {
        id: 'firstName',
        type: 'text',
        required: true,
        onInput: capitalize(userDetails.current.firstName),
      },
    },
    {
      title: 'last name *',
      props: {
        id: 'lastName',
        type: 'text',
        required: true,
        onInput: capitalize(userDetails.current.lastName),
      },
    },
    {
      title: 'email *',
      props: {
        id: 'email',
        type: 'email',
        required: true,
      },
    },
    {
      title: 'phone number *',
      props: {
        id: 'tel',
        type: 'tel',
        required: true,
        defaultValue: '+380',
        onInput: numInput,
      },
    },
  ];

  return (
    <form
      id={FormIDs.DATA}
      onSubmit={e => {
        e.preventDefault();
        filled.current[FormIDs.DATA] = true;
        setStep(step + 1);
      }}
    >
      <fieldset className={styles['form-container']}>
        <legend className={styles.heading}>Personal details</legend>
        {inputs.map(el => (
          <div className={styles['input-wrapper']} key={el.props.id}>
            <label htmlFor={el.props.id}>{el.title}</label>
            <input
              {...el.props}
              name={el.props.id}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                (userDetails.current[el.props.id] = e.target.value)
              }
            />
          </div>
        ))}
        <BirthdayForm />
      </fieldset>
    </form>
  );
};
