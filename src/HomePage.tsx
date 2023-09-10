/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { ShopCard } from './ShopCard';
import { getHotPrice, getNewIphones } from './api/iphones';
import { Iphone } from './types/Iphone';
import { TopSlider } from './Slider';
import { Loader } from './Loader';

type Props = {
  selectPhone: (iphoneId: string) => void,
  selectedIphoneId: string | null,
  selectPhoneToBuy: (iphoneId: string) => void,
  selectedIphoneIdToBuy: string | null,
};

export const HomePage: React.FC<Props> = ({
  selectPhone,
  selectedIphoneId,
  selectPhoneToBuy,
  selectedIphoneIdToBuy,
}) => {
  const [newIphones, setNewIphones] = useState<Iphone[]>([]);
  const [hotPricedIphones, setHotPricedIphones] = useState<Iphone[]>([]);
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getNewIphones().then((items) => setNewIphones(items));
  }, []);

  useEffect(() => {
    getHotPrice().then((items) => setHotPricedIphones(items));
  }, []);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const newIphonesToShow = newIphones.slice(startIndex, endIndex);
  const hotPricedIphonesToShow = hotPricedIphones.slice(startIndex, endIndex);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div className="block">

      <TopSlider />

      <section className="page page__body page__section shop">
        <div className="page__section-container">
          <h1 className="page__title">Hot prices</h1>
          <div className="button__container button__container--home-page">
            <button
              type="button"
              onClick={prevPage}
              disabled={currentPage === 1}
              className="button button--pagination"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M10.4715 3.52861C10.2111 3.26826 9.78903 3.26826 9.52868 3.52861L5.52868 7.52861C5.26833 7.78896 5.26833 8.21107 5.52868 8.47141L9.52868 12.4714C9.78903 12.7318 10.2111 12.7318 10.4715 12.4714C10.7318 12.2111 10.7318 11.789 10.4715 11.5286L6.94289 8.00001L10.4715 4.47141C10.7318 4.21107 10.7318 3.78896 10.4715 3.52861Z" fill="#B4BDC4" />
              </svg>

            </button>
            <button
              type="button"
              onClick={nextPage}
              disabled={endIndex >= newIphones.length}
              className="button button--pagination"
            >
              <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M0.528636 0.528606C0.788986 0.268256 1.2111 0.268256 1.47145 0.528606L5.47145 4.52861C5.73179 4.78896 5.73179 5.21107 5.47145 5.47141L1.47145 9.47141C1.2111 9.73176 0.788986 9.73176 0.528636 9.47141C0.268287 9.21107 0.268287 8.78896 0.528636 8.52861L4.05723 5.00001L0.528636 1.47141C0.268287 1.21107 0.268287 0.788955 0.528636 0.528606Z" fill="#B4BDC4" />
              </svg>

            </button>

          </div>

        </div>

        <div className="shop__catalog grid grid--tablet grid--desktop">
          {hotPricedIphonesToShow.length > 0 ? (
            hotPricedIphonesToShow.map((iphone, index) => {
              const classNumberMobile = index % 2; // Определяем номер класса (0, 1 или 2)
              const classNumberTablet = index % 3; // Определяем номер класса (0, 1 или 2)
              const classNumberDesktop = index % 4; // Определяем номер класса (0, 1 или 2)

              return (
                <div
                  className={classNames('grid__item', {
                    'grid__item--mobile--1-2': classNumberMobile === 0,
                    'grid__item--mobile--3-4': classNumberMobile === 1,

                    'grid__item--tablet--1-2': classNumberTablet === 0,
                    'grid__item--tablet--3-4': classNumberTablet === 1,
                    'grid__item--tablet--5-6': classNumberTablet !== 1 && classNumberTablet !== 0,

                    'grid__item--desktop--1-6': classNumberDesktop === 0,
                    'grid__item--desktop--7-12': classNumberDesktop === 1,
                    'grid__item--desktop--13-18': classNumberDesktop === 2,
                    'grid__item--desktop--19-24': classNumberDesktop === 3,

                  })}
                >
                  <ShopCard
                    iphone={iphone}
                    selectPhone={selectPhone}
                    selectedIphoneId={selectedIphoneId}
                    selectPhoneToBuy={selectPhoneToBuy}
                    selectedIphoneIdToBuy={selectedIphoneIdToBuy}
                  />

                </div>
              );
            })

          ) : (
            <Loader />
          )}
        </div>
      </section>

      <section className="page page__body page__section category">
        <h1 className="page__title">Shop by category</h1>
        <div className="category__catalog">
          <div className="category__card">
            <div className="category__card--phones" />
            <div className="category__card__img category__card__img--phones" />
            <NavLink
              to="/phones"
              className="category__card__link-container"
            >
              <p className="category__card__link--main">Phones</p>
              <p className="category__card__link--secondary"> 95 models </p>
            </NavLink>

          </div>

          <div className="category__card">
            <div className="category__card--tablets" />
            <div className="category__card__img category__card__img--tablets" />
            <NavLink
              to="/tablets"
              className="category__card__link-container"
            >
              <p className="category__card__link--main">Tablets</p>
              <p className="category__card__link--secondary"> 85 models </p>
            </NavLink>
          </div>

          <div className="category__card">
            <div className="category__card--accessories" />
            <div className="category__card__img category__card__img--accessories" />
            <NavLink
              to="/tablets"
              className="category__card__link-container"
            >
              <p className="category__card__link--main">Accessories</p>
              <p className="category__card__link--secondary"> 60 models </p>
            </NavLink>
          </div>

        </div>
      </section>
      <section className="page page__body page__section new-models">
        <div className="page__section-container">
          <h1 className="page__title">
            Brand new models
          </h1>
          <div className="button__container button__container--home-page">
            <button
              type="button"
              onClick={prevPage}
              disabled={currentPage === 1}
              className="button button--pagination"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M10.4715 3.52861C10.2111 3.26826 9.78903 3.26826 9.52868 3.52861L5.52868 7.52861C5.26833 7.78896 5.26833 8.21107 5.52868 8.47141L9.52868 12.4714C9.78903 12.7318 10.2111 12.7318 10.4715 12.4714C10.7318 12.2111 10.7318 11.789 10.4715 11.5286L6.94289 8.00001L10.4715 4.47141C10.7318 4.21107 10.7318 3.78896 10.4715 3.52861Z" fill="#B4BDC4" />
              </svg>

            </button>
            <button
              type="button"
              onClick={nextPage}
              disabled={endIndex >= newIphones.length}
              className="button button--pagination"
            >
              <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M0.528636 0.528606C0.788986 0.268256 1.2111 0.268256 1.47145 0.528606L5.47145 4.52861C5.73179 4.78896 5.73179 5.21107 5.47145 5.47141L1.47145 9.47141C1.2111 9.73176 0.788986 9.73176 0.528636 9.47141C0.268287 9.21107 0.268287 8.78896 0.528636 8.52861L4.05723 5.00001L0.528636 1.47141C0.268287 1.21107 0.268287 0.788955 0.528636 0.528606Z" fill="#B4BDC4" />
              </svg>

            </button>

          </div>

        </div>

        <div className="shop__catalog grid grid--tablet grid--desktop">
          {newIphonesToShow.length > 0 ? (
            newIphonesToShow.map((iphone: Iphone, index: number) => {
              const classNumberMobile = index % 2;
              const classNumberTablet = index % 3;
              const classNumberDesktop = index % 4;

              return (
                <div
                  className={classNames('grid__item', {
                    'grid__item--mobile--1-3': classNumberMobile === 0,
                    'grid__item--mobile--4-6': classNumberMobile === 1,

                    'grid__item--tablet--1-2': classNumberTablet === 0,
                    'grid__item--tablet--3-4': classNumberTablet === 1,
                    'grid__item--tablet--5-6': classNumberTablet !== 1 && classNumberTablet !== 0,

                    'grid__item--desktop--1-6': classNumberDesktop === 0,
                    'grid__item--desktop--7-12': classNumberDesktop === 1,
                    'grid__item--desktop--13-18': classNumberDesktop === 2,
                    'grid__item--desktop--19-24': classNumberDesktop === 3,
                  })}
                >
                  <ShopCard
                    key={iphone.id}
                    iphone={iphone}
                    selectPhone={selectPhone}
                    selectedIphoneId={selectedIphoneId}
                    selectPhoneToBuy={selectPhoneToBuy}
                    selectedIphoneIdToBuy={selectedIphoneIdToBuy}
                  />

                </div>

              );
            })
          ) : (
            <Loader />
          )}
        </div>
      </section>

    </div>

  );
};
