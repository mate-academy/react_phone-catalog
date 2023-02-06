import classNames from 'classnames';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/components/ProductDetails.scss';
import { Product } from '../types/Product';
import { Context } from './ContextProvider';
import { ProductsSlider } from './ProductsSlider';

type Props = {
  product: Product,
  productDetails: string,
  suggestedProducts: Product[],
};

export const ProductDetails: React.FC<Props> = ({
  product,
  productDetails,
  suggestedProducts,
}) => {
  const details = JSON.parse(productDetails);
  const [selectedPhoto, setSelectedPhoto] = useState<string>(details.images[0]);
  const {
    cart,
    favorite,
    cartAdd,
    favoriteAdd,
  } = useContext(Context);

  const navigate = useNavigate();

  const isInCart = cart?.some(cartProduct => cartProduct.id === product.id);
  const isInFavorites
    = favorite?.some(favProduct => favProduct.id === product.id);

  const actualPrice = product.discount !== 0
    ? Math.round(product.price * ((100 - product.discount) / 100))
    : product.price;

  const breadcrumpsInfo = {
    to: '',
    category: '',
  };

  switch (product.type) {
    case 'phone':
      breadcrumpsInfo.to = '/phones';
      breadcrumpsInfo.category = 'Phones';
      break;
    case 'tablet':
      breadcrumpsInfo.to = '/tablets';
      breadcrumpsInfo.category = 'Tablets';
      break;
    case 'accessory':
      breadcrumpsInfo.to = '/accessories';
      breadcrumpsInfo.category = 'Accessories';
      break;
    default:
      breadcrumpsInfo.to = '';
      breadcrumpsInfo.category = '';
  }

  return (
    <div className="container product-details">

      <div
        className="breadcrumps"
        data-cy="breadCrumbs"
      >
        <Link to="/" className="breadcrumps__item">
          <img src="../assets/home.svg" alt="home-icon" />
        </Link>
        <img
          src="../assets/arrow-next-grey.svg"
          alt="arrow-next"
        />
        <Link
          to={breadcrumpsInfo.to}
          className="text__small text__small--primary breadcrumps__item"
        >
          {breadcrumpsInfo.category}
        </Link>
        <img
          src="../assets/arrow-next-grey.svg"
          alt="arrow-next"
        />
        <p className="text__small text__small--secondary breadcrumps__item">
          {product.name}
        </p>
      </div>

      <button
        type="button"
        onClick={() => navigate(-1)}
        className="breadcrumps product-details__back"
        data-cy="backButton"
      >
        <img
          src="../assets/arrow-prev.svg"
          alt="prev-icon"
          className="breadcrumps__item"
        />
        <p className="text__small text__small--secondary breadcrumps__item">
          Back
        </p>
      </button>

      <h1 className="title__h1 title__h1--primary product-details__title">
        {product.name}
      </h1>
      <section className="product-details__first-section">
        <div className="product-details__photos">
          <div className="product-details__all-photos">
            {details.images.map((image: string) => (
              <button
                type="button"
                className={classNames('product-details__cell', {
                  'product-details__cell--selected': image === selectedPhoto,
                })}
                key={image}
                onClick={() => setSelectedPhoto(image)}
              >
                <img
                  src={`../${image}`}
                  alt="product"
                  className="product-details__photo"
                />
              </button>
            ))}
          </div>
          <div className="product-details__viewport">
            <img
              src={`../${selectedPhoto}`}
              alt="product"
              className="product-details__selected-photo"
            />
          </div>
        </div>
        <div className="product-details__order">
          <div className="product-details__price">
            <h1 className="title__h1 title__h1--primary">
              {`$${actualPrice}`}
            </h1>
            {product.discount !== 0 && (
              <h1 className="title__h2
                title__h2--secondary
                product-details__old-price"
              >
                {`$${product.price}`}
              </h1>
            )}
          </div>
          <div className="product-details__buttons">
            {isInCart ? (
              <button
                type="button"
                className="button
                  button--is-success
                  product-details__add-button"
                onClick={() => cartAdd(product)}
              >
                Added to cart
              </button>
            ) : (
              <button
                type="button"
                className="button button--is-dark product-details__add-button"
                onClick={() => cartAdd(product)}
              >
                Add to cart
              </button>
            )}

            <button
              type="button"
              className="product-details__favorite-button"
              onClick={() => favoriteAdd(product)}
            >
              {isInFavorites ? (
                <img src="../assets/favorites-active.svg" alt="favorite" />
              ) : (
                <img src="../assets/favorites.svg" alt="favorite" />
              )}

            </button>
          </div>
          <div className="product-details__info">
            {details.display.screenSize && (
              <div className="product-details__info-item">
                <span className="text__small text__small--secondary">
                  Screen
                </span>
                <span className="text__small text__small--primary">
                  {details.display.screenSize}
                </span>
              </div>
            )}
            {details.display.screenResolution && (
              <div className="product-details__info-item">
                <span className="text__small text__small--secondary">
                  Resolution
                </span>
                <span className="text__small text__small--primary">
                  {details.display.screenResolution}
                </span>
              </div>
            )}
            {details.hardware.cpu && (
              <div className="product-details__info-item">
                <span className="text__small text__small--secondary">
                  Proccesor
                </span>
                <span className="text__small text__small--primary">
                  {details.hardware.cpu}
                </span>
              </div>
            )}
            {details.storage.ram && (
              <div className="product-details__info-item">
                <span className="text__small text__small--secondary">
                  RAM
                </span>
                <span className="text__small text__small--primary">
                  {details.storage.ram}
                </span>
              </div>
            )}
          </div>
        </div>
      </section>
      <section className="product-details__about-section">
        <article
          className="product-details__about"
          data-cy="productDescription"
        >
          <h1 className="title__h2
            title__h2--primary
            product-details__subtitle"
          >
            About
          </h1>
          <span className="line product-details__line" />
          <p className="text__body
            text__body--secondary
            product-details__description"
          >
            {details.description}
          </p>
        </article>
        <article className="product-details__tech-specs">
          <h1 className="title__h2
            title__h2--primary product-details__subtitle"
          >
            Tech specs
          </h1>
          <span className="line line product-details__line" />
          <div className="product-details__tech-spec">
            <span className="text__body text__body--secondary">
              Screen
            </span>
            <span className="text__body text__body--primary">
              {details.display.screenSize}
            </span>
          </div>
          <div className="product-details__tech-spec">
            <span className="text__body text__body--secondary">
              Resolution
            </span>
            <span className="text__body text__body--primary">
              {details.display.screenResolution}
            </span>
          </div>
          <div className="product-details__tech-spec">
            <span className="text__body text__body--secondary">
              Proccesor
            </span>
            <span className="text__body text__body--primary">
              {details.hardware.cpu}
            </span>
          </div>
          <div className="product-details__tech-spec">
            <span className="text__body text__body--secondary">
              RAM
            </span>
            <span className="text__body text__body--primary">
              {details.storage.ram}
            </span>
          </div>
        </article>
      </section>
      <section className="product-details__slider">
        <ProductsSlider
          title="You may also like"
          products={suggestedProducts}
        />
      </section>
    </div>
  );
};
