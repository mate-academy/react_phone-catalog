import { DirectionType } from '../../../../api/types';
import scss from './ButtonArrow.module.scss';
import classNames from 'classnames';

interface Props {
  direction: DirectionType;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

export const ButtonArrow: React.FC<Props> = ({
  direction,
  onClick,
  disabled,
  className,
}) => {
  return (
    <button
      type="button"
      className={classNames(scss.button, className)}
      onClick={() => onClick()}
      aria-label={direction === 'left' ? 'Prev' : 'Next'}
      disabled={disabled}
    >
      <svg
        className={scss.button__icon}
        style={{ transform: direction === 'left' ? 'rotate(180deg)' : 'none' }}
      >
        <use href={`${import.meta.env.BASE_URL}icons/icons.svg#arrow`}></use>
      </svg>
    </button>
  );
};
