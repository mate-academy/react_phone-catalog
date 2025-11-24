import styles from './modalCheckout.module.scss';
import { PersonalDataForm } from './personalDataForm';
import { CheckoutProvider } from '../model';
import { Steps } from './checkoutSteps/Steps';
import { DeliveryForm } from './deliveryForm/DeliveryForm';

export const ModalCheckout = () => {
  return (
    <div className={styles['modal-backdrop']}>
      <CheckoutProvider>
        <Steps>
          <Steps.Step step={1}>
            <PersonalDataForm />
          </Steps.Step>

          <Steps.Step step={2}>
            <DeliveryForm />
          </Steps.Step>

          <Steps.Step step={3}>
            <div />
          </Steps.Step>
        </Steps>
      </CheckoutProvider>
    </div>
  );
};
