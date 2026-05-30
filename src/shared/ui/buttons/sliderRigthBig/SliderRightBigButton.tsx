import styles from './SliderRightBigButton.module.scss';

type Props = {
  onRightButton: () => void;
};

export const SliderRightBigButton: React.FC<Props> = ({ onRightButton }) => {
  return (
    <button className={styles.button} onClick={onRightButton}>
      <span className={styles.icon} aria-hidden="true" />
    </button>
  );
};
