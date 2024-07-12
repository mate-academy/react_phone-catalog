import React from 'react';
import styles from './Favourites.module.scss';
import { Products } from '../../types/Products';
import { ModelItem } from '../HomePage/Models/ModelItem';
import { Footer } from '../Footer';
import { useAppContext } from '../../AppContext';
import { Link } from 'react-router-dom';

interface Props {
  models: Products[];
}

export const Favourites: React.FC<Props> = ({ models }) => {
  const { favourites, currentPage } = useAppContext();

  const visiblFavourites = models.filter(product =>
    favourites.some(fav => fav.id === product.id),
  );

  return (
    <div className="page">
      <section className={styles.favourites}>
        {favourites.length === 0 ? (
          <div className={styles.favourites__empty}>
            <img
              className={styles['favourites__empty-image']}
              src="img/cart-is-empty.png"
              alt="favouritesEmpty"
            />
            <h2 className={styles.favourites__title}>
              Ooop`s, seems favourites is still empty!
            </h2>
          </div>
        ) : (
          <div className={styles.favourites__container}>
            <div className={styles.favourites__main}>
              <div className={styles.favourites__breadcrumbs}>
                <Link className={styles['favourites__breadcrumbs-link']} to="/">
                  <img src="/img/products/home.svg" alt="home" />
                </Link>
                <img
                  className={styles['favourites__breadcrumbs-link']}
                  src="/img/products/arrow.svg"
                  alt="arrow"
                />
                <Link
                  className={styles['favourites__breadcrumbs-link']}
                  to="./"
                >
                  <p className={styles.favourites__current}>{currentPage}</p>
                </Link>
              </div>
              <div className={styles.favourites__general}>
                <h2 className={styles.favourites__title}>Favourites</h2>
                <p className={styles.favourites__subtitle}>
                  {`${favourites.length} items`}
                </p>
              </div>
            </div>
            <div className={styles.favourites__items}>
              {visiblFavourites.map(model => (
                <ModelItem
                  model={model}
                  key={model.id}
                  modelsTitle="Hot prices"
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
