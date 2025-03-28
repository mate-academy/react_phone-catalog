import React from 'react';
import styles from './Button.module.scss';
import classNames from 'classnames';
import { ButtonDirection } from '../../enums/ButtonDirection';
import { ButtonUrl } from '../../enums/ButtonUrl';

type Props = {
  direction: ButtonDirection;
  isDisabled: boolean;
  backToTop: boolean;
};

export const Button: React.FC<Props> = ({
  direction,
  isDisabled,
  backToTop,
}) => {

  const handleBackToTop = () => {
    if (backToTop) {
      window.scrollTo({top: 0});
    }
  }

  return (
    <>
      <button
        className={classNames(`${styles.button_wrapper}`, {
          [styles.disabled]: isDisabled,
        })}
        onClick={handleBackToTop}
        disabled={isDisabled}
      >
        <img
          src={isDisabled ? ButtonUrl.disabled : ButtonUrl.default}
          alt={`arrow ${direction}`}
          className={`${styles[direction]}`}
        />
      </button>
    </>
  );
};
