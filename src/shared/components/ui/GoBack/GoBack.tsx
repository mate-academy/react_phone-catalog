import { useNavigate } from 'react-router-dom';

import arrowBack from 'assets/img/icons/arrow-back-white.svg';

import styles from './GoBack.module.scss';

type Props = {
  message?: string;
  path?: string | number;
};

export const GoBack: React.FC<Props> = ({ message = 'Back', path = -1 }) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (typeof path === 'number') {
      navigate(path);
    } else {
      navigate(path);
    }
  };

  return (
    <button className={styles.goBack} type="button" onClick={handleGoBack}>
      <div className={styles.arrow}>
        <img alt="back" src={arrowBack} />
      </div>
      <span className={styles.text}>{message}</span>
    </button>
  );
};
