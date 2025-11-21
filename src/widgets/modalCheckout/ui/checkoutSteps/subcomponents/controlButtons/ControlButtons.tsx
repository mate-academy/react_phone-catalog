import { useSteps } from '@widgets/modalCheckout/model';
import styles from './controlButtons.module.scss';
type Props = {
  totalSteps: number;
  totalPrice: number;
};

export const ControlButtons = ({ totalSteps, totalPrice }: Props) => {
  const { step, setStep } = useSteps();

  const defaultProps = {
    title: 'Proceed',
    onClick: (e: React.FormEvent) => {
      e.preventDefault();
      setStep(step + 1);
    },
  };

  const checkout = {
    title: `Place order (${totalPrice})`,
    onClick: (e: React.FormEvent) => {
      e.preventDefault();

      return;
    },
  };

  const params = step === totalSteps ? checkout : defaultProps;

  return (
    <div className={styles.buttons}>
      <button type="submit" onClick={e => params.onClick(e)}>
        {params.title}
      </button>
      <button
        type="button"
        onClick={e => {
          e.preventDefault();
          setStep(1);
        }}
      >
        cancel
      </button>
    </div>
  );
};
