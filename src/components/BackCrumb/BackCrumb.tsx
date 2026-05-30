import { useNavigate } from 'react-router-dom';

import ArrowLeft from '../../assets/Icons/Arrow_left.svg';

import styles from './BackCrumb.module.scss';

export const BackCrumb = () => {
  const navigate = useNavigate();
  const hasReferrer =
    !!document.referrer && document.referrer.startsWith(window.location.origin);

  const handleBack = () => {
    if (window.history.length > 1 && hasReferrer) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <>
      <div className={styles.back_crumb} onClick={handleBack}>
        <button className={styles.back_crumb__arrow}>
          <img src={ArrowLeft} alt="arrow_left" />
        </button>
        <div className={styles.back_crumb__text}>Back</div>
      </div>
    </>
  );
};
