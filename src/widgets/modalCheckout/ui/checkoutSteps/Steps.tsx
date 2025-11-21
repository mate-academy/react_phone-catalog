import { ReactNode } from 'react';
import { CheckoutStepsProvider, useSteps } from '../../model';
import styles from './steps.module.scss';
import { Agreement, ControlButtons, Navigation } from './subcomponents';

type StepsProps = {
  children: ReactNode;
};

const totalSteps = 3;

export const Steps = ({ children }: StepsProps) => {
  return (
    <CheckoutStepsProvider>
      <div className={styles.dialog}>
        <h2 id="modal-title">checkout</h2>
        <form className={styles.form}>
          {children}
          <Agreement />
          <span className={styles.warning}>* - required fields</span>
          <ControlButtons totalSteps={totalSteps} totalPrice={9000} />
        </form>
        <Navigation totalSteps={totalSteps} />
      </div>
    </CheckoutStepsProvider>
  );
};

type StepProps = {
  step: number;
  children: ReactNode;
};

Steps.Step = function Step({ step, children }: StepProps) {
  const { step: currentStep } = useSteps();

  if (currentStep !== step) {
    return null;
  }

  return <>{children}</>;
};
