import React from 'react';
import { useAppContext } from '../../AppContext';
import { Products } from '../../types/Products';
import styles from './Favourites.module.scss';
import { Link } from 'react-router-dom';
import { ModelItem } from '../HomePage/Models/ModelsItem';
import { Footer } from '../Footer';

interface Props {
  models: Products[];
}

export const Favourites: React.FC<Props> = ({ models }) => {
  const { favourites, currentPage } = useAppContext();

  const visibleFavourites = models.filter(product =>
    favourites.some(fav => fav.id === product.id),
  );

  return (
    <div className="page">
      <section className={styles.favourites}>
        {favourites.length === 0 ? (
          <div className={styles.favourites__empty}>
            <img
              src="img/product-not-found.png"
              alt="favouritesEmpty"
              className={styles['favourites__empty-image']}
            />
            <h2 className={styles.favourites__title}>
              Sory seems favourites is still empty!
            </h2>
          </div>
        ) : (
          <div className={styles.favourites__container}>
            <div className={styles.favourites__main}>
              <div className={styles.favourites__breadcrumbs}>
                <Link className={styles['favourites__breadcrumbs-link']} to="/">
                  <img src="./img/icons/Home.svg" alt="home" />
                </Link>
                <img
                  src="./img/icons/Chevron-right.svg"
                  alt="arrow"
                  className={styles['favourites__breadcrumbs-link']}
                />
                <p className={styles.favourites__current}>{currentPage}</p>
              </div>
              <div className={styles.favourites__general}>
                <h2 className={styles.favourites__title}>Favourites </h2>
                <p className={styles.favourites__subtitle}>
                  {`${favourites.length} items`}
                </p>
              </div>
            </div>
            <div className={styles.favourites__item}>
              {visibleFavourites.map(model => (
                <ModelItem
                  model={model}
                  key={model.id}
                  modelsTitle="Hot Price"
                />
              ))}
            </div>
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
};
