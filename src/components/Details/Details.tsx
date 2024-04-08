import { useContext } from 'react';
import cn from 'classnames';
import { CatalogContext } from '../CatalogContext';
import { ProductDetails } from '../../types/ProductDetails';
import { Product } from '../../types/Product';
import { addedToCart, handleAddToCartClick } from '../../helper/Cart';
import {
  addedToFavorites,
  handleAddToFavoritesClick,
} from '../../helper/Favorites';
import './Details.scss';

export type Props = {
  product: ProductDetails;
  currentImage: string;
  activeColor: string;
  activeCapacity: string;
  setImage: (image: string) => void;
  setCapacity: (capacity: string) => void;
  setColor: (color: string) => void;
};

export const Details: React.FC<Props> = ({
  product,
  currentImage,
  activeColor,
  activeCapacity,
  setImage,
  setColor,
  setCapacity,
}) => {
  const { cartItems, setCartItems, favoriteProducts, setFavoriteProducts } =
    useContext(CatalogContext);

  const handleImageClick = (clickedImage: string) => {
    setImage(clickedImage);
  };

  const handleColorClick = (clickedColor: string) => {
    setColor(clickedColor);
  };

  const handleCapacityClick = (clickedCapacity: string) => {
    setCapacity(clickedCapacity);
  };

  const DISCOUNT = (product?.priceRegular ?? 0) - (product?.priceDiscount ?? 0);

  function normalizeProduct(productData: ProductDetails): Product {
    return {
      itemId: productData.id,
      name: productData.name,
      fullPrice: productData.priceRegular,
      price: productData.priceDiscount,
      image: productData.images[0],
    };
  }

  return (
    <div className="details">
      <h1 className="details__title title">{product.name}</h1>

      <div className="details__container">
        <div className="details__top">
          <div className="details__images-container">
            <div className="details__images">
              {product.images.map((image, index) => (
                <button
                  className={cn('details__image', {
                    'details__image--active': currentImage === image,
                  })}
                  type="button"
                  onClick={() => handleImageClick(image)}
                  key={image}
                >
                  <img
                    src={`${image}`}
                    alt={`item ${index}`}
                    className="details__picture"
                  />
                </button>
              ))}
            </div>

            <div className="details__main-image">
              <img
                src={`${currentImage}`}
                alt="product"
                className="details__main-picture"
              />
            </div>
          </div>

          <div className="details__info">
            <div className="characteristics">
              <div className="characteristics__section">
                <p className="characteristics__title">Avaliable colors</p>

                <div className="characteristics__elements">
                  {product.colorsAvailable.map(color => (
                    <button
                      type="button"
                      onClick={() => handleColorClick(color)}
                      className={cn('characteristics__circle', {
                        'characteristics__circle--active':
                          activeColor === color,
                      })}
                      key={color}
                      aria-label={`Select ${color} color`}
                    >
                      <div
                        className={`
                      characteristics__color
                      characteristics__color--${color}`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="characteristics__section">
                <p className="characteristics__title">Select capacity</p>
                <div className="characteristics__elements">
                  {product.capacityAvailable.map(capacity => (
                    <button
                      type="button"
                      onClick={() => handleCapacityClick(capacity)}
                      className={cn('characteristics__rectangle', {
                        'characteristics__rectangle--active':
                          activeCapacity === capacity,
                      })}
                      key={capacity}
                      aria-label={`Select ${capacity}`}
                    >
                      {capacity}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {DISCOUNT > 0 ? (
              <div
                className="
                characteristics__price-wrapper
                item__price-wrapper"
              >
                <p
                  className="
                  item__price
                  item__price--current
                  characteristics__price
                  characteristics__price--current
                "
                >{`$${product.priceDiscount}`}</p>
                <p
                  className="
                  item__price
                  item__price--original
                  characteristics__price
                  characteristics__price--original
                "
                >{`$${product.priceRegular}`}</p>
              </div>
            ) : (
              <div
                className="
                item__price-wrapper
                characteristics__price-wrapper
                "
              >
                <p
                  className="
                  item__price
                  item__price--current
                  characteristics__price
                  characteristics__price--current
                "
                >{`$${product.priceRegular}`}</p>
              </div>
            )}

            <div className="item__bottom characteristics__buttons">
              <button
                type="button"
                onClick={() =>
                  handleAddToCartClick(
                    cartItems,
                    setCartItems,
                    normalizeProduct(product),
                  )
                }
                className={cn('item__button', 'characteristics__button', {
                  'item__button--active': addedToCart(cartItems, product.id),
                })}
              >
                {`${addedToCart(cartItems, product.id) ? 'Added to cart' : 'Add to cart'}`}
              </button>

              <button
                type="button"
                data-cy="addToFavorite"
                onClick={() =>
                  handleAddToFavoritesClick(
                    favoriteProducts,
                    setFavoriteProducts,
                    normalizeProduct(product),
                  )
                }
                className={cn('item__icon', 'characteristics__icon', {
                  'item__icon--active': addedToFavorites(
                    favoriteProducts,
                    product.id,
                  ),
                })}
              >
                <div
                  aria-label="add-to-favorites"
                  className={cn(
                    'item__icon-image',
                    'characteristics__icon-image',
                    {
                      'item__icon-image--active': addedToFavorites(
                        favoriteProducts,
                        product.id,
                      ),
                    },
                  )}
                />
              </button>
            </div>

            <div className="item__description">
              <div className="item__description-row">
                <p className="item__description-title">Screen</p>
                <p className="item__description-value">{product.screen}</p>
              </div>
              <div className="item__description-row">
                <p className="item__description-title">Capacity</p>
                <p className="item__description-value">{product.capacity}</p>
              </div>
              <div className="item__description-row">
                <p className="item__description-title">RAM</p>
                <p className="item__description-value">{product.ram}</p>
              </div>
            </div>
          </div>

          <div className="details__id">{`ID: ${product.priceRegular}`}</div>
        </div>

        <div className="details__bottom">
          <div className="details__bottom-left">
            <div className="details__bottom-name">
              <h1 className="details__bottom-title">About</h1>
            </div>
            <section className="about" data-cy="productDescription">
              {product.description.map(part => (
                <div className="about__paragraph" key={part.title}>
                  <h3 className="about__title">{part.title}</h3>
                  <p className="about__text">{part.text}</p>
                </div>
              ))}
            </section>
          </div>

          <div className="details__bottom-right">
            <div className="details__bottom-name">
              <h1 className="details__bottom-title">Tech specs</h1>
            </div>
            <section className="tech-specs">
              <div className="item__description">
                <div className="item__description-row tech-specs__row">
                  <p className="item__description-title">Screen</p>
                  <p className="item__description-value">{product.screen}</p>
                </div>
                <div className="item__description-row tech-specs__row">
                  <p className="item__description-title">Resolution</p>
                  <p className="item__description-value">
                    {product.resolution}
                  </p>
                </div>
                <div className="item__description-row tech-specs__row">
                  <p className="item__description-title">Processor</p>
                  <p className="item__description-value">{product.processor}</p>
                </div>
                <div className="item__description-row tech-specs__row">
                  <p className="item__description-title">RAM</p>
                  <p className="item__description-value">{product.ram}</p>
                </div>
                <div className="item__description-row tech-specs__row">
                  <p className="item__description-title">Built in memory</p>
                  <p className="item__description-value">{product.capacity}</p>
                </div>
                <div className="item__description-row tech-specs__row">
                  <p className="item__description-title">Camera</p>
                  <p className="item__description-value">{product.camera}</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
