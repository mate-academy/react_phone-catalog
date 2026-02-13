import { useNavigationTracker } from '@features/index';
import { ArrowIcon } from '@shared/icons';
import styles from './returnButton.module.scss';

export const ReturnButton = () => {
  const { goBack } = useNavigationTracker();

  return (
    <button className={styles['return-button']} onClick={goBack}>
      <ArrowIcon direction="left" />
      Back
    </button>
  );
};
