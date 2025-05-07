import { useNavigate } from 'react-router-dom';
import styles from './GoBack.module.scss';
import React from 'react';
import { useTheme } from '../../context/ThemeContext';

type Props = {
  children: React.ReactNode;
};
export const GoBack: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();
  const { isDarkTheme } = useTheme();

  return (
    <div
      className={styles.goBack}
      onClick={() => navigate(-1)}
      style={{
        cursor: 'pointer',
        color: isDarkTheme ? '#F1F2F9' : '#89939A',
      }}
    >
      {children}
    </div>
  );
};
