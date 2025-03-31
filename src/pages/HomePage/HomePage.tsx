import { useEffect, useState } from 'react';
import { PicturesSlider } from '../../components/PicturesSwiper';
import { ProductSwiper } from '../../components/ProductSwiper';
import styles from './HomePage.module.scss';
import { NavLink } from 'react-router-dom';
import { Product } from '../../types/Product';
import { Phones } from '../../types/Phones';
import { Tablets } from '../../types/Tablets';
import { Accessories } from '../../types/Accessories';

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [phones, setPhones] = useState<Phones[]>([]);
  const [tablets, setTablets] = useState<Tablets[]>([]);
  const [accessories, setAccessories] = useState<Accessories[]>([]);
  const names = ['Brand new models', 'Hot prices'];

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}api/products.json`)
      .then(response => response.json())
      .then(data => setProducts(data));
  }, []);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}api/phones.json`)
      .then(response => response.json())
      .then(data => setPhones(data));
  }, []);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}api/tablets.json`)
      .then(response => response.json())
      .then(data => setTablets(data));
  }, []);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}api/accessories.json`)
      .then(response => response.json())
      .then(data => setAccessories(data));
  }, []);

  const newModels = products.filter(product => product.year === 2022);
  const productsWithDifference = products.map(product => ({
    ...product,
    priceDifference: product.fullPrice - product.price,
  }));
  const sortedByDifference = productsWithDifference.sort(
    (a, b) => b.priceDifference - a.priceDifference,
  );

  const handleNavLinkClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className={styles.home}>
      <h1 className={styles.home__title}>Welcome to Nice Gadgets store!</h1>
      <PicturesSlider />
      {products.length > 0 && (
        <ProductSwiper name={names[0]} products={newModels} />
      )}
      <div className={styles.home__category}>
        <h2 className={styles.home__category_title}>Shop by category</h2>
        <div className={styles.home__category_links}>
          <NavLink
            to="/phones"
            className={styles.home__category_link}
            onClick={handleNavLinkClick}
          >
            <div
              style={{ backgroundColor: '#6D6474' }}
              className={styles.home__category_square}
            >
              <img
                className={styles.home__category_img}
                src={`${import.meta.env.BASE_URL}img/category-phones.png`}
                alt="category phones"
              />
            </div>
            <div className={styles.home__category_description}>
              <h4 className={styles.home__category_name}>Mobile phones</h4>
              <p className={styles.home__category_count}>
                {phones.length} models
              </p>
            </div>
          </NavLink>
          <NavLink
            to="/tablets"
            className={styles.home__category_link}
            onClick={handleNavLinkClick}
          >
            <div
              style={{ backgroundColor: '#8D8D92' }}
              className={styles.home__category_square}
            >
              <img
                className={styles.home__category_img}
                src={`${import.meta.env.BASE_URL}img/category-tablets.png`}
                alt="category tablets"
              />
            </div>
            <div className={styles.home__category_description}>
              <h4 className={styles.home__category_name}>Tablets</h4>
              <p className={styles.home__category_count}>
                {tablets.length} models
              </p>
            </div>
          </NavLink>
          <NavLink
            to="/accessories"
            className={styles.home__category_link}
            onClick={handleNavLinkClick}
          >
            <div
              style={{ backgroundColor: '#973D5F' }}
              className={styles.home__category_square}
            >
              <img
                style={{ height: '80%' }}
                className={styles.home__category_img}
                src={`${import.meta.env.BASE_URL}img/category-accessories.png`}
                alt="category accessories"
              />
            </div>
            <div className={styles.home__category_description}>
              <h4 className={styles.home__category_name}>Accessories</h4>
              <p className={styles.home__category_count}>
                {accessories.length} models
              </p>
            </div>
          </NavLink>
        </div>
      </div>
      {products.length > 0 && (
        <ProductSwiper name={names[1]} products={sortedByDifference} />
      )}
    </div>
  );
};
