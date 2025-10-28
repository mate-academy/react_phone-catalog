/* eslint-disable no-console */
import { CartItem } from '@features/globalStore/types';
import styles from './modalCheckout.module.scss';
import { useRef, useState } from 'react';

type Props = {
  itemsInCart: CartItem[];
  totalPrice: number;
};

type Pickup = {
  type: 'pickup';
};

type Delivery = {
  type: 'courier' | 'regular';
  deliveryAddress: string;
};

interface FormDataRef {
  customer: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
  };
  shipping: Pickup | Delivery | { type: 'Please, select option' };
  dataProcessingAgreement: boolean;
}

export const ModalCheckout = ({ totalPrice }: Props) => {
  const [deliveryAddress, setDeliveryAdress] = useState(false);

  const formDataRef = useRef<FormDataRef>({
    customer: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
    },
    shipping: {
      type: 'Please, select option',
    },
    dataProcessingAgreement: false,
  });

  const onSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    formDataRef.current.shipping.type = value;
    if (value === 'courier' || value === 'regular') {
      setDeliveryAdress(true);
    } else {
      setDeliveryAdress(false);
    }
  };

  const onSumbit = () => {
    console.log('Order processing');
    console.log(formDataRef.current);
  };

  return (
    <div className={styles['modal-backdrop']}>
      <div
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <h2 id="modal-title">Checkout</h2>
        <form className={styles.form}>
          <fieldset>
            <legend>Personal detail</legend>
            <label htmlFor="firstName">first name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              required
              onChange={e =>
                (formDataRef.current.customer.firstName = e.target.value)
              }
            />
            <label htmlFor="lastName">last name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              required
              onChange={e =>
                (formDataRef.current.customer.lastName = e.target.value)
              }
            />
            <label htmlFor="phoneNumber">phone number</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              required
              onChange={e =>
                (formDataRef.current.customer.phoneNumber = e.target.value)
              }
            />
            <label htmlFor="email">email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              onChange={e =>
                (formDataRef.current.customer.email = e.target.value)
              }
            />
          </fieldset>
          <fieldset>
            <legend>Shipping details</legend>
            <label htmlFor="deliveryOptions">Shipping method</label>
            <select id="deliveryOptions" required onChange={e => onSelect(e)}>
              <option value="pickup" onClick={() => setDeliveryAdress(false)}>
                In-Store Pickup
              </option>
              <option value="courier" onClick={() => setDeliveryAdress(true)}>
                Courier Shipping
              </option>
              <option value="regular">Regular Shipping</option>
            </select>
            {deliveryAddress === true && (
              <>
                <label htmlFor="deliveryAddress">Delivery Adress</label>
                <input
                  type="text"
                  id="deliveryAddress"
                  name="deliveryAddress"
                  required
                  onChange={e =>
                    (formDataRef.current.shipping.deliveryAddress = {
                      deliveryAddress: e.target.value,
                    })
                  }
                />
              </>
            )}
          </fieldset>
          <div className={styles['checkbox-container']}>
            <input
              type="checkbox"
              id="dataProcessing"
              required
              onChange={e =>
                (formDataRef.current.dataProcessingAgreement = e.target.checked)
              }
            />
            <label htmlFor="dataProcessing">
              I agree to the processing of my personal data
            </label>
          </div>

          <div className={styles.buttons}>
            <button type="submit" onClick={onSumbit}>
              Place Order (${totalPrice})
            </button>
            <button type="button">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};
