import DefaultButton from '../../../public/img/icons/SliderBtnDefault.png';
import HoverButton from '../../../public/img/icons/SliderBtnHover.png';
import DisabledButton from '../../../public/img/icons/SliderBtnDisabled.png';
import { useState } from 'react';
import styles from './NavButton.module.scss';

type Props = {
  direction: 'left' | 'right';
  disabled: boolean;
  onClick: () => void;
};

export const NavButton = ({ direction, disabled, onClick }: Props) => {
  const [isHover, setIsHovered] = useState(false);

  const getIcon = () => {
    if (disabled) {
      return DisabledButton;
    }

    if (isHover) {
      return HoverButton;
    }

    return DefaultButton;
  };

  return (
    <button
      className={`${styles.navButton} ${styles[`navButton--${direction}`]}`}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={getIcon()}
        alt={`${direction}`}
        className={styles.navButton__icon}
      />
    </button>
  );
};
