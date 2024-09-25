/* eslint-disable max-len */
import React from 'react';
import { useCart } from '../UseCart/UseCart';
import { DiscountProductCard } from '../HotPrices/DiscountProductCard/DiscountProductCard';
import { useNavigate } from 'react-router-dom';
import styles from './Favorites.module.scss';

export const Favorites: React.FC = () => {
  const { state, dispatch } = useCart();
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <div className={styles.container}>
      <div className={styles.navigation}>
        <button className={styles.button_home} onClick={handleBackClick}>
          <img src="img/Home.svg" alt="" />
        </button>
        <img src="img/Arrow-right.svg" alt="arrow" />
        <h2 className={styles.navigation_text}>Favorites</h2>
      </div>
      <h1>Favorites</h1>
      <h2 className={styles.navigation_items_left}>
        {state.favorites.length} items
      </h2>
      {state.favorites.length === 0 ? (
        <p>You have no favorites</p>
      ) : (
        <div className={styles.favoritesGrid}>
          {state.favorites.map(product => (
            <DiscountProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.priceRegular}
              discountPrice={product.priceDiscount}
              imageUrl={product.images[0]}
              isFavorite={true}
              screen={product.screen}
              capacity={product.capacity}
              ram={product.ram}
              onAddToCart={() => dispatch({ type: 'ADD_TO_CART', product })}
              onToggleFavorite={() =>
                dispatch({ type: 'TOGGLE_FAVORITE', product })
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};
