import styles from './homeface.module.scss';
import row from './productSlider.module.scss';
import classNames from 'classnames';
import { CardComponent } from '../../main/CardComponent/CardComponent';
import { useProducts } from '../../../context/ProductsProvider';
import { ShopingCard } from './ShopingCard';
import { useState } from 'react';

export const ProductsSlider = () => {
  const products = useProducts();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentSlideHotPrices, setCurrentSlideHotPrices] = useState(0);

  const productsByPrice = products.slice().sort((a, b) => b.price - a.price);

  const salePrice = products.slice().sort((a, b) => a.price - b.price);

  const nextSlideHotPrices = () => {
    const totalProduct = salePrice.length;
    const nextSlides = (currentSlideHotPrices + 1) % totalProduct;

    setCurrentSlideHotPrices(nextSlides);
  };

  const prevSlideHotPrices = () => {
    const prevSlides =
      currentSlideHotPrices === 0 ? 0 : currentSlideHotPrices - 1;

    setCurrentSlideHotPrices(prevSlides);
  };

  const nextSlide = () => {
    const totalProduct = products.length;

    const nextSlides = (currentSlide + 1) % totalProduct;

    setCurrentSlide(nextSlides);
  };

  const previosSlide = () => {
    const prevSlides = currentSlide === 0 ? 0 : currentSlide - 1;

    setCurrentSlide(prevSlides);
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
          style={{
            transform: `translateX(calc(-${currentSlide * 25}%))`,
          }}
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
          <button
            className={classNames(styles.product_slide_buttons)}
            onClick={prevSlideHotPrices}
          >
            &lt;
          </button>

          <button
            className={classNames(styles.product_slide_buttons)}
            onClick={nextSlideHotPrices}
          >
            &gt;
          </button>
        </div>
      </div>

      <div className={row.slider_container}>
        <div
          className={classNames(row.slider_card, row.slider_prev)}
          style={{
            transform: `translateX(calc(-${currentSlideHotPrices * 25}%))`,
          }}
        >
          {salePrice.map(product => (
            <CardComponent
              key={product.id}
              devices={product}
              salePrice={product.fullPrice}
            />
          ))}
        </div>
      </div>
    </>
  );
};
