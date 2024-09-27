import styles from './homeface.module.scss';
import row from './productSlider.module.scss';
import classNames from 'classnames';

import { CardComponent } from '../../main/CardComponent/CardComponent';
import { ShopingCard } from './ShopingCard';
import { useState } from 'react';
import { useDevices } from '../../../context/DeviceProvider';

export const ProductsSlider = () => {
  const { products } = useDevices();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentSlideHotPrices, setCurrentSlideHotPrices] = useState(0);

  const productsByYear = products.slice().sort((a, b) => {
    if (b.year >= a.year) {
      return b.price - a.price;
    }

    return b.year - a.year;
  });

  const salePrice = products.slice().sort((a, b) => b.price - a.price);

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
      <div className={row.slider_shop_container}>
        <div className={row.slider}>
          <div>
            <h2 className={styles.home_font_h2}>Brand new models</h2>
          </div>

          <div className={row.slider_buttons}>
            <button
              className={classNames(styles.product_slide_buttons, {
                [styles.product_slide_buttons_disable]: currentSlide === 0,
              })}
              onClick={previosSlide}
            >
              &lt;
            </button>

            <button
              className={classNames(styles.product_slide_buttons, {
                [styles.product_slide_buttons_disable]:
                  currentSlide === products.length,
              })}
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
            {productsByYear.map(product => (
              <CardComponent key={product.id} devices={product} />
            ))}
          </div>
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
            className={classNames(styles.product_slide_buttons, {
              [styles.product_slide_buttons_disable]:
                currentSlideHotPrices === 0,
            })}
            onClick={prevSlideHotPrices}
          >
            &lt;
          </button>

          <button
            className={classNames(styles.product_slide_buttons, {
              [styles.product_slide_buttons_disable]:
                currentSlideHotPrices === products.length,
            })}
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
