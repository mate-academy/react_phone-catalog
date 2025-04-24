import React from 'react';
import styles from './VectorBreadCrumbs.module.scss';
import { useNavigate } from 'react-router-dom';

export const VectorBreadCrumbs: React.FC = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <nav className={styles.breadcrumbs}>
      <ul>
        <li onClick={handleGoBack}></li>
        <li onClick={handleGoBack} className="smallText">
          Back
        </li>
      </ul>
    </nav>
  );
};
