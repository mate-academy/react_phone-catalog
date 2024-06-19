import React, { useEffect, useState } from 'react';
import { PhoneCard } from '../PhoneCard/PhoneCard';
import './Phone.scss';
import classNames from 'classnames';
import { ProductType } from '../../../../types/ProductType';
import { Grid } from 'react-loader-spinner';

export const Phone: React.FC = () => {
  const [phones, setPhones] = useState<ProductType[]>([]);
  const [imageIndex, setImageIndex] = useState(0);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [isLoading, setIsLoading] = useState(true);

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
    setIsLoading(true);
    setTimeout(() => {
      const storedPhones = localStorage.getItem('phones');

      if (storedPhones) {
        const parsedPhones = JSON.parse(storedPhones) as ProductType[];

        setPhones(parsedPhones);
      }

      setIsLoading(false);
    }, 1000);

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
        return phones.length - 1;
      }

      return index - 1;
    });
  };

  return (
    <section className="phone container">
      {isLoading ? (
        <div className="loader">
          <Grid
            visible={true}
            height="50"
            width="50"
            color="#000"
            ariaLabel="grid-loading"
            radius="12.5"
            wrapperStyle={{}}
            wrapperClass="grid-wrapper"
          />
        </div>
      ) : (
        <>
          <div className="phone__top">
            <h1 className="phone__title">Brand new models</h1>
            <div className="phone__slide">
              <div
                className={classNames('phone__slide--left', {
                  'phone__disabled': translateX === 0,
                })}
                onClick={showPrevImage}
              >
                <img
                  src="../../../img/slider/svg/chevron (arrow left).svg"
                  alt="left"
                />
              </div>
              <div className="phone__slide--right" onClick={showNextImage}>
                <img
                  src="../../../img/slider/svg/chevron (arrow right).svg"
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
              {phones.map(phone => (
                <PhoneCard key={phone.id} product={phone} />
              ))}
            </div>
          </div>
        </>
      )}
    </section>
  );
};
