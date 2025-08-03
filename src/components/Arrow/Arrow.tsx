import styles from './Arrow.module.scss';

type Props = {
  direction: 'left' | 'right' | 'up';
  onClick: () => void;
  isDisabled?: boolean;
  height?: string;
  width?: string;
};

export const Arrow: React.FC<Props> = ({
  direction,
  height = '32px',
  width = '32px',
  isDisabled = false,
  onClick,
}) => {
  return (
    <button
      disabled={isDisabled}
      className={`
        ${styles.arrow}
      `}
      style={{ height, width }}
      onClick={() => onClick()}
    >
      <img
        src={isDisabled ?
          `/img/icons/arrow-${direction}-disabled.svg` :
          `/img/icons/arrow-${direction}.svg`
        }
        alt={`Arrow ${direction}`}
      />
    </button>
  );
};
