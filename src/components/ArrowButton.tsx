import arrowTopIcon from '../images/icons/arrow-top.svg';
import arrowTopDisabledIcon from '../images/icons/arrow-top-disabled.svg';
import classNames from 'classnames';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  position: 'left' | 'top' | 'right' | 'bottom';
}

export const ArrowButton: React.FC<Props> = ({ position, ...rest }) => {
  return (
    <button
      className={classNames(
        `flex h-8 w-8 items-center justify-center border
      border-icons hover:border-primary`,
        {
          'border-elements': rest.disabled,
          'rotate-90': position === 'right',
          'rotate-180': position === 'bottom',
          '-rotate-90': position === 'left',
        },
      )}
      {...rest}
    >
      <img
        src={rest.disabled ? arrowTopDisabledIcon : arrowTopIcon}
        alt="Arrow"
      />
    </button>
  );
};
