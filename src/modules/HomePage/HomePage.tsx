import style from './HomePage.module.scss';
import accessories from '../../../public/img/accessories-category.png';
import tables from '../../../public/img/tables-category.png';
import phone from '../../../public/img/phones-category.png';
import { Link } from 'react-router-dom';
import { useContext } from 'react';

import { Carousel } from './components/Carousel/Carousel';
import slider from '../../../public/api/slider.json';
import { ProductsSlider } from '../../components/ProductsSlider';
import { StateContext } from '../../provider/GlobalProvider';

export const HomePage = () => {
  const { productList } = useContext(StateContext);

  const productCount = (type: string) => {
    return productList.filter(item => item.category === type).length;
  };

  const phoneCount = productCount('phones');
  const tabletsCount = productCount('tablets');
  const accessoriesCount = productCount('accessories');

  return (
    <div className={style['home-page']}>
      <h1 hidden>Product Catalog</h1>
      <h2 className={style['home-page__title']}>
        Welcome to Nice Gadgets store!
      </h2>

      <div className={style['home-page__carousel']}>
        <Carousel slider={slider} />
      </div>

      <main className={style.main}>
        <ProductsSlider
          title="Brand new models"
          productList={productList}
          sort="price"
          discount={false}
        />

        <section className={style.shop}>
          <h3 className={style.shop__title}>Shop by category</h3>
          <div className={style.shop__items}>
            <Link to={'phones'} className={style.shop__category}>
              <div className={style.shop__category__container}>
                <img
                  className={style.shop__categoryImg}
                  src={phone}
                  alt="Phone img"
                />
              </div>
              <div className={style.shop__info}>
                <p className={style.shop__info__title}>Mobile phones</p>
                <p className={style.shop__info__quantity}>
                  {phoneCount} models
                </p>
              </div>
            </Link>

            <Link to={'tablets'} className={style.shop__category}>
              <div
                className={`${style.shop__category__container}
                  ${style['shop__category__container--tables']}`}
              >
                <img
                  className={style.shop__categoryImg}
                  src={tables}
                  alt="Phone img"
                />
              </div>
              <div className={style.shop__info}>
                <p className={style.shop__info__title}>Tablets</p>
                <p className={style.shop__info__quantity}>
                  {tabletsCount} models
                </p>
              </div>
            </Link>
            <Link to={'accessories'} className={style.shop__category}>
              <div
                className={`${style.shop__category__container}
                  ${style['shop__category__container--accessories']}`}
              >
                <img
                  className={style.shop__categoryImg}
                  src={accessories}
                  alt="accessories img"
                />
              </div>
              <div className={style.shop__info}>
                <p className={style.shop__info__title}>Accessories</p>
                <p className={style.shop__info__quantity}>
                  {accessoriesCount} models
                </p>
              </div>
            </Link>
          </div>
        </section>

        <ProductsSlider
          title="Hot prices"
          productList={productList}
          sort="year"
        />
      </main>
    </div>
  );
};
