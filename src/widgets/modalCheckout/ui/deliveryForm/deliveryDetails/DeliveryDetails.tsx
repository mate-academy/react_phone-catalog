import { useCheckout } from '@widgets/modalCheckout/model';
import styles from './deliveryDetails.module.scss';
import { Address } from '@shared/api/types/bodies.types';
import { ArrowIcon } from '@shared/icons';

export const DeliveryDetails = () => {
  const { deliveryAddress } = useCheckout();

  type ItemList = {
    title: string;
    id: keyof typeof deliveryAddress.current;
    required: boolean;
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    field: keyof Address,
  ) => {
    deliveryAddress.current[field] = e.target.value;
  };

  const inputs: ItemList[] = [
    {
      title: 'city *',
      id: 'city',
      required: true,
    },
    {
      title: 'postal code *',
      id: 'postalCode',
      required: true,
    },
    {
      title: 'street *',
      id: 'street',
      required: true,
    },
    {
      title: 'building *',
      id: 'buildingNumber',
      required: true,
    },
    {
      title: 'apartment',
      id: 'apartment',
      required: false,
    },
  ];

  const deliveryCountries = [
    'Germany',
    'France',
    'Great Britain',
    'Ukraine',
    'The Nederlands',
  ];

  return (
    <>
      <label htmlFor="country" className={styles.label}>
        country *
      </label>
      <div className={styles['select-wrapper']}>
        <select
          name="country"
          id="country"
          onChange={e => onChange(e, 'country')}
        >
          <option selected disabled>
            Please, select destination country
          </option>
          {deliveryCountries.map(el => (
            <option key={el}>{el}</option>
          ))}
        </select>
        <ArrowIcon direction="down" />
      </div>
      {inputs.map(el => (
        <div className={styles['input-wrapper']} key={el.id}>
          <label htmlFor={el.id}>{el.title}</label>
          <input
            type="text"
            id={el.id}
            name={el.id}
            required={el.required}
            onChange={e => onChange(e, el.id)}
          />
        </div>
      ))}
    </>
  );
};
