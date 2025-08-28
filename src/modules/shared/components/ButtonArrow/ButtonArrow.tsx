import scss from './ButtonArrow.module.scss';

interface Props {
  direction: DirectionType;
}

const Direction = {
  Left: 'left',
  Right: 'right',
} as const;

type DirectionType = (typeof Direction)[keyof typeof Direction];

export const ButtonArrow: React.FC<Props> = ({ direction }) => {
  return (
    <button className={scss.button}>
      <svg
        className={scss.button__icon}
        style={{ transform: direction === 'left' ? 'rotate(180deg)' : 'none' }}
      >
        <use href="/icons/icons.svg#arrow"></use>
      </svg>
    </button>
  );
};
