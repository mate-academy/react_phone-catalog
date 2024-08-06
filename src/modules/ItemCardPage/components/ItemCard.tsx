import React from 'react';
import styles from './ItemCard.module.scss';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks';

export const ItemCard: React.FC = () => {
  const title = useAppSelector(state => state.pagesDetails.title);

  return (
    <div>
      <div className={styles.itemsCard}>
        <div className={styles.itemsCard__path}>
          <Link to="/">
            <img src="./icons/home-ico.svg" alt="home" />
          </Link>

          <img src="./icons/arrow-right-light-ico.svg" alt="arrow-right" />

          <h1 className={styles.catalog__title}>{title}</h1>
        </div>
      </div>
    </div>
  );
};
