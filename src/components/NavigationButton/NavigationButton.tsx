import type React from 'react';
import styles from './NavigationButton.module.scss';
import { asset } from '../../helper';

type Props = {
  isNavOpen: boolean;
  setIsNavOpen: (isOpen: boolean) => void;
};

export const NavigationButton: React.FC<Props> = ({
  isNavOpen,
  setIsNavOpen,
}) => {
  const src = isNavOpen ? asset('/img/close.svg') : asset('/img/burger.svg');

  const handleClickBurger = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <button className={styles['nav-button']} onClick={handleClickBurger}>
      <img src={src} alt="Menu" />
    </button>
  );
};
