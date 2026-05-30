/* eslint-disable max-len */
import classNames from 'classnames';
import styles from './ArrowIcon.module.scss';
import {
  ArrowIconLeft,
  ArrowIconRight,
  ArrowIconTop,
} from '../ArrowIcon/ArrowIcon';

interface Props {
  direction: 'left' | 'right' | 'up';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export const ArrowButton: React.FC<Props> = ({
  direction,
  className,
  onClick,
  disabled,
}) => {
  const arrows = {
    left: <ArrowIconLeft />,
    right: <ArrowIconRight />,
    up: <ArrowIconTop />,
  };

  return (
    <button
      className={classNames(styles['arrow-icon'], className)}
      disabled={disabled}
      onClick={onClick}
    >
      {arrows[direction]}
    </button>
  );
};
