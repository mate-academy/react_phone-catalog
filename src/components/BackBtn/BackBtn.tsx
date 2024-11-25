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
  const browsing = sessionStorage.getItem('browsing');

  const goBack = () => {
    if (path || browsing) {
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
      <span className={styles.arrowLeft}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* eslint-disable-next-line max-len */}
          <path d="M10.4715 3.52861C10.2111 3.26826 9.78903 3.26826 9.52868 3.52861L5.52868 7.52861C5.26833 7.78896 5.26833 8.21107 5.52868 8.47141L9.52868 12.4714C9.78903 12.7318 10.2111 12.7318 10.4715 12.4714C10.7318 12.2111 10.7318 11.789 10.4715 11.5286L6.94289 8.00001L10.4715 4.47141C10.7318 4.21107 10.7318 3.78896 10.4715 3.52861Z" />
        </svg>
      </span>
      <span className={styles.backText}>Back</span>
    </div>
  );
};
