import { ArrowIconLeft } from '../Icons/ArrowIcon';
import styles from './GoBackButton.module.scss';

type Props = {
  onClick: () => void;
};

export const GoBackButton: React.FC<Props> = ({ onClick }) => {
  return (
    <button className={styles.goBackButton} onClick={onClick}>
      <ArrowIconLeft />
      <p>Back</p>
    </button>
  );
};
