/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable object-curly-newline */
/* eslint-disable operator-linebreak */
/* eslint-disable max-len */
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { MainContext } from '../../context/MainContext';
import { ProductDetails as Details } from '../../types/ProductDetails';
import { CartItem } from '../../types/CartItem';
import { BackButton } from '../BackButton';

interface Props {
  item: Details | null;
}

export const ProductDetails: React.FC<Props> = ({ item }) => {
  const {
    phones,
    favouritesItems,
    setFavouritesItems,
    cartItems,
    setCartItems,
  } = useContext(MainContext);
  const [activeImg, setActiveImg] = useState('');

  useEffect(() => {
    if (item) {
      setActiveImg(item.images[0]);
    }
  }, [item]);

  const isLikeActive = useMemo(() => {
    return (
      item &&
      favouritesItems.some(
        (favouritesItem) => favouritesItem.itemId === item.id
      )
    );
  }, [item, favouritesItems]);

  const addToFavourites = useCallback(
    (id: string | null) => {
      if (id) {
        const selectedProduct = phones.filter(({ itemId }) => {
          return itemId === id;
        })[0];

        setFavouritesItems((prevState) => {
          if (!isLikeActive) {
            return [...prevState, selectedProduct];
          }

          return prevState.filter(
            (prevItem) => prevItem.id !== selectedProduct.id
          );
        });
      }
    },
    [isLikeActive]
  );

  const isBtnActive = useMemo(() => {
    return (
      item && cartItems.some((cartItem) => cartItem.product.itemId === item.id)
    );
  }, [item, cartItems]);

  const addToCard = useCallback(
    (id: string | null) => {
      if (id) {
        const selectedProduct = phones.filter(({ itemId }) => {
          return itemId === id;
        })[0];

        const cartItem: CartItem = {
          id: selectedProduct.id,
          quantity: 1,
          product: selectedProduct,
        };

        setCartItems((prevState) => {
          if (!isBtnActive) {
            return [...prevState, cartItem];
          }

          return prevState.filter((prevItem) => prevItem.id !== cartItem.id);
        });
      }
    },
    [isBtnActive]
  );

  const getColor = (color: string) => {
    switch (color) {
      case 'black':
        return '#313237';
      case 'purple':
        return '#d2cddb';
      case 'green':
        return '#aee2cc';
      case 'spacegray':
        return '#4c4c4c';
      case 'midnightgreen':
        return '#5f7170';
      case 'red':
        return '#c31934';
      case 'coral':
      case 'rosegold':
        return '#f9604c';
      case 'gold':
      case 'yellow':
        return '#fcdbc1';
      default:
        return '#f0f0f0';
    }
  };

  return (
    <section className="section product-details">
      <div className="section__container">
        <div className="product-details__block">
          <BackButton />
          <h1 className="h1 product-details__title">{item?.name}</h1>

          <div className="product-details__wrapper">
            <div className="product-details__items">
              {item?.images.map((image) => (
                <div
                  className={cn('product-details__item', {
                    'product-details__item--active': image === activeImg,
                  })}
                  onMouseDown={() => setActiveImg(image)}
                  key={image}
                >
                  <picture>
                    <img src={image} alt={image} loading="lazy" />
                  </picture>
                </div>
              ))}
            </div>

            <div className="product-details__imgs">
              <picture>
                <img
                  className="product-details__img"
                  src={activeImg}
                  alt={item?.name}
                  loading="lazy"
                />
              </picture>
            </div>

            <div className="product-details__info">
              <div className="product-details__subwrapper">
                <div className="product-details__label">Available colors</div>

                <div className="product-details__colors">
                  {item?.colorsAvailable.map((color) => {
                    const backgroundColor = getColor(color);

                    return (
                      <Link
                        to={`/phones/${
                          item.namespaceId
                        }-${item.capacity.toLowerCase()}-${color}`}
                        className={cn('product-details__color', {
                          'product-details__color--active':
                            color === item.color,
                        })}
                        key={color}
                      >
                        <span style={{ backgroundColor }} />
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="product-details__subwrapper">
                <div className="product-details__label">Select capacity</div>

                <div className="product-details__capacities">
                  {item?.capacityAvailable.map((capacity) => (
                    <Link
                      to={`/phones/${
                        item.namespaceId
                      }-${capacity.toLowerCase()}-${item.color}`}
                      className={cn('product-details__capacity', {
                        'product-details__capacity--active':
                          capacity === item.capacity,
                      })}
                      key={capacity}
                    >
                      {capacity}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="product-details__prices">
                <div className="h1 product-details__price">
                  {item?.priceDiscount}
                </div>
                <div className="product-details__price product-details__price--old">
                  {item?.priceRegular}
                </div>
              </div>

              <div className="product-details__btns">
                <button
                  type="button"
                  className={cn('btn', { 'btn--active': isBtnActive })}
                  onClick={() => addToCard(item && item.id)}
                >
                  {isBtnActive ? 'Added to cart' : 'Add to cart'}
                </button>
                <button
                  data-cy="addToFavorite"
                  type="button"
                  className={cn('like-btn', {
                    'like-btn--active': isLikeActive,
                  })}
                  onClick={() => addToFavourites(item && item.id)}
                >
                  <img
                    className="like-btn__icon"
                    src={`./img/${isLikeActive ? 'like_active' : 'like'}.svg`}
                    alt="like-btn"
                    loading="lazy"
                  />
                </button>
              </div>

              <div className="product-details__cont">
                <div className="product-details__line">
                  <div className="product-details__label">Screen</div>
                  <div className="product-details__value">{item?.screen}</div>
                </div>
                <div className="product-details__line">
                  <div className="product-details__label">Resolution</div>
                  <div className="product-details__value">
                    {item?.resolution}
                  </div>
                </div>
                <div className="product-details__line">
                  <div className="product-details__label">Processor</div>
                  <div className="product-details__value">
                    {item?.processor}
                  </div>
                </div>
                <div className="product-details__line">
                  <div className="product-details__label">RAM</div>
                  <div className="product-details__value">{item?.ram}</div>
                </div>
              </div>
            </div>

            <div className="product-details__id">ID: 802390</div>
          </div>

          <div className="product-details__content">
            <div className="product-details__about">
              <h2 className="h2 product-details__subtitle">About</h2>

              <div
                className="product-details__descriptions"
                data-cy="productDescription"
              >
                {item?.description.map((description) => (
                  <div
                    className="product-details__description text"
                    key={description.title}
                  >
                    <h3>{description.title}</h3>
                    <p>{description.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="product-details__specs">
              <h2 className="h2 product-details__subtitle">Tech specs</h2>

              <div className="product-details__cont">
                <div className="product-details__line">
                  <div className="product-details__label">Screen</div>
                  <div className="product-details__value">{item?.screen}</div>
                </div>
                <div className="product-details__line">
                  <div className="product-details__label">Resolution</div>
                  <div className="product-details__value">
                    {item?.resolution}
                  </div>
                </div>
                <div className="product-details__line">
                  <div className="product-details__label">Processor</div>
                  <div className="product-details__value">
                    {item?.processor}
                  </div>
                </div>
                <div className="product-details__line">
                  <div className="product-details__label">RAM</div>
                  <div className="product-details__value">{item?.ram}</div>
                </div>
                <div className="product-details__line">
                  <div className="product-details__label">Camera</div>
                  <div className="product-details__value">{item?.camera}</div>
                </div>
                <div className="product-details__line">
                  <div className="product-details__label">Zoom</div>
                  <div className="product-details__value">{item?.zoom}</div>
                </div>
                <div className="product-details__line">
                  <div className="product-details__label">Cell</div>
                  <div className="product-details__value">
                    {item?.cell.map((cellItem, index) => (
                      <span key={cellItem}>
                        {index === item?.cell.length - 1
                          ? cellItem
                          : `${cellItem}, `}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
