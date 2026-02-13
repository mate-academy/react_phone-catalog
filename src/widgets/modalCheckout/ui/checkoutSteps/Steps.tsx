import { ReactNode } from 'react';
import { CheckoutStepsProvider, useSteps } from '../../model';
import styles from './steps.module.scss';
import { ControlButtons, Navigation } from './subcomponents';

type StepsProps = {
  children: ReactNode;
};

const totalSteps = 3;

export const Steps = ({ children }: StepsProps) => {
  return (
    <CheckoutStepsProvider>
      <div className={styles.dialog}>
        <Navigation totalSteps={totalSteps} />
        <h2 id="modal-title">checkout</h2>
        <div className={styles.viewport}>{children}</div>
        <span className={styles['required-message']}>* - required fields</span>
        <ControlButtons />
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
    return <div className={styles.hidden}>{children}</div>;
  }

  return <div>{children}</div>;
};
