import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../app/store';
import { ProductCard } from '../shared/ProductCard';
import image from '../../assets/img/product-not-found.png';
import home from '../../assets/img/icons/home-icon.png';
import styles from './FavouritesPage.module.scss';

export const FavouritesPage: React.FC = () => {
  const favourites = useSelector((state: RootState) => state.favourites.items);
  const navigate = useNavigate();

  const items = favourites.length === 1 ? 'item' : 'items';

  const handleProductClick = (
    selectedId: number | string,
    selectedProductId: string,
    category: string,
  ) => {
    const idToNavigate = selectedProductId || selectedId;

    navigate(`/${category}/${idToNavigate}`);
  };

  return (
    <section className={'container'}>
      <div className={styles.favourites}>
        <div className={styles.favourites_backContainer}>
          <img
            src={home}
            alt="home"
            className={styles.favourites_backContainer_img}
            onClick={() => navigate('..')}
          />

          <span className={styles.favourites_backContainer_backText}>
            Favourites
          </span>
        </div>
        <h1 className={styles.favourites_title}>Favourites</h1>
        <p className={styles.favourites_count}>
          {favourites.length} {items}
        </p>

        {favourites.length > 0 ? (
          <ul className={styles.favourites_list}>
            {favourites.map(fav => (
              <ProductCard
                key={fav.id}
                {...fav}
                // isNew={fav.fullPrice !== fav.price} // Визначаємо чи є знижка
                onClick={() =>
                  handleProductClick(fav.id, fav.itemId, fav.category)
                }
                className={styles.favourites_card}
              />
            ))}
          </ul>
        ) : (
          <div className={styles.favourites_empty}>
            <img
              src={image}
              alt="empty"
              className={styles.favourites_emptyImg}
            />
          </div>
        )}
      </div>
    </section>
  );
};
