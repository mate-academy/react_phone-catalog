import type React from 'react';
import { Typography } from '../Typography/Typography';
import { ICONS } from '../../../constants/icons';
import { Icon } from '../Icon/Icon';

type ScrollTopButtonProps = {
  onClick: () => void;
};

export const ScrollToTopButton: React.FC<ScrollTopButtonProps> = ({
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex items-center justify-center md:justify-start cursor-pointer bg-transparent border-none p-0 w-full md:w-auto"
    >
      <Typography
        level="uppercase"
        className="mr-4 text-secondary group-hover:text-primary dark:text-secondary dark:group-hover:text-accent-dark transition-colors"
      >
        Back to top
      </Typography>
      <div className="border border-icons dark:border-surface-2-dark group-hover:border-primary flex justify-center items-center transition-all duration-400 ease-in-out w-8 h-8 dark:bg-surface-2-dark dark:group-hover:bg-icons">
        <Icon
          src={ICONS.ARROW.UP}
          className="dark:bg-amber-300"
        />
      </div>
    </button>
  );
};
