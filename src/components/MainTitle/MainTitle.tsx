import React from 'react';
import styles from './MainTitle.module.scss';
import '../../styles/App.scss';

type MainTitleProps = {
  children: React.ReactNode;
};

const MainTitle: React.FC<MainTitleProps> = ({ children }) => {
  return <h1 className={`${styles.title} `}>{children}</h1>;
};

export default MainTitle;
