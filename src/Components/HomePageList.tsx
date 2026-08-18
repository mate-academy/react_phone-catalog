import '../styles/HomePageList.scss';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export interface NewModel {
  id: number;
  category: string;
  itemId: string;
  name: string;
  fullPrice: number;
  price: number;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  year: number;
  image: string;
  selectedCapacity?: string;
  selectedColor?: string;
}

const CARD_WIDTH = 272;
const CARD_GAP = 20;
const STEP = CARD_WIDTH + CARD_GAP;

interface Props {
  cart: NewModel[];
  addingObjCart: (product: NewModel) => void;
  array?: NewModel[];
  setsmth?: (product: NewModel) => void;
  FavouritesA?: NewModel[];
  addingObj?: (product: NewModel) => void;
}

export const HomePageList: React.FC<Props> = ({
  cart,
  addingObjCart,
  array = [],
  setsmth,
  FavouritesA = [],
  addingObj,
}) => {
  const [chusloNew, setChusloNew] = useState(0);
  const [chusloHot, setChusloHot] = useState(0);

  const sortedToNewArray = [...array].sort((a, b) => b.year - a.year);
  const sortedToHotArray = [...array].sort(
    (a, b) => b.fullPrice - b.price - (a.fullPrice - a.price),
  );

  const phonesCount = sortedToNewArray.filter(
    item => item.category === 'phones',
  ).length;
  const tabletsCount = sortedToNewArray.filter(
    item => item.category === 'tablets',
  ).length;
  const accessoriesCount = sortedToNewArray.filter(
    item => item.category === 'accessories',
  ).length;

  const handlePrevNew = () => setChusloNew(prev => Math.max(0, prev - 4));
  const handleNextNew = () => {
    if (chusloNew + 4 < sortedToNewArray.length) {
      setChusloNew(prev => prev + 4);
    }
  };

  const handlePrevHot = () => setChusloHot(prev => Math.max(0, prev - 4));
  const handleNextHot = () => {
    if (chusloHot + 4 < sortedToHotArray.length) {
      setChusloHot(prev => prev + 4);
    }
  };

  const handleProductClick = (product: NewModel) => {
    if (setsmth) {
      setsmth(product);
    }
  };

  return (
    /* eslint-disable */
    <div className="Brand__new__Phone__List">
      <div className="Head__List">
        <h2 className="Brand__new__title">Brand new models</h2>
        <div className="Button__List">
          <button
            type="button"
            className="Button__List__item Button__List__item--prev"
            disabled={chusloNew === 0}
            onClick={handlePrevNew}
            aria-label="Previous page"
          ></button>
          <button
            type="button"
            className="Button__List__item Button__List__item--next"
            disabled={chusloNew + 4 >= sortedToNewArray.length}
            onClick={handleNextNew}
            aria-label="Next page"
          ></button>
        </div>
      </div>

      <div className="Brand__new__Slider__Wrapper">
        <div
          className="Brand__new__List"
          style={{ transform: `translateX(-${chusloNew * STEP}px)` }}
        >
          {sortedToNewArray.map(obj => {
            const isFavorite = FavouritesA.some(
              cobj => cobj.itemId === obj.itemId,
            );
            const isChosen = cart?.some(cobj => cobj.itemId === obj.itemId);

            return (
              <div className="Brand__new__phone" key={obj.id}>
                <Link
                  to={`/${obj.category}/${obj.itemId}`}
                  onClick={() => {
                    handleProductClick(obj);
                    window.scrollTo({
                      top: 0,
                      behavior: 'smooth',
                    });
                  }}
                  style={{ textDecoration: 'none' }}
                >
                  <img
                    className="Brand__new__phone__image"
                    src={obj.image}
                    alt={obj.itemId}
                  />

                  <p className="Brand__new__phone__title">{obj.name}</p>
                </Link>

                <div className="Price">
                  <span className="this__Price">${obj.price}</span>
                </div>

                <div className="phone__Line"></div>
                <ul className="charasteristics">
                  <li className="each">
                    <span className="part__of__List">Screen</span>
                    <span className="part__of__char">{obj.screen}</span>
                  </li>
                  <li className="each">
                    <span className="part__of__List">Capacity</span>
                    <span className="part__of__char">{obj.capacity}</span>
                  </li>
                  <li className="each">
                    <span className="part__of__List">RAM</span>
                    <span className="part__of__char">{obj.ram}</span>
                  </li>
                </ul>
                <div className="contract__buttons">
                  <button
                    type="button"
                    className={isChosen ? 'Added2__to__Cart' : 'Add__to__cart'}
                    onClick={e => {
                      e.stopPropagation();
                      addingObjCart(obj);
                    }}
                  >
                    {isChosen ? 'Added to cart' : 'Add to cart'}
                  </button>
                  <button
                    type="button"
                    className="heart"
                    aria-label="Add to favorites"
                    onClick={e => {
                      e.stopPropagation();
                      addingObj?.(obj);
                    }}
                  >
                    {isFavorite ? (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="#EB5757"
                      >
                        <path
                          /* eslint-disable-next-line */
                          d="M8 13.5L2.5 8C1 6.5 1 4 2.5 2.5C4 1 6.5 1 8 3C9.5 1 12 1 13.5 2.5C15 4 15 6.5 13.5 8L8 13.5Z"
                          stroke="#EB5757"
                          strokeWidth="1.5"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          /* eslint-disable-next-line */
                          d="M8 13.5L2.5 8C1 6.5 1 4 2.5 2.5C4 1 6.5 1 8 3C9.5 1 12 1 13.5 2.5C15 4 15 6.5 13.5 8L8 13.5Z"
                          stroke="#313237"
                          strokeWidth="1.5"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="Shop__by__Category">
        <h2 className="Shop__title">Shop by category</h2>
        <section className="ShopByCategory">
          <div className="ShopByCategory__cards">
            <Link to="/phones" className="ShopByCategory__card">
              <div className="ShopByCategory__image-wrapper ShopByCategory__image-wrapper--phones">
                <img
                  src={'img/category-phones.png'}
                  alt="Mobile phones"
                  className="ShopByCategory__image"
                />
              </div>
              <h3 className="ShopByCategory__card-title">Mobile phones</h3>
              <p className="ShopByCategory__card-subtitle">
                {phonesCount || 95} models
              </p>
            </Link>
            <Link to="/tablets" className="ShopByCategory__card">
              <div className="ShopByCategory__image-wrapper ShopByCategory__image-wrapper--tablets">
                <img
                  src={'img/category-tablets.png'}
                  alt="Tablets"
                  className="ShopByCategory__image"
                />
              </div>
              <h3 className="ShopByCategory__card-title">Tablets</h3>
              <p className="ShopByCategory__card-subtitle">
                {tabletsCount || 24} models
              </p>
            </Link>
            <Link to="/accessories" className="ShopByCategory__card">
              <div className="ShopByCategory__image-wrapper ShopByCategory__image-wrapper--accessories">
                <img
                  src={'img/category-accessories.png'}
                  alt="Accessories"
                  className="ShopByCategory__image--added"
                />
              </div>
              <h3 className="ShopByCategory__card-title">Accessories</h3>
              <p className="ShopByCategory__card-subtitle">
                {accessoriesCount || 100} models
              </p>
            </Link>
          </div>
        </section>
      </div>

      <div className="Head__List">
        <h2 className="Brand__new__title">Hot prices</h2>
        <div className="Button__List">
          <button
            type="button"
            className="Button__List__item Button__List__item--prev"
            disabled={chusloHot === 0}
            onClick={handlePrevHot}
            aria-label="Previous page"
          ></button>
          <button
            type="button"
            className="Button__List__item Button__List__item--next"
            disabled={chusloHot + 4 >= sortedToHotArray.length}
            onClick={handleNextHot}
            aria-label="Next page"
          ></button>
        </div>
      </div>

      <div className="Brand__new__Slider__Wrapper">
        <div
          className="Brand__new__List"
          style={{ transform: `translateX(-${chusloHot * STEP}px)` }}
        >
          {sortedToHotArray.map(obj => {
            const isFavorite = FavouritesA.some(cobj => cobj.id === obj.id);
            const isChosen = cart?.some(cobj => cobj.id === obj.id);

            return (
              <div className="Brand__new__phone" key={obj.id}>
                <Link
                  to={`/${obj.category}/${obj.itemId}`}
                  onClick={() => {
                    handleProductClick(obj);
                    window.scrollTo({
                      top: 0,
                      behavior: 'smooth',
                    });
                  }}
                  style={{ textDecoration: 'none' }}
                >
                  <img
                    className="Brand__new__phone__image"
                    src={obj.image}
                    alt={obj.itemId}
                  />

                  <p className="Brand__new__phone__title">{obj.name}</p>
                </Link>

                <div className="Price">
                  <span className="this__Price">${obj.price}</span>
                  <span className="Price__without__Discount">
                    ${obj.fullPrice}
                  </span>
                </div>

                <div className="phone__Line"></div>
                <ul className="charasteristics">
                  <li className="each">
                    <span className="part__of__List">Screen</span>
                    <span className="part__of__char">{obj.screen}</span>
                  </li>
                  <li className="each">
                    <span className="part__of__List">Capacity</span>
                    <span className="part__of__char">{obj.capacity}</span>
                  </li>
                  <li className="each">
                    <span className="part__of__List">RAM</span>
                    <span className="part__of__char">{obj.ram}</span>
                  </li>
                </ul>
                <div className="contract__buttons">
                  <button
                    type="button"
                    className={isChosen ? 'Added2__to__Cart' : 'Add__to__cart'}
                    onClick={e => {
                      e.stopPropagation();
                      addingObjCart(obj);
                    }}
                  >
                    {isChosen ? 'Added to cart' : 'Add to cart'}
                  </button>
                  <button
                    type="button"
                    className="heart"
                    aria-label="Add to favorites"
                    onClick={e => {
                      e.stopPropagation();
                      addingObj?.(obj);
                    }}
                  >
                    {isFavorite ? (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="#EB5757"
                      >
                        <path
                          /* eslint-disable-next-line */
                          d="M8 13.5L2.5 8C1 6.5 1 4 2.5 2.5C4 1 6.5 1 8 3C9.5 1 12 1 13.5 2.5C15 4 15 6.5 13.5 8L8 13.5Z"
                          stroke="#EB5757"
                          strokeWidth="1.5"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          /* eslint-disable-next-line */
                          d="M8 13.5L2.5 8C1 6.5 1 4 2.5 2.5C4 1 6.5 1 8 3C9.5 1 12 1 13.5 2.5C15 4 15 6.5 13.5 8L8 13.5Z"
                          stroke="#313237"
                          strokeWidth="1.5"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
