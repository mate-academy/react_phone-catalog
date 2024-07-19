import React, { useEffect, useState } from 'react';
import { PhoneCard } from '../PhoneCard/PhoneCard';
import './HotPrices.scss';
import classNames from 'classnames';
import { ProductType } from '../../../../types/ProductType';
import { useAppSelector } from '../../../../app/hooks';

const shuffleArray = (array: ProductType[]) => {
  return array.sort(() => Math.random() - 0.5);
};

interface Props {
  title: string;
}

export const HotPrices: React.FC<Props> = ({ title }) => {
  const [imageIndex, setImageIndex] = useState(0);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [shuffledProducts, setShuffledProducts] = useState<ProductType[]>([]);
  const { theme } = useAppSelector(state => state.theme);

  const updateTranslateX = (index: number) => {
    if (screenWidth < 639) {
      return index * 65;
    } else if (screenWidth >= 639 && screenWidth < 1199) {
      return index * 55;
    } else {
      return index * 25;
    }
  };

  const translateX = updateTranslateX(imageIndex);

  useEffect(() => {
    let phonesData: ProductType[] = [];
    let tabletsData: ProductType[] = [];
    let accessoriesData: ProductType[] = [];
    let selectedProducts: ProductType[] = [];

    setTimeout(() => {
      const storedPhones = localStorage.getItem('phones');
      const storedTablets = localStorage.getItem('tablets');
      const storedAccessories = localStorage.getItem('accessories');

      if (storedPhones) {
        phonesData = JSON.parse(storedPhones) as ProductType[];
      }

      if (storedTablets) {
        tabletsData = JSON.parse(storedTablets) as ProductType[];
      }

      if (storedAccessories) {
        accessoriesData = JSON.parse(storedAccessories) as ProductType[];
      }

      selectedProducts = [
        ...phonesData.slice(0, 2),
        ...tabletsData.slice(0, 3),
        ...accessoriesData.slice(0, 3),
      ];
      setShuffledProducts(shuffleArray(selectedProducts));
    }, 500);

    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const showNextImage = () => {
    setImageIndex(index => {
      if (index === 4) {
        return 0;
      }

      return index + 1;
    });
  };

  const showPrevImage = () => {
    setImageIndex(index => {
      if (index === 0) {
        return shuffledProducts.length - 1;
      }

      return index - 1;
    });
  };

  return (
    <section className="phone container">
      <div className="phone__top">
        <h1 className="phone__title">{title}</h1>
        <div className="phone__slide">
          <div
            className={classNames('phone__slide--left', {
              'phone__disabled': translateX === 0,
            })}
            onClick={showPrevImage}
          >
            <img
              src={`img/slider/svg/chevron (arrow left)${theme === 'dark' ? ' dark' : ''}.svg`}
              alt="left"
            />
          </div>
          <div className="phone__slide--right" onClick={showNextImage}>
            <img
              src={`img/slider/svg/chevron (arrow right)${theme === 'dark' ? ' dark' : ''}.svg`}
              alt="right"
            />
          </div>
        </div>
      </div>

      <div className="phone__viewport">
        <div
          className="phone__grid"
          style={{ transform: `translateX(-${translateX}%)` }}
        >
          {shuffledProducts.map(product => (
            <PhoneCard key={product.id} product={product} isHot={true} />
          ))}
        </div>
      </div>
    </section>
  );
};
