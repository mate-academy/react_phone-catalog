// import { useEffect, useState } from 'react';
import { Banner } from '../../components/Banner/Banner';
import { Categories } from '../../components/Categories/Categories';
import { ProductSlider } from '../../components/ProductSlider/ProductSlider';
import styles from './HomePage.module.scss';
import { mapPhoneToProduct } from '../../utils/mapPhoneToProduct';
import { useEffect, useState } from 'react';

export const HomePage = () => {
  const [phones, setPhones] = useState([]);

  useEffect(() => {
    fetch('/api/phones.json')
      .then(res => res.json())
      .then(setPhones);
  }, []);

  const products = phones.map(mapPhoneToProduct);

  return (
    <main className={styles.home}>
      {/* Slider */}
      <Banner />

      <ProductSlider title="Brand new models" products={products} />

      <Categories />

      {/* <ProductSlider title="Hot prices" /> */}
    </main>
  );
};
