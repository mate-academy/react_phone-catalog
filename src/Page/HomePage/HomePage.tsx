import { SwiperBaner } from './../../component/modules/SwiperBaner';
import { Categories } from './../../component/Categories';
import style from './HomePage.module.scss';
import { SwiperProduct } from './../../component/modules/SwiperProduct';
import { useEffect, useState } from 'react';
import { Products } from '../../types/Products';
import {
  getHotPriceProducts,
  getNewProduct,
} from './../../component/utils/sortingProducts';

export const HomePage = () => {
  const [hotPriceProducts, setHotPriceProducts] = useState<Products[]>([]);
  const [newModels, setNewModels] = useState<Products[]>([]);

  const slides = [
    './img/Logo/promo-slider-1.jpg',
    './img/Logo/promo-slider-2.jpg',
    './img/Logo/promo-slider-3.jpg',
  ];

  useEffect(() => {
    getHotPriceProducts().then(setHotPriceProducts);
    getNewProduct().then(setNewModels);
  }, []);

  return (
    <section className={style.home__page}>
      <div className={style.home__page__wrapper}>
        <h1 className="visually-hidden">Product Catalog</h1>
        <h2 className={style.home__page__title}>
          Welcome to Nice <br className={style['home__page__title-break']} />
          Gadgets store!
        </h2>
        <SwiperBaner slides={slides} />
      </div>
      <SwiperProduct products={newModels} title="Brand new models" />
      <Categories />
      <SwiperProduct products={hotPriceProducts} title="Hot price models" />
    </section>
  );
};
