import arrowTopIcon from '../images/icons/arrow-top.svg';
import arrowTopDisabledIcon from '../images/icons/arrow-top-disabled.svg';
import classNames from 'classnames';

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
      className={classNames(
        `flex h-8 w-8 items-center justify-center border
      border-icons transition hover:border-primary`,
        {
          'border-elements': rest.disabled,
          [className]: className,
        },
      )}
      {...rest}
    >
      <img
        src={rest.disabled ? arrowTopDisabledIcon : arrowTopIcon}
        alt="Arrow"
        className={classNames({
          'rotate-90': position === 'right',
          'rotate-180': position === 'bottom',
          '-rotate-90': position === 'left',
        })}
      />
    </button>
  );
};
