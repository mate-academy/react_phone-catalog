import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowIcon } from '../Icons/ArrowIcon';
import styles from './BackBtn.module.scss';

export const BackBtn = () => {
  const { key } = useLocation();
  const navigate = useNavigate();

  function goBack() {
    if (key === 'default') {
      return navigate('..');
    }

    return navigate(-1);
  }

  return (
    <div onClick={goBack} className={styles.backBtn}>
      <ArrowIcon />
      <p className="text-small">Back</p>
    </div>
  );
};
