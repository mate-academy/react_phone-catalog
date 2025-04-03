import React, { useState } from 'react';
import styles from './Button.module.scss';
import classNames from 'classnames';
import { ButtonDirection } from '../../enums/ButtonDirection';
import { ButtonUrl } from '../../enums/ButtonUrl';

type Props = {
  direction: ButtonDirection;
  buttonId: number;
  disabledIds: number[];
  onClick: () => void;
};

export const Button: React.FC<Props> = ({
  direction,
  buttonId,
  disabledIds,
  onClick,
}) => {
  return (
    <>
      <button
        className={classNames(`${styles.button_wrapper}`, {
          [styles.disabled]: Array.isArray(disabledIds) && disabledIds.includes(buttonId),
        })}
        onClick={onClick}
        disabled={Array.isArray(disabledIds) && disabledIds.includes(buttonId)}
      >
        <img
          src={Array.isArray(disabledIds) && disabledIds.includes(buttonId) ? ButtonUrl.disabled : ButtonUrl.default}
          alt={`arrow ${direction}`}
          className={`${styles[direction]}`}
        />
      </button>
    </>
  );
};
