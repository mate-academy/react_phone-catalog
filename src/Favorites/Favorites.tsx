/* eslint-disable max-len */
import React from 'react';
import { useCart } from '../UseCart/UseCart';
import { DiscountProductCard } from '../HotPrices/DiscountProductCard/DiscountProductCard';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Favourites.module.scss';
import phones from '../../public/api/phones.json';
import tablets from '../../public/api/tablets.json';
import accessories from '../../public/api/accessories.json';

type AllProduct = {
  id: string;
  name: string;
  priceRegular: number;
  priceDiscount?: number;
  images: string[];
  quantity: number;
  screen?: string;
  capacity?: string;
  ram?: string;
};

export const Favorites: React.FC = () => {
  const { state, dispatch } = useCart();

  const findSameProduct = (productId: string): AllProduct | undefined => {
    const allProducts = [...phones, ...tablets, ...accessories];

    const foundProduct = allProducts.find(product => product.id === productId);

    return foundProduct ? { ...foundProduct, quantity: 1 } : undefined;
  };

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
        <h2 className={styles.title}>Favourites</h2>
      </div>
      <h1>Favourites</h1>
      <h2 className={styles.navigation_items_left}>
        {state.favorites.length} items
      </h2>
      {state.favorites.length === 0 ? (
        <p>You have no favourites</p>
      ) : (
        <div className={styles.favourites_grid}>
          {state.favorites.map(product => {
            const fullProduct = findSameProduct(product.id) || product;

            return (
              <Link
                to={`/product/${product.id}`}
                key={product.id}
                className={styles.link_product}
              >
                <DiscountProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.priceRegular}
                  discountPrice={
                    typeof product.priceDiscount === 'number'
                      ? product.priceDiscount
                      : undefined
                  }
                  imageUrl={fullProduct.images?.[0] ?? 'img/default-image.png'}
                  isFavorite={true}
                  screen={product.screen}
                  capacity={product.capacity}
                  ram={product.ram}
                  onAddToCart={() => dispatch({ type: 'ADD_TO_CART', product })}
                  onToggleFavorite={() =>
                    dispatch({ type: 'TOGGLE_FAVORITE', product })
                  }
                />
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};
