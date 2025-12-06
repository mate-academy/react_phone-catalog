import classNames from 'classnames';
import { useSteps } from '../../../../model';
import styles from './navigation.module.scss';
import { useGlobalData } from '@features/index';
import { useEffect } from 'react';

type Props = {
  totalSteps: number;
};
export const Navigation = ({ totalSteps }: Props) => {
  const { step, setStep } = useSteps();

  const { modalIsOpened } = useGlobalData();

  useEffect(() => {
    if (modalIsOpened === true) {
      setStep(1);
    }
  }, [modalIsOpened]);

  const arr = Array.from({ length: totalSteps }, (_, i) => i + 1);

  const names: Record<number, string> = {
    1: 'Personal data',
    2: 'Delivery',
    3: 'Order review',
  };

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
          {names[el]}
        </button>
      ))}
    </nav>
  );
};
