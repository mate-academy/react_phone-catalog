import { FC, useEffect, useState } from 'react';
import cn from 'classnames';

import { selectProductsStatus } from '../../features/productsSlice';
import { useAppSelector } from '../../app/hooks';
import { IPhone } from '../../types';
import { PhoneItem } from '../PhoneItem';
import { Loader } from '../Loader';

import { ArrowLeft, ArrowRight } from '../../icons';
import './PhonesSlider.scss';

type Props = {
  newProducts: IPhone[];
  title: string
};

export const ProductsSlider: FC<Props> = ({ newProducts, title }) => {
  const phonesStatus = useAppSelector(selectProductsStatus);
  const [position, setPosition] = useState(0);
  const [frameSize, setFrameSize] = useState(4);
  const [maxPosition, setMaxPosition]
    = useState(newProducts.length - frameSize);

  // const frameSize = 4;
  const itemWidth = 288;
  const minPosition = 0;
  // const maxPosition = newProducts.length - frameSize;

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

      if (windowWidth >= 1200) {
        newFrameSize = 4;
      } else if (windowWidth >= 640 && windowWidth <= 1199) {
        newFrameSize = 2;
      } else if (windowWidth >= 320 && windowWidth <= 639) {
        newFrameSize = 1;
      }

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
      {phonesStatus === 'loading' ? (<Loader />) : (
        <div className="phonesSlider__bottom">
          <ul className="phonesSlider__list">
            {newProducts.map((product) => (
              <li
                key={product.itemId}
                className="phonesSlider__item"
                style={{ transform: `translateX(${-(position * itemWidth)}px)` }}
              >
                <PhoneItem phone={product} />
              </li>
            ))}
          </ul>
        </div>
      )}

    </section>
  );
};
