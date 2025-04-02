import styles from './ArrowButton.module.scss';

type Props = {
  direction: string;
  isBtnDisabled: boolean;
  handleClickArrow: (direction: string) => void;
};

const ArrowButton: React.FC<Props> = ({
  isBtnDisabled,
  direction,
  handleClickArrow,
}) => {
  return (
    <div className={styles.arrow}>
      <button
        onClick={() => handleClickArrow(direction)}
        disabled={isBtnDisabled}
        className={`${styles.arrow} ${isBtnDisabled ? styles.disabled : ''}`}
      >
        <img
          src={`/img/icons/arrows/arrow-${direction}-icon${isBtnDisabled ? '-dis' : ''}.svg`}
          alt="Previous"
        />
      </button>
    </div>
  );
};

export default ArrowButton;
