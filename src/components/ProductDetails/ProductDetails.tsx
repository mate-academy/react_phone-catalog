/* eslint-disable jsx-a11y/control-has-associated-label */
import {
  useCallback, useContext, useEffect, useMemo, useState,
} from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { ProductDetails as Details } from '../../types/ProductDetails';
import './product-details.scss';
import { ProductDetail } from '../ProductDetail/ProductDetail';
import { MainContext } from '../../context';
import { CartItem } from '../../types/CartItem';
// import { ProductCardActions } from '../ProductCardActions';

type Props = {
  productDetails: Details | null,
};

export const ProductDetails: React.FC<Props> = ({ productDetails }) => {
  const {
    products,
    cartItems,
    favouritesItems,
    setCartItems,
    setFavouritesItems,
  } = useContext(MainContext);
  const [activeImg, setActiveImg] = useState('');

  useEffect(() => {
    if (productDetails) {
      setActiveImg(productDetails.images[0]);
    }
  }, [productDetails]);

  const isAddToCartBtnActive = useMemo(() => {
    return (productDetails && cartItems.some(
      cartItem => cartItem.product.itemId === productDetails.id,
    ));
  }, [productDetails, cartItems]);

  const isAddToFavBtnActive = useMemo(() => {
    return (productDetails && favouritesItems.some(
      item => item.itemId === productDetails.id,
    ));
  }, [productDetails, favouritesItems]);

  const addToFavourites = useCallback(
    (id: string | null) => {
      if (id) {
        const selectedProduct = products.filter(({ itemId }) => {
          return itemId === id;
        })[0];

        setFavouritesItems((prevState) => {
          if (!isAddToFavBtnActive) {
            return [...prevState, selectedProduct];
          }

          return prevState.filter(
            (prevItem) => prevItem.id !== selectedProduct.id,
          );
        });
      }
    },
    [isAddToFavBtnActive],
  );

  const addToCart = useCallback(
    (id: string | null) => {
      if (id) {
        const selectedProduct = products.filter(({ itemId }) => {
          return itemId === id;
        })[0];

        const cartItem: CartItem = {
          id: +selectedProduct.id,
          qnty: 1,
          product: selectedProduct,
        };

        if (isAddToCartBtnActive) {
          return;
        }

        setCartItems((prev) => [...prev, cartItem]);
      }
    },
    [isAddToCartBtnActive],
  );

  const getColor = (color: string) => {
    switch (color) {
      case 'black':
        return '#000';
      case 'spacegray':
        return '#808080';
      case 'gold':
        return '#ffefd5';
      case 'midnightgreen':
        return '#008080';
      case 'silver':
        return '#c0c0c0';
      case 'yellow':
        return '#ffff00';
      case 'green':
        return '#66cdaa';
      case 'red':
        return '#ff0000';
      case 'white':
        return '#fff';
      case 'gray':
        return '#d3d3d3';
      case 'purple':
        return '#e6e6fa';
      case 'rosegold':
        return '#ffdab9';
      case 'coral':
        return '#f08080';
      default:
        return 0;
    }
  };

  return (
    <>
      <h1 className="product__title">
        {productDetails?.name}
      </h1>
      <section className="product__section grid">
        <div className="images__selector grid__item--fullScreen-1-12">
          <div className="images__list">
            {productDetails?.images.map((image) => (
              <div
                className={
                  classNames(
                    'image__list-item', { selected: image === activeImg },
                  )
                }
                role="button"
                tabIndex={0}
                onMouseDown={() => setActiveImg(image)}
                key={image}
              >

                <img
                  src={image}
                  alt={productDetails?.name}
                />
              </div>
            ))}
          </div>
          <div className="selected__image">
            <img
              src={`./${activeImg}`}
              alt={productDetails?.name}
              className="product-details__selected-image"
            />
          </div>
        </div>
        <div className="product-detail__actions grid__item--fullScreen-14-20">
          <div className="colors__selector">
            <p className="detail-selector__title">Available colors</p>
            <ul className="colors__list">
              {productDetails?.colorsAvailable.map(color => (
                <li
                  className={
                    classNames(
                      'colors__item',
                      { selected: color === productDetails.color },
                    )
                  }
                  key={color}
                >
                  <Link
                    to={`/phones/${productDetails.namespaceId}-${productDetails.capacity.toLowerCase()}-${color}`}
                    className="color__handler-link"
                    style={{ background: `${getColor(color)}` }}
                  />
                </li>
              ))}
            </ul>
          </div>
          <div className="capacity__selector">
            <p className="detail-selector__title">Select capacity</p>
            <ul className="capacity__list">
              {productDetails?.capacityAvailable.map(capacity => (
                <li className="capacity__item" key={capacity}>
                  <Link
                    to={`/phones/${productDetails.namespaceId}-${capacity.toLowerCase()}-${productDetails.color}`}
                    className={
                      classNames(
                        'capacity__handler-link',
                        { selected: capacity === productDetails.capacity },
                      )
                    }
                  >
                    {capacity.replace('GB', ' GB')}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="prices">
            <p className="new-price">{`$${productDetails?.priceDiscount}`}</p>
            <p className="full-price">{`$${productDetails?.priceRegular}`}</p>
          </div>
          <div className="product__actions product-detail__buttons">
            <button
              type="button"
              name="add-to-card"
              className={classNames(
                'add-to-card primary__button button',
                {
                  selected: isAddToCartBtnActive,
                },
              )}
              onClick={() => addToCart(productDetails && productDetails?.id)}
            >
              {!isAddToCartBtnActive ? 'Add to cart' : 'Added to cart'}
            </button>
            <button
              type="button"
              name="add-to-favourite"
              className={classNames(
                'add-to-favourite button icon',
                {
                  selected: isAddToFavBtnActive,
                },
              )}
              onClick={() => addToFavourites(
                productDetails && productDetails?.id,
              )}
            />
          </div>
          <div className="product__details">
            <ProductDetail title="Screen" value={productDetails?.screen} />
            <ProductDetail
              title="Resolution"
              value={productDetails?.resolution}
            />
            <ProductDetail
              title="Processor"
              value={productDetails?.processor}
            />
            <ProductDetail
              title="RAM"
              value={productDetails?.ram}
            />
          </div>
        </div>
      </section>
      <section className="product__description grid">
        <div className="about grid__item--fullScreen-1-12">
          <h2 className="about__title">About</h2>
          <div className="about__articles">
            <article className="about__article">
              <h3 className="article__title">
                {productDetails?.description[0].title}
              </h3>
              <div className="article__text">
                {productDetails?.description[0].text}
              </div>
            </article>
            <article className="about__article">
              <h3 className="article__title">
                {productDetails?.description[1].title}
              </h3>
              <div className="article__text">
                {productDetails?.description[1].text}
              </div>
            </article>
            <article className="about__article">
              <h3 className="article__title">
                {productDetails?.description[2].title}
              </h3>
              <div className="article__text">
                {productDetails?.description[2].text}
              </div>
            </article>
          </div>
        </div>
        <div className="specification grid__item--fullScreen-14-24">
          <h2 className="specification__title">Tech specs</h2>
          <div className="product__details">
            <ProductDetail
              title="Screen"
              value={productDetails?.screen}
            />
            <ProductDetail
              title="Resolution"
              value={productDetails?.resolution}
            />
            <ProductDetail
              title="Processor"
              value={productDetails?.processor}
            />
            <ProductDetail
              title="RAM"
              value={productDetails?.ram}
            />
            <ProductDetail
              title="Built in memory"
              value={productDetails?.capacity}
            />
            <ProductDetail
              title="Camera"
              value={productDetails?.camera}
            />
            <ProductDetail
              title="Zoom"
              value={productDetails?.zoom}
            />
            <ProductDetail
              title="Cell"
              value={productDetails?.cell.join(', ')}
            />
          </div>
        </div>
      </section>
    </>
  );
};
