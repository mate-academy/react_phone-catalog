/* eslint-disable max-len */
import {
  FC,
  useContext,
  useEffect,
  useState,
} from 'react';
import classNames from 'classnames';
import { ProdDetails } from '../../types/ProdDetails';
import { Product } from '../../types/Product';
import { FavContext } from '../../context/FavContext';
import { CartContext } from '../../context/CartContext';
import './ProductDetails.scss';
import { applyDiscount } from '../../helpers/applyDiscount';

type Props = {
  details: ProdDetails,
  product: Product;
};

export const ProductDetails: FC<Props> = ({ details, product }) => {
  const {
    name,
    images,
    display,
    storage,
    hardware,
    description,
    battery,
    camera,
    sizeAndWeight,
  } = details;

  const {
    price,
    discount,
  } = product;

  const [selectedImage, setSelectedImage] = useState(images[0]);

  useEffect(() => {
    setSelectedImage(images[0]);
  }, [images[0]]);

  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);
  const isInCart = cartItems.find(item => item.product.id === product.id);
  const handleAddToCart = () => {
    if (isInCart) {
      removeFromCart(product.id);
    } else {
      addToCart(product);
    }
  };

  const { favourites, addToFav, removeFromFav } = useContext(FavContext);
  const isFavourite = favourites.find(({ id }) => id === product.id);
  const handleFavStatus = () => {
    if (isFavourite) {
      removeFromFav(product.id);
    } else {
      addToFav(product);
    }
  };

  const discountPrice = applyDiscount(product);

  return (
    <section className="page__section product-details">
      <h1 className="product-details__title">{name}</h1>
      <div className="product-details__content">
        <div className="grid product-details__top">
          <div
            className="product-details__image-selector grid__item--desktop-1-2"
          >
            {images.map(image => (
              <button
                key={image}
                type="button"
                className={classNames('product-details__image-button', {
                  'product-details__image-button--selected':
                    image === selectedImage,
                })}
                style={{ backgroundImage: `url(${image})` }}
                onClick={() => setSelectedImage(image)}
              >
                {}
              </button>
            ))}
          </div>
          <div
            className="product-details__image-main grid__item--desktop-3-12"
            style={{ backgroundImage: `url(${selectedImage})` }}
          >
            {}
          </div>

          <div
            className="product-details__main-info grid__item--desktop-14-20"
          >
            <div className="product-details__price-container">
              {discount ? (
                <>
                  <div className="product-details__price">{`$${discountPrice}`}</div>
                  <div className="product-details__price product-details__price--crossed-out">{`$${price}`}</div>
                </>
              ) : (
                <div className="product-details__price">{`$${price}`}</div>
              )}
            </div>

            <div className="product-details__actions">
              <button
                type="button"
                className={classNames('product-details__add-to-cart', {
                  'product-details__add-to-cart--active': isInCart,
                })}
                onClick={handleAddToCart}
              >
                {isInCart ? 'Added to cart' : 'Add to cart'}
              </button>
              <div className="product-details__button-container">
                <button
                  type="button"
                  className={classNames('product-details__add-to-fav square-button square-button--large', {
                    'square-button--active product-details__add-to-fav--active': isFavourite,
                  })}
                  onClick={handleFavStatus}
                  aria-label="like button"
                  data-cy="addToFavorite"
                />
              </div>
            </div>

            <div className="product-details__spec">
              <ul className="product-details__spec-list">
                <li className="product-details__spec-name">Screen</li>
                <li className="product-details__spec-name">Resolution</li>
                <li className="product-details__spec-name">Processor</li>
                <li className="product-details__spec-name">RAM</li>
              </ul>

              <ul className="product-details__spec-list">
                <li className="product-details__spec-value">
                  {display.screenSize || 'No data'}
                </li>
                <li className="product-details__spec-value">
                  {display.screenResolution || 'No data'}
                </li>
                <li className="product-details__spec-value">
                  {hardware.cpu || 'No data'}
                </li>
                <li className="product-details__spec-value">
                  {storage.ram || 'No data'}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="grid product-details__bottom">
          <div
            className="product-details__about grid__item--desktop-1-12"
            data-cy="productDescription"
          >
            <h2 className="product-details__subtitle">About</h2>
            <div className="product-details__description">{description}</div>
          </div>

          <div
            className="product-details__tech-specs  grid__item--desktop-14-24"
          >
            <h2 className="product-details__subtitle">Tech specs</h2>
            <div className="product-details__spec">
              <ul className="product-details__spec-list product-details__spec-list--detailed">
                <li className="product-details__spec-name">Screen</li>
                <li className="product-details__spec-name">Resolution</li>
                <li className="product-details__spec-name">Processor</li>
                <li className="product-details__spec-name">RAM</li>
                <li className="product-details__spec-name">Battery</li>
                <li className="product-details__spec-name">Camera</li>
                <li className="product-details__spec-name">Dimensions</li>
                <li className="product-details__spec-name">Weight</li>

              </ul>
              <ul className="product-details__spec-list product-details__spec-list--detailed">
                <li className="product-details__spec-value">
                  {display.screenSize || 'No data'}
                </li>

                <li className="product-details__spec-value">
                  {display.screenResolution || 'No data'}
                </li>

                <li className="product-details__spec-value">
                  {hardware.cpu || 'No data'}
                </li>

                <li className="product-details__spec-value">
                  {storage.ram || 'No data'}
                </li>

                <li className="product-details__spec-value">
                  {battery.type || 'No data'}
                </li>

                <li className="product-details__spec-value">
                  {camera.primary || 'No data'}
                </li>

                <li className="product-details__spec-value">
                  {sizeAndWeight.dimensions.join(', ') || 'No data'}
                </li>

                <li className="product-details__spec-value">
                  {sizeAndWeight.weight || 'No data'}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
