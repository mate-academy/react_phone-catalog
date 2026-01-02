import React, { useEffect, useState } from 'react';
import styles from './ProductSlider.module.scss';
// import FavoritesIcon from '../../icons/favorites_icon.png';
import Disabled_left from '../../icons/arrows/Disabled_left.png';
import Disabled_right from '../../icons/arrows/Disabled_right.png';
import Active_left from '../../icons/arrows/Active_left.png';
import Active_right from '../../icons/arrows/Active_right.png';
import { Link } from 'react-router-dom';
import { Buttons } from '../Buttons/Buttons';

export interface Product {
  id: number | string;
  name: string;
  price: number;
  fullPrice: number;
  image: string;
  screen: string;
  capacity: string;
  ram: string;
  category: string;
}

interface Props {
  title: string;
  products: Product[],
}

export const ProductSlider: React.FC<Props> = ({ title, products }) => {
  const [cardsToShow, setCardsToShow] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardsToShow(1);
      } else if (window.innerWidth < 1200) {
        setCardsToShow(3);
      }  else {
        setCardsToShow(4);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // const VISIBLE_COUNT = 4;

  const [startIndex, setStartIndex] = useState(0);
  const maxIndex = products.length;

  const visibleProducts = products.slice(
    startIndex,
    startIndex + cardsToShow,
  );

  const handleLeftButton = () => {
    setStartIndex(prev => prev - 1);
  };

  const handleRightButton = () => {
    setStartIndex(prev => prev + 1);
  };

  const isLeftDisabled = startIndex === 0;
  const isRightDisabled = startIndex === maxIndex - cardsToShow;

  return (
    <div className={styles.product_slider}>
      <div className={styles.product_slider__top_bar}>
        <h3>{title}</h3>
        <div className={styles.product_slider__top_bar__buttons}>
          <button
            onClick={handleLeftButton}
            disabled={isLeftDisabled}
            className={styles.product_slider__top_bar__buttons__button}
          >
            {isLeftDisabled ? (
              <img src={Disabled_left} alt="Previous products" className={styles.product_slider__top_bar__buttons__button__img} />
            ) : (
              <img src={Active_left} alt="Previous products" className={styles.product_slider__top_bar__buttons__button__img} />
            )}
          </button>
          <button
            onClick={handleRightButton}
            disabled={isRightDisabled}
            className={styles.product_slider__top_bar__buttons__button}
          >
            {isRightDisabled ? (
              <img src={Disabled_right} alt="Next products" className={styles.product_slider__top_bar__buttons__button__img} />
            ) : (
              <img src={Active_right} alt="Next products" className={styles.product_slider__top_bar__buttons__button__img} />
            )}
          </button>
        </div>
      </div>

      <div className={styles.product_slider__container}>
        {visibleProducts.map(item => (
          <div key={item.id} className={styles.product_slider__item}>
            <div className={styles.product_slider__item__container}>
              <Link to={`/${item.category}/${item.id}`} className={styles.product_slider__link}>
                <img
                  src={item.image}
                  alt='Item Main Image'
                  className={styles.product_slider__item__img}
                />
                <p className={styles.product_slider__item__name}>{item.name}</p>
                <div className={styles.product_slider__item__price__container}>
                  <h4 className={styles.product_slider__item__price__container__main_price}>${item.price}</h4>
                  <p className={styles.product_slider__item__price__container__full_price}>${item.fullPrice}</p>
                </div>
                <div className={styles.product_slider__item__description}>
                  <p className={styles.product_slider__item__description__key}>Screen:</p>
                  <p className={styles.product_slider__item__description__value}>{item.screen}</p>
                </div>
                <div className={styles.product_slider__item__description}>
                  <p className={styles.product_slider__item__description__key}>Capacity:</p>
                  <p className={styles.product_slider__item__description__value}>{item.capacity}</p>
                </div>
                <div className={styles.product_slider__item__description}>
                  <p className={styles.product_slider__item__description__key}>RAM:</p>
                  <p className={styles.product_slider__item__description__value}>{item.ram}</p>
                </div>
              </Link>

              {/* <div className={styles.product_slider__item__buttons}>
                <button className={styles.product_slider__item__buttons__cart}>Add to cart</button>
                <button className={styles.product_slider__item__buttons__fav}>
                  <img src={FavoritesIcon} alt='Add to favorites' className={styles.product_slider__item__buttons__fav__icon} />
                </button>
              </div> */}
              <Buttons productId={String(item.id)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
