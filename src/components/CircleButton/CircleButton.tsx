import React from 'react';
import { Icon } from '../Icon';
import styles from './CircleButton.module.scss';
import cn from 'classnames';
import { IconType } from '../../types/IconType';
import { useAppSelector } from '../../store/hooks';

type Props = {
  type: IconType;
  isDisabled?: boolean;
  isLong?: boolean;
  onClick?: () => void;
};

export const CircleButton: React.FC<Props> = ({
  type,
  isDisabled = false,
  isLong = false,
  onClick = () => {},
}) => {
  const { isDark } = useAppSelector(state => state.theme);

  return (
    <button
      type="button"
      className={cn(
        `${styles.btn} ${isDark ? styles[`btn--dark`] : styles[`btn--light`]}`,
        {
          [styles[`btn--long`]]: isLong,
        },
      )}
      disabled={isDisabled}
      onClick={onClick}
    >
      <Icon type={type} />
    </button>
  );
};
