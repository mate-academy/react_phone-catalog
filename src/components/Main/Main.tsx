import React, { useEffect, useState } from 'react';
import { Slider } from '../Slider';
import { ProductsSlider } from '../ProductsSlider';
import { CartItem } from 'types/CartItem';
import styles from './Main.module.scss';
import { ProductType } from 'types/ProductType';
import phones from '../../../public/api/phones.json';
import tablets from '../../../public/api/tablets.json';
import accessories from '../../../public/api/accessories.json';
import { NavLink } from 'react-router-dom';

type Props = {
  handleAddToLiked: (item: number) => void;
  handleAddToCart: (item: number) => void;
  liked?: number[];
  cart: CartItem[];
  handleRemoveFromCart: (item: number) => void;
};

export const Main: React.FC<Props> = ({
  handleAddToCart,
  handleAddToLiked,
  liked,
  cart,
  handleRemoveFromCart,
}) => {
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    fetch('/api/products.json')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const newModals = products.sort((a, b) => b.year - a.year);
  const hotPrices = products.sort(
    // eslint-disable-next-line prettier/prettier
    (a, b) => (b.fullPrice - b.price )- (a.fullPrice - a.price),
  );

  const phoneCount = phones.length;
  const tabletsCount = tablets.length;
  const accessoriesCount = accessories.length;

  return (
    <>
      <Slider />
      <div className={styles.main}>
        <ProductsSlider
          liked={liked}
          cart={cart}
          handleAddToCart={handleAddToCart}
          handleAddToLiked={handleAddToLiked}
          handleRemoveFromCart={handleRemoveFromCart}
          title="Brand new models"
          filteredProducts={newModals}
        />
        <div className={styles.main_categories}>
          <p className={styles.main_categories_title}>Shop by category</p>
          <div className={styles.main_categories_block}>
            <NavLink to="/phones" className={styles.main_categories_type}>
              <div className={styles.main_categories_type_img}>
                <img src="/public/img/categories/phones.svg" alt="" />
              </div>
              <p className={styles.main_categories_type_title}>Mobile phones</p>
              <p className={styles.main_categories_type_count}>
                {phoneCount} models
              </p>
            </NavLink>
            <NavLink to="/tablets" className={styles.main_categories_type}>
              <div className={styles.main_categories_type_img}>
                <img src="/public/img/categories/tablets.svg" alt="" />
              </div>
              <p className={styles.main_categories_type_title}>Tablets</p>
              <p className={styles.main_categories_type_count}>
                {tabletsCount} models
              </p>
            </NavLink>
            <NavLink
              to="/accessories"
              className={`${styles.main_categories_type} ${styles.last_type}`}
            >
              <div
                className={`${styles.main_categories_type_img} ${styles.last_type_img}`}
              >
                <img src="/public/img/categories/accessories.svg" alt="" />
              </div>
              <p className={styles.main_categories_type_title}>Accessories</p>
              <p className={styles.main_categories_type_count}>
                {accessoriesCount} models
              </p>
            </NavLink>
          </div>
        </div>
        <div className={styles.main_hot_slider}>
          <ProductsSlider
            liked={liked}
            cart={cart}
            handleAddToCart={handleAddToCart}
            handleAddToLiked={handleAddToLiked}
            handleRemoveFromCart={handleRemoveFromCart}
            title="Hot prices"
            filteredProducts={hotPrices}
          />
        </div>
      </div>
    </>
  );
};
