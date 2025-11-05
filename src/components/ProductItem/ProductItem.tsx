/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import styles from './ProductItem.module.scss';
import { ProductType } from 'types/ProductType';
import { NavLink } from 'react-router-dom';
import { CartItem } from 'types/CartItem';
import { ProductItemType } from 'types/ProductItemType';

type Props = {
  product: ProductType;
  handleAddToLiked: (item: number) => void;
  handleAddToCart: (item: number) => void;
  liked?: number[];
  cart: CartItem[];
  handleRemoveFromCart: (item: number) => void;
};

type CategoryType = 'phones' | 'tablets' | 'accessories';

export const ProductItem: React.FC<Props> = ({
  product,
  handleAddToCart,
  handleAddToLiked,
  liked,
  cart,
  handleRemoveFromCart,
}) => {
  const [phones, setPhones] = useState<ProductItemType[]>([]);
  const [tablets, setTablets] = useState<ProductItemType[]>([]);
  const [accessories, setAccessories] = useState<ProductItemType[]>([]);

  useEffect(() => {
    fetch('api/phones.json')
      .then(res => res.json())
      .then(setPhones)
      .catch(err => console.error('Error loading phones.json', err));
  }, []);

  useEffect(() => {
    fetch('api/tablets.json')
      .then(res => res.json())
      .then(setTablets)
      .catch(err => console.error('Error loading tablets.json', err));
  }, []);

  useEffect(() => {
    fetch('api/accessories.json')
      .then(res => res.json())
      .then(setAccessories)
      .catch(err => console.error('Error loading accessories.json', err));
  }, []);

  const allProducts: Record<CategoryType, ProductItemType[]> = {
    phones,
    tablets,
    accessories,
  };

  const category = product.category as CategoryType;
  const products = allProducts[category] || [];

  const item = products.find(pr => pr.id === product.itemId);

  if (!product) {
    return null;
  }

  return (
    <div key={product.id} className={styles.product}>
      <NavLink
        className={styles.product_block}
        to={`/react_phone-catalog/${product.category}/${product.itemId}`}
      >
        <img
          src={`${product.image}`}
          alt={product.name}
          className={styles.product_block_img}
        />
      </NavLink>

      <p className={styles.product_title}>{product.name}</p>

      <div className={styles.product_price}>
        <p className={styles.product_price_discount}>${product.price}</p>
        <p className={styles.product_price_regular}>${item?.priceRegular}</p>
      </div>

      <div className={styles.product_border}></div>

      <table className={styles.product_table}>
        <tbody>
          <tr>
            <td className={styles.product_table_title}>Screen</td>
            <td className={styles.product_table_mean}>{product.screen}</td>
          </tr>
          <tr>
            <td className={styles.product_table_title}>Capacity</td>
            <td className={styles.product_table_mean}>{product.capacity}</td>
          </tr>
          <tr>
            <td className={styles.product_table_title}>RAM</td>
            <td className={styles.product_table_mean}>{product.ram}</td>
          </tr>
        </tbody>
      </table>

      <div className={styles.product_buttons}>
        {cart.find(pr => pr.id === product.id) ? (
          <button
            onClick={() => handleRemoveFromCart(product.id)}
            className={styles.product_buttons_cart_active}
          >
            Selected
          </button>
        ) : (
          <button
            onClick={() => handleAddToCart(product.id)}
            className={styles.product_buttons_cart}
          >
            Add to cart
          </button>
        )}

        <button
          onClick={() => handleAddToLiked(product.id)}
          className={styles.product_buttons_like}
        >
          {liked?.includes(product.id) ? (
            <img src="img/buttons/PhoneCatalogHeartActive.svg" alt="liked" />
          ) : (
            <img src="img/buttons/PhoneCatalogHeart.svg" alt="like" />
          )}
        </button>
      </div>
    </div>
  );
};
