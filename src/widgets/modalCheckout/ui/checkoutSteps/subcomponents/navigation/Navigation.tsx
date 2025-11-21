import classNames from 'classnames';
import { useSteps } from '../../../../model';
import styles from './navigation.module.scss';

type Props = {
  totalSteps: number;
};
export const Navigation = ({ totalSteps }: Props) => {
  const { step, setStep } = useSteps();

  const arr = Array.from({ length: totalSteps }, (_, i) => i + 1);

  const getProps = (number: number) => {
    return {
      className: classNames(styles.pagination__button, {
        [styles['pagination__button--active']]: number === step,
      }),
      onClick: () => setStep(number),
    };
  };

  return (
    <nav className={styles.pagination}>
      {arr.map(el => (
        <button key={el} {...getProps(el)}>
          {el}
        </button>
      ))}
    </nav>
  );
};
