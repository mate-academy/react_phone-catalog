import { FC, useEffect, useState } from 'react';
import cn from 'classnames';

import { selectProductsStatus } from '../../features/productsSlice';
import { useAppSelector } from '../../app/hooks';
import { IPhone } from '../../types';
import { ProductItem } from '../ProductItem';
import { Loader } from '../Loader';

import { ArrowLeft, ArrowRight } from '../../icons';
import './ProductsSlider.scss';

type Props = {
  newProducts: IPhone[];
  title: string
};

export const ProductsSlider: FC<Props> = ({ newProducts, title }) => {
  const productsStatus = useAppSelector(selectProductsStatus);
  const [position, setPosition] = useState(0);
  const [frameSize, setFrameSize] = useState(4);
  const [maxPosition, setMaxPosition]
    = useState(newProducts.length - frameSize);
  const [itemWidth, setItemWidth] = useState(288);

  const minPosition = 0;
  const marginRight = 16;

  const showNextPhone = () => {
    if (position + 1 < maxPosition) {
      setPosition(prev => prev + 1);
    } else {
      setPosition(maxPosition);
    }
  };

  const showPrevPhone = () => {
    if (position - 1 > minPosition) {
      setPosition(prev => prev - 1);
    } else {
      setPosition(minPosition);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      let newFrameSize = 4;
      let newItemWidth = 0;

      if (windowWidth >= 1200) {
        newFrameSize = 4;
        newItemWidth = 272;
      } else if (windowWidth >= 640 && windowWidth <= 1199) {
        newFrameSize = 2;
        newItemWidth = 237;
      } else if (windowWidth >= 320 && windowWidth <= 639) {
        newFrameSize = 1;
        newItemWidth = 212;
      }

      setItemWidth(newItemWidth);
      setFrameSize(newFrameSize);
      setMaxPosition(Math.max(newProducts.length - newFrameSize, 0));
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [newProducts.length, position]);

  return (
    <section className="phonesSlider">
      <div className="phonesSlider__top">
        <h2>{title}</h2>
        <div className="phonesSlider__buttons">
          <button
            type="button"
            className={cn(
              'phonesSlider__button',
              { disabled: position === minPosition },
            )}
            onClick={showPrevPhone}
          >
            {position === minPosition ? (
              <ArrowLeft color="#b4bdc3" />
            ) : (
              <ArrowLeft />
            )}
          </button>
          <button
            type="button"
            className={cn(
              'phonesSlider__button',
              { disabled: position === maxPosition },
            )}
            onClick={showNextPhone}
          >
            {position === maxPosition ? (
              <ArrowRight color="#b4bdc3" />
            ) : (
              <ArrowRight />
            )}
          </button>
        </div>
      </div>
      {productsStatus === 'loading' ? (<Loader />) : (
        <div className="phonesSlider__bottom">
          <ul className="phonesSlider__list">
            {newProducts.map((product) => (
              <li
                key={product.itemId}
                className="phonesSlider__item"
                style={{
                  transform: `translateX(${-(position * (itemWidth + marginRight))}px)`,
                }}
              >
                <ProductItem product={product} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};
