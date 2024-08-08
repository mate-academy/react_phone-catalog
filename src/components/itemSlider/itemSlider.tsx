import React, { useContext, useEffect, useRef, useState } from 'react';
import Styles from './itemSlider.module.scss';
import { Item } from '../../types/Item';
import { getNumber } from '../../functions/getNumber';
import { ProductCard } from '../productCard';
import { ContextApp } from '../../appContext/AppContext';

type Props = {
  list: Item[];
  title: string;
  discount?: boolean;
  showRandom?: boolean;
};

export const ItemSlider: React.FC<Props> = ({
  title,
  discount,
  showRandom,
  list,
}) => {
  const { isTablet, isDesktop } = useContext(ContextApp);

  const [active, setActive] = useState(0);
  const [copyProducts, setCopyProducts] = useState<Item[]>([]);
  const [productsTotalNumber, setProductsTotalNumber] = useState(0);
  const startTouch = useRef<number | null>(0);
  const endTouch = useRef<number | null>(0);

  const handlerTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    startTouch.current = e.touches[0].clientX;
  };

  const handlerTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    endTouch.current = e.touches[0].clientX;
  };

  const handlerTouchEnd = () => {
    if (startTouch.current && endTouch.current) {
      if (startTouch.current - endTouch.current > 10) {
        setActive(prevState => (prevState + 1) % productsTotalNumber);
      }

      if (startTouch.current - endTouch.current < -10) {
        setActive(
          prevState =>
            (prevState - 1 + productsTotalNumber) % productsTotalNumber,
        );
      }

      startTouch.current = null;
      endTouch.current = null;
    }
  };

  const getSuggestedProducts = (number: number) => {
    const minNumber = Math.max(1, Math.floor(Math.random() * number));
    let maxNumber = Math.max(4, getNumber(minNumber, number));

    if (minNumber === maxNumber) {
      console.log('in');
      maxNumber = Math.max(4, getNumber(minNumber, number));
    }
    const newProducts = list.slice(minNumber, maxNumber);

    setCopyProducts(newProducts);
    setProductsTotalNumber(
      newProducts.length - ((isTablet ? 2 : 0) | (isDesktop ? 3 : 0)),
    );
  };

  useEffect(() => {
    if (showRandom) {
      getSuggestedProducts(list.length);
    } else {
      setCopyProducts([...list]);
      setProductsTotalNumber(
        list.length - ((isTablet ? 2 : 0) | (isDesktop ? 3 : 0)),
      );
    }
  }, [showRandom, list]);

  const handlerLeft = () => {
    setActive(
      prevState => (prevState - 1 + productsTotalNumber) % productsTotalNumber,
    );
  };

  const handlerRight = () => {
    setActive(prevState => (prevState + 1) % productsTotalNumber);
  };

  return (
    <div className={Styles['brand_new_models']}>
      <div className={Styles['brand_new_models__container']}>
        <h2 className={Styles['brand_new_models__title']}>{title}</h2>
        <div className={Styles['brand_new_models__button']}>
          <div
            onClick={handlerLeft}
            className={Styles['brand_new_models__button__left']}
          ></div>
          <div
            onClick={handlerRight}
            className={Styles['brand_new_models__button__right']}
          ></div>
        </div>
      </div>

      <div
        onTouchStart={handlerTouchStart}
        onTouchEnd={handlerTouchEnd}
        onTouchMove={handlerTouchMove}
        className={Styles['brand_new_models__slider']}
      >
        {copyProducts
          .sort((a, b) => b.priceRegular - a.priceRegular)
          .map((product: Item) => (
            <ProductCard
              style={{
                transform: `translateX(-${active * 267}px)`,
                transition: 'transform 0.5s ease-in-out',
              }}
              type={product.category}
              key={product.id}
              product={product}
              discount={!!discount}
            />
          ))}
      </div>
    </div>
  );
};
