import React, {
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import './ProductInfo.scss';
import { BASE_URL } from '../../helpers/constants';
import { Product, ProductDetails } from '../../types';
import { useSwipe } from '../../helpers/useSwipe';
import { formatCapacity } from '../../helpers/formatCapacity';
import { FavoritesContext } from '../../contexts/FavoritesContext';
import { CartContext } from '../../contexts/CartContext';

type Props = {
  productInfo: ProductDetails;
  product: Product | undefined;
};

export const ProductInfo: React.FC<Props> = ({ productInfo, product }) => {
  const {
    name,
    category,
    images,
    color,
    colorsAvailable,
    namespaceId,
    capacity,
    capacityAvailable,
    priceRegular,
    priceDiscount,
    screen,
    resolution,
    processor,
    ram,
    description,
    camera,
    zoom,
    cell,
  } = productInfo;

  const [imageIndex, setImageIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { favorites, addToFavorites } = useContext(FavoritesContext);
  const { cart, addToCart } = useContext(CartContext);
  const isFavorite = favorites.some(item => item.id === product?.id);
  const isInCart = cart.some(item => item.id === product?.id);

  const handleAddToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!isInCart && product) {
      addToCart(product);
    }
  };

  const handleAddToFavorites = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (product) {
      addToFavorites(product);
    }
  };

  const goToNextImage = useCallback(() => {
    if (images) {
      const isLastSlide = imageIndex === images.length - 1;
      const newIndex = isLastSlide ? 0 : imageIndex + 1;

      setImageIndex(newIndex);
    }
  }, [imageIndex, images]);

  const goToPreviousImage = useCallback(() => {
    if (images) {
      const isFirstSlide = imageIndex === 0;
      const newIndex = isFirstSlide ? images.length - 1 : imageIndex - 1;

      setImageIndex(newIndex);
    }
  }, [imageIndex, images]);

  const { handleTouchStart, handleTouchMove } = useSwipe(
    goToNextImage, goToPreviousImage,
  );

  const handleImageSelect = (index: number) => {
    setImageIndex(index);
  };

  const getColorLink = (value: string) => {
    return `/${category}/${namespaceId}-${capacity.toLowerCase()}-${value.replaceAll(' ', '-')}`;
  };

  const getCapacityLink = (value: string) => {
    return `/${category}/${namespaceId}-${value.toLowerCase()}-${color.replaceAll(' ', '-')}`;
  };

  return (
    <div className="product-info">
      <div className="product-info__content">
        <div className="product-info__main grid grid--tablet">
          <div
            className="
                      grid__item
                      grid__item--tablet-1-1
                      grid__item--desktop-1-2"
          >
            <ul className="product-info__images-previews">
              {images?.map((img, index) => (
                <li
                  className={cn('product-info__image-item', {
                    'product-info__image-item--selected':
                      index === imageIndex,
                  })}
                  key={img}
                >
                  <button
                    type="button"
                    className="product-info__image-button"
                    onClick={() => handleImageSelect(index)}
                  >
                    <img
                      src={`${BASE_URL}/${images[index]}`}
                      alt={`${name} ${index}`}
                      className="product-info__image-preview"
                    />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="
            product-info__main-image
                      grid__item
                      grid__item--tablet-2-7
                      grid__item--desktop-3-12"
          >
            <div
              className="product-info__image-container"
              ref={containerRef}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
            >
              <img
                src={`${BASE_URL}/${images[imageIndex]}`}
                alt={name}
                className="product-info__image"
              />
            </div>
          </div>

          <div
            className="
              product-info__controls
                        grid__item
                        grid__item--tablet-8-12
                        grid__item--desktop-14-20"
          >
            <div className="product-info__colors">
              <div
                className="product-info__controls-top"
              >
                <p className="product-info__control-title">
                  Available colors
                </p>
                <p className="product-info__id">
                  {`ID: ${product?.id}`}
                </p>
              </div>

              <ul className="product-info__color-list">
                {colorsAvailable.map(value => (
                  <li
                    className={cn('product-info__color-item', {
                      'product-info__color-item--selected': color === value,
                    })}
                    key={value}
                  >
                    <Link
                      className={`product-info__color-link product-info__color-link--${value.replace(' ', '')}`}
                      to={getColorLink(value)}
                    />
                  </li>
                ))}
              </ul>
            </div>

            <div className="product-info__capacities">
              <p className="product-info__control-title">
                Select capacity
              </p>

              <ul className="product-info__capacity-list">
                {capacityAvailable.map(value => (
                  <li
                    className={cn('product-info__capacity-item', {
                      'product-info__capacity-item--selected':
                        capacity === value,
                    })}
                    key={value}
                  >
                    <Link
                      className={cn('product-info__capacity-link', {
                        'product-info__capacity-link--selected':
                          capacity === value,
                      })}
                      to={getCapacityLink(value)}
                    >
                      {formatCapacity(value)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="product-info__price-container">
              <h2 className="product-info__price">{`$${priceDiscount}`}</h2>
              {priceDiscount !== priceRegular && (
                <p className="product-info__full-price">{`$${priceRegular}`}</p>
              )}
            </div>

            <div className="product-info__buttons">
              <button
                type="button"
                className={cn('product-info__primary-button button', {
                  'button--selected': isInCart,
                })}
                onClick={handleAddToCart}
              >
                {isInCart ? 'Added to cart' : 'Add to cart'}
              </button>
              <button
                type="button"
                className={cn('product-info__fav-button', {
                  'product-info__fav-button--selected': isFavorite,
                })}
                onClick={handleAddToFavorites}
              >
                <div
                  className={cn('icon icon--favorites', {
                    'icon--selected-favorites': isFavorite,
                  })}
                />
              </button>
            </div>

            <ul className="product-info__specs">
              <li className="product-info__spec">
                <p className="product-info__spec-title">Screen</p>
                <p className="product-info__spec-value">
                  {screen.replace("'", '"')}
                </p>
              </li>
              <li className="product-info__spec">
                <p className="product-info__spec-title">Resolution</p>
                <p className="product-info__spec-value">
                  {resolution}
                </p>
              </li>
              <li className="product-info__spec">
                <p className="product-info__spec-title">Processor</p>
                <p className="product-info__spec-value">
                  {processor}
                </p>
              </li>
              <li className="product-info__spec">
                <p className="product-info__spec-title">RAM</p>
                <p className="product-info__spec-value">
                  {formatCapacity(ram)}
                </p>
              </li>
            </ul>
          </div>
        </div>

        <div className="product-info__description grid grid--desktop">
          <div
            className="
              product-info__about
                        grid__item
                        grid__item--desktop-1-12"
          >
            <h3 className="product-info__about-title">
              About
            </h3>

            <ul className="product-info__about-list">
              {description.map(item => (
                <li
                  className="product-info__about-item"
                  key={item.title}
                >
                  <p className="product-info__about-name">
                    {item.title}
                  </p>

                  {item.text.map(paragraph => (
                    <p
                      className="product-info__about-paragraph"
                      key={paragraph.slice(0, 10)}
                    >
                      {paragraph}
                    </p>
                  ))}
                </li>
              ))}
            </ul>
          </div>

          <div
            className="
              product-info__tech-specs
                        grid__item
                        grid__item--desktop-14-24"
          >
            <h3 className="product-info__tech-specs-title">
              Tech specs
            </h3>

            <ul className="product-info__tech-spec-list">
              <li className="product-info__tech-spec-item">
                <p className="product-info__tech-spec-title">Screen</p>
                <p className="product-info__tech-spec-value">
                  {screen.replace("'", '"')}
                </p>
              </li>
              <li className="product-info__tech-spec-item">
                <p className="product-info__tech-spec-title">Resolution</p>
                <p className="product-info__tech-spec-value">
                  {resolution}
                </p>
              </li>
              <li className="product-info__tech-spec-item">
                <p className="product-info__tech-spec-title">Processor</p>
                <p className="product-info__tech-spec-value">
                  {processor}
                </p>
              </li>
              <li className="product-info__tech-spec-item">
                <p className="product-info__tech-spec-title">RAM</p>
                <p className="product-info__tech-spec-value">
                  {formatCapacity(ram)}
                </p>
              </li>
              <li className="product-info__tech-spec-item">
                <p className="product-info__tech-spec-title">Built in memory</p>
                <p className="product-info__tech-spec-value">
                  {formatCapacity(capacity)}
                </p>
              </li>
              {camera && (
                <li className="product-info__tech-spec-item">
                  <p className="product-info__tech-spec-title">Camera</p>
                  <p className="product-info__tech-spec-value">
                    {camera}
                  </p>
                </li>
              )}
              {zoom && (
                <li className="product-info__tech-spec-item">
                  <p className="product-info__tech-spec-title">Zoom</p>
                  <p className="product-info__tech-spec-value">
                    {zoom}
                  </p>
                </li>
              )}
              <li className="product-info__tech-spec-item">
                <p className="product-info__tech-spec-title">Cell</p>
                <p className="product-info__tech-spec-value">
                  {cell.join(', ')}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
