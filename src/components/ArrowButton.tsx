import arrowTopIcon from '../images/icons/arrow-top.svg';
import arrowTopDisabledIcon from '../images/icons/arrow-top-disabled.svg';
import { twJoin, twMerge } from 'tailwind-merge';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  position: 'left' | 'top' | 'right' | 'bottom';
  className?: string;
}

export const ArrowButton: React.FC<Props> = ({
  position,
  className = '',
  ...rest
}) => {
  return (
    <button
      className={twMerge(
        `flex h-8 w-8 items-center justify-center border
      border-icons transition hover:border-primary`,
        rest.disabled && 'pointer-events-none border-elements',
        className,
      )}
      {...rest}
    >
      <img
        src={rest.disabled ? arrowTopDisabledIcon : arrowTopIcon}
        alt="Arrow"
        className={twJoin(
          position === 'right' && 'rotate-90',
          position === 'bottom' && 'rotate-180',
          position === 'left' && '-rotate-90',
        )}
      />
    </button>
  );
};
