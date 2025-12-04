import styles from './modalCheckout.module.scss';
import { PersonalDataForm } from './personalDataForm';
import { CheckoutProvider } from '../model';
import { Steps } from './checkoutSteps/Steps';
import { DeliveryForm } from './deliveryForm/DeliveryForm';
import { useGlobalData } from '@features/index';
import { CheckoutResume } from './checkoutResume/CheckoutResume';
import classNames from 'classnames';

export const ModalCheckout = () => {
  const { modalIsOpened } = useGlobalData();

  return (
    <div
      className={classNames(styles['modal-backdrop'], {
        [styles['modal-backdrop-hidden']]: !modalIsOpened,
      })}
    >
      <CheckoutProvider>
        <Steps>
          <Steps.Step step={1}>
            <PersonalDataForm />
          </Steps.Step>

          <Steps.Step step={2}>
            <DeliveryForm />
          </Steps.Step>

          <Steps.Step step={3}>
            <CheckoutResume />
          </Steps.Step>
        </Steps>
      </CheckoutProvider>
    </div>
  );
};
