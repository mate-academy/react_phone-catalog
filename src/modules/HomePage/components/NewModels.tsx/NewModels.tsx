import React from 'react';
import styles from '../HomePage.module.scss';

type Props = {
    articles: Article[];
};

export const NewModels: React.FC<Props> = ({ articles }) => {
  return <div className={styles.models}>

  </div>;
};
