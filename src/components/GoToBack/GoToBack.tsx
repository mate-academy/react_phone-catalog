import classNames from 'classnames';
import styles from './GoToBack.module.scss';
import { useNavigate } from 'react-router-dom';

export const GoToBack = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.goToBack} onClick={() => navigate('..')}>
      <span
        className={classNames('icon', 'icon--arrow', 'icon--arrow--left')}
      ></span>
      Back
    </div>
  );
};
