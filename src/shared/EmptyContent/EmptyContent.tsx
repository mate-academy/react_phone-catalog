import React from 'react';
import styles from './EmptyContent.module.scss';

interface IEmptyContentProps {
  title?: string,
  img: string,
}

const EmptyContent: React.FC<IEmptyContentProps> = ({ title, img }) => {
  return (
    <div className={styles.isEmpty}>
      <h1>{title}</h1>
      <img src={img} />
    </div>
  );
};

export default EmptyContent;
