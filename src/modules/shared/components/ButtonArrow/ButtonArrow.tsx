import { DirectionType } from '../../../../api/types';
import scss from './ButtonArrow.module.scss';

interface Props {
  direction: DirectionType;
  onClick: () => void;
  disabled?: boolean;
}

export const ButtonArrow: React.FC<Props> = ({
  direction,
  onClick,
  disabled,
}) => {
  return (
    <button
      type="button"
      className={scss.button}
      onClick={() => onClick()}
      aria-label={direction === 'left' ? 'Prev' : 'Next'}
      disabled={disabled}
    >
      <svg
        className={scss.button__icon}
        style={{ transform: direction === 'left' ? 'rotate(180deg)' : 'none' }}
      >
        <use href="/icons/icons.svg#arrow"></use>
      </svg>
    </button>
  );
};
