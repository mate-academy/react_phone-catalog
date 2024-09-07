import styles from './homeface.module.scss';
import row from './productSlider.module.scss';
import classNames from 'classnames';
import { CardComponent } from '../../main/CardComponent/CardComponent';
// import { usePhones } from '../../../context/PhonesProvider';
import { useProducts } from '../../../context/ProductsProvider';
import { ShopingCard } from './ShopingCard';
import { useState } from 'react';
// import { useAccessories } from '../../../context/AccessoriesProvider';
// import { useTablets } from '../../../context/TabletProvider';

export const ProductsSlider = () => {
  const products = useProducts();
  const [currentSlide, setCurrentSlide] = useState(0);

  const productsByPrice = products.slice().sort((a, b) => b.price - a.price);

  const nextSlide = () => {
    setCurrentSlide(prev => (prev === products.length - 1 ? 0 : prev + 1));
  };

  const previosSlide = () => {
    setCurrentSlide(prev => (prev === 0 ? products.length - 1 : prev - 1));
  };

  return (
    <>
      <div className={row.slider}>
        <div>
          <h2 className={styles.home_font_h2}>Brand new models</h2>
        </div>

        <div className={row.slider_buttons}>
          <button
            className={classNames(styles.product_slide_buttons)}
            onClick={previosSlide}
          >
            &lt;
          </button>

          <button
            className={classNames(styles.product_slide_buttons)}
            onClick={nextSlide}
          >
            &gt;
          </button>
        </div>
      </div>

      <div className={row.slider_container}>
        <div
          className={row.slider_card}
          style={{ transform: `translateX(calc(-${currentSlide * 25}%))` }}
        >
          {productsByPrice.map(product => (
            <CardComponent key={product.id} devices={product} />
          ))}
        </div>
      </div>

      <div className={row.slider_shop}>
        <h2 className={styles.home_font_h2}>Shop by category</h2>
        <ShopingCard />
      </div>

      <div className={row.slider}>
        <div>
          <h2 className={styles.home_font_h2}>Hot prices</h2>
        </div>

        <div className={row.slider_buttons}>
          <button className={classNames(styles.product_slide_buttons)}>
            &lt;
          </button>

          <button className={classNames(styles.product_slide_buttons)}>
            &gt;
          </button>
        </div>
      </div>

      <div className={classNames(row.slider_card, row.slider_prev)}>
        {products.map(product => (
          <CardComponent key={product.id} devices={product} />
        ))}
      </div>
    </>
  );
};
