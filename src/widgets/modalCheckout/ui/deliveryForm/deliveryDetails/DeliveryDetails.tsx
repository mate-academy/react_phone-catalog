import { useCheckout } from '@widgets/modalCheckout/model';
import styles from './deliveryDetails.module.scss';
import { Address } from '@shared/api/types/bodies.types';

export const DeliveryDetails = () => {
  const { deliveryAddress } = useCheckout();

  type ItemList = {
    title: string;
    id: keyof typeof deliveryAddress.current;
    required: boolean;
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement>,
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

  return (
    <>
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
