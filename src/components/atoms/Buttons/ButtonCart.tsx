import type React from 'react';
import classNames from 'classnames';
import { Typography } from '../Typography/Typography';

type Props = {
  content: string;
  className?: string;
  handleClick: () => void;
  isSelected: boolean;
  onSelected: string;
};

const variant = {
  default:
    'bg-primary dark:bg-accent-dark border-primary text-white hover:shadow-[0_3px_13px_0_rgba(23,32,49,0.4)] dark:hover:bg-accent-hover-dark',
  selected:
    'bg-transparent border-green text-green dark:bg-surface-2-dark dark:text-white dark:border-none',
};

export const ButtonCart: React.FC<Props> = ({
  content,
  className,
  handleClick,
  isSelected,
  onSelected,
}) => (
  <button
    type="button"
    className={classNames(
      `flex justify-center items-center text-center border transition-all duration-400 ease-in-out ${className}`,
      {
        [variant.default]: !isSelected,
        [variant.selected]: isSelected,
      },
    )}
    onClick={handleClick}
  >
    <Typography
      level="button"
      className="inherit"
    >
      {isSelected ? onSelected : content}
    </Typography>
  </button>
);
