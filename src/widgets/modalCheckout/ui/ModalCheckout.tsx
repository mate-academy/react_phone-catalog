import styles from './modalCheckout.module.scss';
import { PersonalDataForm } from './personalDataForm';
import { CheckoutProvider } from '../model';
import { Steps } from './checkoutSteps/Steps';
import { DeliveryForm } from './deliveryForm/DeliveryForm';
import { useGlobalData } from '@features/index';

export const ModalCheckout = () => {
  const { modalIsOpened } = useGlobalData();

  const display = modalIsOpened ? 'grid' : 'none';

  return (
    <div
      className={styles['modal-backdrop']}
      style={
        {
          '--visible': `${display}`,
        } as React.CSSProperties
      }
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
            <div />
          </Steps.Step>
        </Steps>
      </CheckoutProvider>
    </div>
  );
};
