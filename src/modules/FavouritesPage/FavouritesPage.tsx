import React, { useMemo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../app/store/store';
import { ProductCard } from '../../shared/ProductCard/ProductCard';
import styles from './FavouritesPage.module.scss';
import productNotFound from '../../images/other_images/product-not-found.png';
import homeIcon from '../../images/icons/home-2x.png';

export const FavouritesPage: React.FC = () => {
  const navigate = useNavigate();
  const favouriteItems = useSelector(
    (state: RootState) => state.favourites.items,
  );

  const totalCount = favouriteItems.length;
  const itemsLabel = useMemo(
    () => (totalCount === 1 ? 'item' : 'items'),
    [totalCount],
  );

  const handleGoBack = useCallback(() => navigate('..'), [navigate]);

  const handleProductClick = useCallback(
    (category: string, itemId: string) => {
      if (category && itemId) {
        navigate(`/${category}/${itemId}`);
      }
    },
    [navigate],
  );

  return (
    <section className="container">
      <div className={styles.favourites}>
        <div className={styles.favourites_backContainer}>
          <img
            src={homeIcon}
            alt="Home"
            className={styles.favourites_backContainer_img}
            onClick={handleGoBack}
          />

          <span className={styles.favourites_backContainer_backText}>
            Favourites
          </span>
        </div>

        <h1 className={styles.favourites_title}>Favourites</h1>
        <p className={styles.favourites_count}>
          {totalCount} {itemsLabel}
        </p>

        {totalCount > 0 ? (
          <ul className={styles.favourites_list}>
            {favouriteItems.map(product => (
              <ProductCard
                key={product.id}
                {...product}
                onClick={() =>
                  handleProductClick(product.category, product.itemId)
                }
                className={styles.favourites_card}
              />
            ))}
          </ul>
        ) : (
          <div className={styles.favourites_empty}>
            <img
              src={productNotFound}
              alt="No favourites found"
              className={styles.favourites_emptyImg}
            />
          </div>
        )}
      </div>
    </section>
  );
};
