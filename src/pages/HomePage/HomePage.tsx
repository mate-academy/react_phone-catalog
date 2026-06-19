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
    fetch(`${import.meta.env.BASE_URL}api/phones.json`)
      .then(res => res.json())
      .then(setPhones);
  }, []);

  const phonesApi = phones.map(mapPhoneToProduct);

  return (
    <main className={styles.home}>
      {/* Slider */}
      <Banner />

      <ProductSlider
        name="Brand new models"
        phones={phonesApi}
        showDiscount={false}
      />

      <Categories />

      <ProductSlider name="Hot prices" phones={phonesApi} showDiscount={true} />
    </main>
  );
};
