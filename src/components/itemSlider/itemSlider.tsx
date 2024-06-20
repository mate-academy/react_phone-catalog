import React, { useEffect, useRef, useState } from 'react';
import Styles from './itemSlider.module.scss';
import { Item } from '../../types/Item';
import { getNumber } from '../../functions/getNumber';
import { ProductCard } from '../productCard';

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
  const [active, setActive] = useState(0);
  const [copyProducts, setCopyProducts] = useState<Item[]>([...list]);
  const [productsTotalNumber, setProductsTotalNumber] = useState(list.length);
  const startTouch = useRef<number>(0);
  const endTouch = useRef<number>(0);

  const handlerTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    startTouch.current = e.touches[0].clientX;
  };

  const handlerTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    endTouch.current = e.touches[0].clientX;
  };

  const handlerTouchEnd = () => {
    if (startTouch.current - endTouch.current > 40) {
      setActive(prevState => (prevState + 1) % productsTotalNumber);
    }

    if (startTouch.current - endTouch.current < -40) {
      setActive(
        prevState =>
          (prevState - 1 + productsTotalNumber) % productsTotalNumber,
      );
    }
  };

  useEffect(() => {
    if (showRandom) {
      const maxNumber = getNumber(15, 124);
      const minNumber = Math.floor(Math.random() * 10);
      const newProducts = [...list].slice(minNumber, maxNumber);
      setCopyProducts(newProducts);
      setProductsTotalNumber(newProducts.length);
    } else {
      setCopyProducts([...list]);
      setProductsTotalNumber(copyProducts.length);
    }
  }, [showRandom, list]);

  const handlerleft = () => {
    if (active < 0) {
      setActive(productsTotalNumber);
    }
    setActive(
      prevState => (prevState - 1 + productsTotalNumber) % productsTotalNumber,
    );
  };
  const handlerRight = () => {
    if (active > productsTotalNumber) {
      setActive(0);
    }
    setActive(prevState => (prevState + 1) % productsTotalNumber);
  };

  return (
    <>
      <div className={Styles['brand_new_models']}>
        <div className={Styles['brand_new_models__container']}>
          <h2 className={Styles['brand_new_models__title']}>{title}</h2>
          <div className={Styles['brand_new_models__button']}>
            <div
              onClick={handlerleft}
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
          style={{
            transform: `translateX(-${active * 303}px)`,
            transition: 'transform 0.5s ease-in-out',
          }}
          className={Styles['brand_new_models__slider']}
        >
          {copyProducts
            .sort((a, b) => b.priceRegular - a.priceRegular)
            .map((product: Item) => {
              if (discount) {
                return (
                  <ProductCard
                    type={product.category}
                    key={product.id}
                    product={product}
                    discount={true}
                  />
                );
              }

              return (
                <ProductCard
                  type={product.category}
                  key={product.id}
                  product={product}
                  discount={false}
                />
              );
            })}
        </div>
      </div>
    </>
  );
};
