import classNames from 'classnames';
import styles from './IconButton.module.scss';
import React from 'react';
import {
  ArrowIcon,
  HeartIcon,
  HeartRedIcon,
  Minus,
  Plus,
  Rondure,
} from '../../_constants/icons';
import { validateColor } from '../../../../_utils/validateColor';
type Props = {
  onClick?: () => void;
  modificator: 'heart' | 'arrow' | 'pagination' | 'selector' | 'minus' | 'plus';
  direction?: 'up' | 'left' | 'right' | 'down';
  value?: number;
  disabled?: boolean;
  selected?: boolean;
  backgroundColor?: string | null;
};

export const IconButton: React.FC<Props> = ({
  disabled = false,
  onClick = () => {},
  direction = 'right',
  value = 0,
  modificator,
  selected = false,
  backgroundColor = null,
}) => {
  const handleClick = () => {
    if (!disabled) {
      onClick();
    }
  };

  return (
    <button
      className={classNames(
        `${styles.button}`,
        `${styles[`button--${modificator}`]}`,
        {
          [styles[`button--${direction}`]]: !!direction,
          [styles['button--disabled']]: disabled,
          [styles[`button--${modificator}-selected`]]: selected,
        },
      )}
      onClick={handleClick}
      disabled={disabled}
      title={backgroundColor || undefined}
    >
      {modificator === 'arrow' && <ArrowIcon />}
      {modificator === 'heart' && !selected && <HeartIcon />}
      {modificator === 'heart' && selected && <HeartRedIcon />}
      {modificator === 'pagination' && value}
      {modificator === 'plus' && <Plus />}
      {modificator === 'minus' && <Minus />}
      {modificator === 'selector' && backgroundColor && (
        <Rondure backgroundColor={validateColor(backgroundColor)} />
      )}
    </button>
  );
};
