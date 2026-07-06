// #region imports
import cn from 'classnames';
import { capitalizeFirstWord } from '../../../../services/capitalizeFirstWord';
import baseStyles from './base.module.scss';
import styles from './Button.module.scss';
// #endregion

type Props = {
  name: string;
  isSelected?: boolean;
  size?: 'small' | 'medium';
  isDisabled?: boolean;
  onClick: () => void;
};

export const Button: React.FC<Props> = ({
  name,
  isSelected = false,
  size = 'small',
  isDisabled = false,
  onClick,
}) => (
  <button
    className={cn(baseStyles.button, styles.button, {
      [baseStyles.medium]: size === 'medium',
      [styles.selected]: isSelected,
    })}
    disabled={isDisabled}
    onClick={onClick}
    aria-pressed={isSelected}
  >
    {capitalizeFirstWord(name)}
  </button>
);
