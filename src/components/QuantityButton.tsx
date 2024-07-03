import { twMerge } from 'tailwind-merge';
import minus from '../images/icons/minus.svg';
import plus from '../images/icons/plus.svg';
import minusDisabled from '../images/icons/minus-gray.svg';
import plusDisabled from '../images/icons/plus-gray.svg';

interface Props
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  type: 'Increase' | 'Decrease';
  className?: string;
}

export const QuantityButton: React.FC<Props> = ({
  type,
  className,
  ...rest
}) => {
  return (
    <button
      type="button"
      className={twMerge(
        `flex h-8 w-8 items-center justify-center border
      border-icons transition hover:border-primary`,
        rest.disabled && 'pointer-events-none border-elements',
        className,
      )}
      {...rest}
    >
      {rest.disabled ? (
        type === 'Increase' ? (
          <img src={plusDisabled} alt="Increase" />
        ) : (
          <img src={minusDisabled} alt="Decrease" />
        )
      ) : type === 'Increase' ? (
        <img src={plus} alt="Increase" />
      ) : (
        <img src={minus} alt="Decrease" />
      )}
    </button>
  );
};
