import { useNavigate } from 'react-router-dom';
import React from 'react';

import styles from './BackBtn.module.scss';

interface Props {
  path: string;
  prevPath: string;
  search: string;
}

export const BackBtn: React.FC<Props> = ({ path, prevPath, search }) => {
  const navigate = useNavigate();

  const goBack = () => {
    if (path) {
      navigate(-1);
    } else {
      navigate({
        pathname: prevPath,
        search,
      });
    }
  };

  return (
    <div onClick={goBack} className={styles.goBack}>
      <span className={styles.arrowLeft}></span>
      <span className={styles.backText}>Back</span>
    </div>
  );
};
