import React from 'react';
import styles from './ProductItem.module.scss';
import { ProductType } from 'types/ProductType';
import { NavLink } from 'react-router-dom';
import { CartItem } from 'types/CartItem';
import { ProductItemType } from 'types/ProductItemType';
import phones from '../../../public/api/phones.json';
import tablets from '../../../public/api/tablets.json';
import accessories from '../../../public/api/accessories.json';

type Props = {
  product: ProductType;
  handleAddToLiked: (item: number) => void;
  handleAddToCart: (item: number) => void;
  liked?: number[];
  cart: CartItem[];
  handleRemoveFromCart: (item: number) => void;
};

export const ProductItem: React.FC<Props> = ({
  product,
  handleAddToCart,
  handleAddToLiked,
  liked,
  cart,
  handleRemoveFromCart,
}) => {
  if (!product) {
    return null;
  }

  let products: ProductItemType[] = [];

  if (product.category === 'phones') {
    products = phones as ProductItemType[];
  } else if (product.category === 'tablets') {
    products = tablets as ProductItemType[];
  } else if (product.category === 'accessories') {
    products = accessories as ProductItemType[];
  }

  const item = products.find(pr => pr.id === product.itemId);

  return (
    <div key={product.id} className={styles.product}>
      <NavLink
        className={styles.product_block}
        to={`/${product.category}/${product.itemId}`}
      >
        <img
          src={`/${product.image}`}
          alt=""
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
            <div>
              <img src="/img/buttons/PhoneCatalogHeartActive.svg" alt="" />
            </div>
          ) : (
            <div>
              <img src="/img/buttons/PhoneCatalogHeart.svg" alt="" />
            </div>
          )}
        </button>
      </div>
    </div>
  );
};
