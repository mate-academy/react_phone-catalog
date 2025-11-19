/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { Slider } from '../Slider';
import { ProductsSlider } from '../ProductsSlider';
import { CartItem } from 'types/CartItem';
import styles from './Main.module.scss';
import { ProductType } from 'types/ProductType';
import { NavLink } from 'react-router-dom';
import { ProductItemType } from 'types/ProductItemType';
import { Loader } from '../Loader';

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
  const [phones, setPhones] = useState<ProductItemType[]>([]);
  const [tablets, setTablets] = useState<ProductItemType[]>([]);
  const [accessories, setAccessories] = useState<ProductItemType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        await new Promise(resolve => setTimeout(resolve, 500));

        const [phonesRes, tabletsRes, accessoriesRes, productsRes] =
          await Promise.all([
            fetch('api/phones.json'),
            fetch('api/tablets.json'),
            fetch('api/accessories.json'),
            fetch('api/products.json'),
          ]);

        const [phonesData, tabletsData, accessoriesData, productsData] =
          await Promise.all([
            phonesRes.json(),
            tabletsRes.json(),
            accessoriesRes.json(),
            productsRes.json(),
          ]);

        setPhones(phonesData);
        setTablets(tabletsData);
        setAccessories(accessoriesData);
        setProducts(productsData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const newModals = products.sort((a, b) => b.year - a.year);
  const hotPrices = products.sort(
    // eslint-disable-next-line prettier/prettier
    (a, b) => b.fullPrice - b.price - (a.fullPrice - a.price),
  );

  const phoneCount = phones.length;
  const tabletsCount = tablets.length;
  const accessoriesCount = accessories.length;

  if (isLoading) {
    return <Loader />;
  }

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
                <img src="img/categories/phones.svg" alt="" />
              </div>
              <p className={styles.main_categories_type_title}>Mobile phones</p>
              <p className={styles.main_categories_type_count}>
                {phoneCount} models
              </p>
            </NavLink>
            <NavLink to="/tablets" className={styles.main_categories_type}>
              <div className={styles.main_categories_type_img}>
                <img src="img/categories/tablets.svg" alt="" />
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
                <img src="img/categories/accessories.svg" alt="" />
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
