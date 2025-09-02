import { DirectionType } from '../../../../api/types';
import scss from './ButtonArrow.module.scss';

interface Props {
  direction: DirectionType;
  onClick: () => void;
}

export const ButtonArrow: React.FC<Props> = ({ direction, onClick }) => {
  return (
    <button
      type="button"
      className={scss.button}
      onClick={() => onClick()}
      aria-label={direction === 'left' ? 'Prev slide' : 'Next slide'}
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
