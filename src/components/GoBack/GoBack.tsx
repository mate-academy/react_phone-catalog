import { useNavigate } from 'react-router-dom';
import styles from './GoBack.module.scss';
import React from 'react';

type Props = {
  children: React.ReactNode;
};
export const GoBack: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();

  return (
    <div
      className={styles.goBack}
      onClick={() => navigate(-1)}
      style={{ cursor: 'pointer' }}
    >
      {children}
    </div>
  );
};
