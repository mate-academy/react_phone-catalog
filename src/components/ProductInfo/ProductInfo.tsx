import React from 'react';
import './ProductInfo.scss';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { FullProductData } from '../../types/FullProductData';
import { Product } from '../../types/Product';
import { ProductPhotos } from '../ProductPhotos/ProductPhotos';
import { useAppContext } from '../../store/store';

type Props = {
  productInfo: FullProductData;
  product: Product;
};

export const ProductInfo: React.FC<Props> = ({ productInfo, product }) => {
  const {
    id,
    name,
    images,
    color,
    colorsAvailable,
    category,
    namespaceId,
    capacity,
    capacityAvailable,
    priceDiscount,
    priceRegular,
    screen,
    resolution,
    processor,
    ram,
    description,
    camera,
    zoom,
    cell,
  } = productInfo;

  const {
    state: { favourites, cart },
    methods: {
      addProductToFavourites,
      addProductToCart,
      removeProductFromCart,
    },
  } = useAppContext();

  const isFavourite = favourites.some(item => item.itemId === id);
  const isInCart = cart.some(item => item.id === id);

  const handleAddToCart = () => {
    if (!isInCart) {
      addProductToCart({
        image: product.image,
        name: product.name,
        price: product.price,
        id,
        count: 1,
      });
    } else {
      removeProductFromCart(id);
    }
  };

  const handleAddToFavourite = () => {
    if (product) {
      addProductToFavourites(product);
    }
  };

  const getColorLink = (value: string) => {
    return `/${category}/${namespaceId}-${capacity.toLowerCase()}-${value.replaceAll(' ', '-')}`;
  };

  const getCapacityLink = (value: string) => {
    return `/${category}/${namespaceId}-${value.toLowerCase()}-${color.replaceAll(' ', '-')}`;
  };

  return (
    <div className="product-info">
      <h2 className="product-info__title">{name}</h2>

      <div className="product-info__container">
        <ProductPhotos images={images} />

        <div className="product-info__options">
          <div className="product-info__option">
            <div className="product-info__option-top">
              <p className="product-info__option-title">Available colors</p>
              <p className="product-info__option-index">{`ID: ${product?.id}`}</p>
            </div>

            <div className="product-info__colors">
              {colorsAvailable.map(item => (
                <Link
                  key={item}
                  to={getColorLink(item)}
                  className={classNames('product-info__color-link', {
                    'product-info__color-link--active': item === color,
                  })}
                >
                  <span
                    className={`product-info__color product-info__color--${item.replace(' ', '')}`}
                    style={{ backgroundColor: item.replace(' ', '') }}
                  ></span>
                </Link>
              ))}
            </div>
          </div>

          <div className="product-info__option">
            <div className="product-info__option-top">
              <p className="product-info__option-title">Select capacity</p>
            </div>

            <div className="product-info__capacity">
              {capacityAvailable.map(item => (
                <Link
                  key={item}
                  to={getCapacityLink(item)}
                  className={classNames('product-info__capacity-link', {
                    'product-info__capacity-link--active': item === capacity,
                  })}
                >
                  {item.toUpperCase()}
                </Link>
              ))}
            </div>
          </div>

          <p className="product-info__price">
            <span>{`$${priceDiscount}`}</span>

            {priceDiscount !== priceRegular && (
              <span className="product-info__full-price">
                {`$${priceRegular}`}
              </span>
            )}
          </p>

          <div className="product-info__buttons">
            <button
              className={classNames('buttons', {
                'buttons--selected': isInCart,
              })}
              onClick={handleAddToCart}
            >
              {isInCart ? 'Added to cart' : 'Add to cart'}
            </button>

            <button
              className={classNames('button-favourite', {
                'button-favourite--selected': isFavourite,
              })}
              onClick={handleAddToFavourite}
            ></button>
          </div>

          <ul className="product-info__specs">
            <li className="product-info__spec">
              <p className="product-info__spec-title">Screen</p>
              <p className="product-info__spec-value">{screen}</p>
            </li>

            <li className="product-info__spec">
              <p className="product-info__spec-title">Resolution</p>
              <p className="product-info__spec-value">{resolution}</p>
            </li>

            <li className="product-info__spec">
              <p className="product-info__spec-title">Processor</p>
              <p className="product-info__spec-value">{processor}</p>
            </li>

            <li className="product-info__spec">
              <p className="product-info__spec-title">RAM</p>
              <p className="product-info__spec-value">{ram}</p>
            </li>
          </ul>
        </div>
      </div>

      <div className="product-info__container">
        <div className="product-info__section">
          <h3 className="product-info__section-title">About</h3>

          <ul className="product-info__about">
            {description.map(({ title, text }) => (
              <li key={title} className="product-info__about-item">
                <h4 className="product-info__about-title">{title}</h4>

                {text.map(paragraph => (
                  <p
                    key={paragraph.slice(0, 5)}
                    className="product-info__about-text"
                  >
                    {paragraph}
                  </p>
                ))}
              </li>
            ))}
          </ul>
        </div>

        <div className="product-info__section">
          <h3 className="product-info__section-title">Tech specs</h3>

          <ul className="product-info__fullspecs">
            <li className="product-info__fullspec">
              <p className="product-info__fullspec-title">Screen</p>
              <p className="product-info__fullspec-value">{screen}</p>
            </li>

            <li className="product-info__fullspec">
              <p className="product-info__fullspec-title">Resolution</p>
              <p className="product-info__fullspec-value">{resolution}</p>
            </li>

            <li className="product-info__fullspec">
              <p className="product-info__fullspec-title">Processor</p>
              <p className="product-info__fullspec-value">{processor}</p>
            </li>

            <li className="product-info__fullspec">
              <p className="product-info__fullspec-title">RAM</p>
              <p className="product-info__fullspec-value">{ram}</p>
            </li>

            <li className="product-info__fullspec">
              <p className="product-info__fullspec-title">Built in memory</p>
              <p className="product-info__fullspec-value">{capacity}</p>
            </li>

            {camera && (
              <li className="product-info__fullspec">
                <p className="product-info__fullspec-title">Camera</p>
                <p className="product-info__fullspec-value">{camera}</p>
              </li>
            )}

            {zoom && (
              <li className="product-info__fullspec">
                <p className="product-info__fullspec-title">Zoom</p>
                <p className="product-info__fullspec-value">{zoom}</p>
              </li>
            )}

            <li className="product-info__fullspec">
              <p className="product-info__fullspec-title">Cell</p>
              <p className="product-info__fullspec-value">{cell.join(', ')}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
