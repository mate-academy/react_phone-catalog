/* eslint-disable max-len */
import classNames from 'classnames';
import { ShopCard } from './ShopCard';
import { NotFoundItems } from './NotFound';
import { useAppSelector } from './utils/hooks';

export const Favorites = () => {
  const listOfFavorites = useAppSelector(state => state.favorite.list);

  return (
    listOfFavorites.length > 0
      ? (
        <div className="block">
          <div className="filter__nav">
            <div className="filter__nav--1-item">
              <a
                href="#home"
                className="filter__nav-link"
              >
                <svg
                  className="filter__nav-link--home"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path fillRule="evenodd" clipRule="evenodd" d="M7.59075 0.807088C7.83149 0.619846 8.16859 0.619846 8.40933 0.807088L14.4093 5.47375C14.5717 5.60006 14.6667 5.79426 14.6667 5.99999V13.3333C14.6667 13.8638 14.456 14.3725 14.0809 14.7475C13.7058 15.1226 13.1971 15.3333 12.6667 15.3333H3.33337C2.80294 15.3333 2.29423 15.1226 1.91916 14.7475C1.54409 14.3725 1.33337 13.8638 1.33337 13.3333V5.99999C1.33337 5.79426 1.42836 5.60006 1.59075 5.47375L7.59075 0.807088ZM2.66671 6.32605V13.3333C2.66671 13.5101 2.73695 13.6797 2.86197 13.8047C2.98699 13.9298 3.15656 14 3.33337 14H12.6667C12.8435 14 13.0131 13.9298 13.1381 13.8047C13.2631 13.6797 13.3334 13.5101 13.3334 13.3333V6.32605L8.00004 2.1779L2.66671 6.32605Z" fill="#313237" />
                  <path fillRule="evenodd" clipRule="evenodd" d="M5.33337 8.00001C5.33337 7.63182 5.63185 7.33334 6.00004 7.33334H10C10.3682 7.33334 10.6667 7.63182 10.6667 8.00001V14.6667C10.6667 15.0349 10.3682 15.3333 10 15.3333C9.63185 15.3333 9.33337 15.0349 9.33337 14.6667V8.66668H6.66671V14.6667C6.66671 15.0349 6.36823 15.3333 6.00004 15.3333C5.63185 15.3333 5.33337 15.0349 5.33337 14.6667V8.00001Z" fill="#313237" />
                </svg>
              </a>
              <svg
                className="filter__nav-link--arrow-right"
                width="6"
                height="10"
                viewBox="0 0 6 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fillRule="evenodd" clipRule="evenodd" d="M0.528636 0.528606C0.788986 0.268256 1.2111 0.268256 1.47145 0.528606L5.47145 4.52861C5.73179 4.78896 5.73179 5.21107 5.47145 5.47141L1.47145 9.47141C1.2111 9.73176 0.788986 9.73176 0.528636 9.47141C0.268287 9.21107 0.268287 8.78896 0.528636 8.52861L4.05723 5.00001L0.528636 1.47141C0.268287 1.21107 0.268287 0.788955 0.528636 0.528606Z" fill="#B4BDC4" />
              </svg>

              <a
                href="#phones"
                className="filter__nav-link"
              >
                Phones
              </a>
              <svg
                className="filter__nav-icons"
                width="6"
                height="10"
                viewBox="0 0 6 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fillRule="evenodd" clipRule="evenodd" d="M0.528636 0.528606C0.788986 0.268256 1.2111 0.268256 1.47145 0.528606L5.47145 4.52861C5.73179 4.78896 5.73179 5.21107 5.47145 5.47141L1.47145 9.47141C1.2111 9.73176 0.788986 9.73176 0.528636 9.47141C0.268287 9.21107 0.268287 8.78896 0.528636 8.52861L4.05723 5.00001L0.528636 1.47141C0.268287 1.21107 0.268287 0.788955 0.528636 0.528606Z" fill="#B4BDC4" />
              </svg>

              <a
                href="#phones"
                className="filter__nav-link"
              >
                Favorites
              </a>

            </div>
            <div className="filter__nav--2-item">
              <h1 className="page__title">
                Favorites
              </h1>
              <a
                href="#all"
                className="page__link"
              >
                {listOfFavorites.length}
                {' '}
                items

              </a>

            </div>
          </div>

          <div className="shop__catalog shop__catalog--favorites grid grid--tablet grid--desktop">

            {listOfFavorites.map((iphone, index) => {
              const classNumberMobile = index % 2;
              const classNumberTablet = index % 3;
              const classNumberTabletSmall = index % 2;

              const classNumberDesktop = index % 4;

              return (
                <div className={classNames('grid__item', {
                  'grid__item--mobile--1-2': classNumberMobile === 0,
                  'grid__item--mobile--3-4': classNumberMobile === 1,

                  'grid__item--tabletSmall--1-2': classNumberTabletSmall === 0,
                  'grid__item--tabletSmall--3-4': classNumberTabletSmall === 1,

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
                  />

                </div>
              );
            })}

          </div>
        </div>
      )

      : <NotFoundItems text="Favorites are" />

  );
};
