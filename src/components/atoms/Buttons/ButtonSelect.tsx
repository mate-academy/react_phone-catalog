import type React from 'react';
import classNames from 'classnames';
import { Typography } from '../Typography/Typography';

type Props = {
  content: string;
  className?: string;
  handleClick: () => void;
  isSelected?: boolean;
};

const variant = {
  default: 'border-elements text-black hover:border-primary',
  selected: 'bg-primary text-white',
};

export const ButtonSelect: React.FC<Props> = ({
  content,
  className,
  handleClick,
  isSelected,
}) => (
  <button
    type="button"
    className={classNames(
      `flex justify-center items-center text-center border transition-all duration-400 ease-in-out cursor-pointer ${className}`,
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
      {content}
    </Typography>
  </button>
);
