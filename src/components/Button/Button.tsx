import React from 'react';
import styles from './Button.module.scss';
import classNames from 'classnames';
import { ButtonDirection } from '../../enums/ButtonDirection';
import { ButtonUrl } from '../../enums/ButtonUrl';
import { useTheme } from '../ThemeContext/ThemeContext';

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
  const { theme } = useTheme();
  const isLightTheme = theme === 'light';

  return (
    <>
      <button
        className={classNames(`${styles.button_wrapper}`, {
          [styles.disabled]:
            Array.isArray(disabledIds) && disabledIds.includes(buttonId),
        })}
        onClick={onClick}
        disabled={Array.isArray(disabledIds) && disabledIds.includes(buttonId)}
      >
        <img
          src={
            Array.isArray(disabledIds) && disabledIds.includes(buttonId)
              ? isLightTheme
                ? ButtonUrl.disabled
                : ButtonUrl.disabled_dark
              : isLightTheme
                ? ButtonUrl.default
                : ButtonUrl.default_dark
          }
          alt={`arrow ${direction}`}
          className={`${styles[direction]}`}
        />
      </button>
    </>
  );
};
