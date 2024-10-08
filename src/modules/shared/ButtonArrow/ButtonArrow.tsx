import React from 'react';
import classNames from 'classnames';
import styles from './ButtonArrow.module.scss';

type ButtonType = 'top' | 'right' | 'bottom' | 'left';

type Props = {
  type: ButtonType;
  onClick: () => void;
  isDisabled?: boolean;
};

export const ButtonArrow: React.FC<Props> = ({
  type,
  onClick,
  isDisabled = false,
}) => {
  return (
    <button
      className={classNames(styles.ButtonArrow, {
        [styles.ButtonArrow_top]: type === 'top',
        [styles.ButtonArrow_right]: type === 'right',
        [styles.ButtonArrow_bottom]: type === 'bottom',
      })}
      onClick={onClick}
      disabled={isDisabled}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          // eslint-disable-next-line max-len
          d="M10.4715 3.52864C10.2111 3.26829 9.789 3.26829 9.52865 3.52864L5.52865 7.52864C5.2683 7.78899 5.2683 8.2111 5.52865 8.47145L9.52865 12.4714C9.789 12.7318 10.2111 12.7318 10.4715 12.4714C10.7318 12.2111 10.7318 11.789 10.4715 11.5286L6.94286 8.00004L10.4715 4.47145C10.7318 4.2111 10.7318 3.78899 10.4715 3.52864Z"
          fill="#313237"
        />
      </svg>
    </button>
  );
};
