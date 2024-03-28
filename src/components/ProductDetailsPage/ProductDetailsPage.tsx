import { Link, useLocation, useParams } from 'react-router-dom';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import { ButtonBack } from '../ButtonBack';
import { PathRoute } from '../PathRoute';
import './ProductDetailsPage.scss';
import { getProductDetails } from '../../services/products';
import { ProductDetails } from '../../type/ProductDetails';
import { ProductsSlider } from '../ProductsSlider';
import { DispatchContext, StateContext } from '../../store/ProductsContext';
import { Loader } from '../Loader';

export const ProductDetailsPage: React.FC = () => {
  const dispatch = useContext(DispatchContext);
  const { products, favourites, cart, errorMessage } = useContext(StateContext);
  const [details, setDetails] = useState<ProductDetails | null>(null);
  const [loading, isLoading] = useState(false);
  const { productId } = useParams();
  const { pathname } = useLocation();
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const colors = details?.colorsAvailable || [];
  const capacities = details?.capacityAvailable || [];
  const description = details?.description || [];
  const dc = details?.capacity || '';
  const isFan = favourites.some(fav => fav.itemId === details?.id);

  useEffect(() => {
    isLoading(true);
    dispatch({ type: 'errorMessage', payload: '' });

    if (productId) {
      getProductDetails(productId)
        .then(product => {
          setDetails(product);
        })
        .catch(() => {
          dispatch({ type: 'errorMessage', payload: 'Product was not found' });
        })
        .finally(() => isLoading(false));
    }
  }, [dispatch, productId]);

  const handleChoosePhoto = useCallback((index: number) => {
    setCurrentPhoto(index);
  }, []);

  const sortMaxDiscount = useCallback(() => {
    const result = [...products];

    result.sort((a, b) => {
      const discount1 = a.fullPrice - a.price;
      const discount2 = b.fullPrice - b.price;

      return discount2 - discount1;
    });

    return result;
  }, [products]);

  const maxDiscountProducts = sortMaxDiscount();

  const handleFanClick = () => {
    if (details) {
      const type = isFan ? 'deleteFavourites' : 'addFavourites';

      dispatch({ type, payload: details.id });
    }
  };

  const handleCartClick = () => {
    if (details) {
      dispatch({ type: 'addToCart', payload: details.id });
    }
  };

  const addedToCart = cart.some(c => c.itemId === details?.id);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="Details">
      <PathRoute />

      <div className="Details__back">
        <ButtonBack />
      </div>

      {!errorMessage ? (
        <div className="Details__content">
          <h2 className="Details__title">{details?.name}</h2>
          <div className="Details__photo">
            <img
              src={details?.images[currentPhoto]}
              alt="big"
              className="Details__photo-img"
            />
          </div>
          <div className="Details__photo-select">
            {details?.images.map((src, i) => (
              <button
                type="button"
                className={classNames('Details__photo-box', {
                  'Details__photo-box--active': i === currentPhoto,
                })}
                key={src}
                onClick={() => handleChoosePhoto(i)}
              >
                <img src={src} alt="Choose" className="Details__photo-item" />
              </button>
            ))}
          </div>
          <div className="Details__card">
            <span className="Details__id">ID: 802390</span>
            <div className="Details__colors">
              <p className="Details__text">Available colors</p>
              <div className="Details__colors-link">
                {colors?.map(color => (
                  <Link
                    to={
                      details
                        ? pathname.replace(details.color, color)
                        : pathname
                    }
                    key={color}
                  >
                    <div
                      className={classNames('Details__colors-circle', {
                        'Details__colors-circle--active':
                          color === details?.color,
                      })}
                    >
                      <div
                        className="Details__colors-circleInside"
                        style={{ backgroundColor: color }}
                      />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <div className="Details__line" />
            <p className="Details__text">Select capacity</p>

            <div className="Details__capacity">
              {capacities.map(cap => (
                <Link
                  to={
                    details
                      ? pathname.replace(dc.toLowerCase(), cap.toLowerCase())
                      : pathname
                  }
                  className={classNames('Details__capacity-link', {
                    'Details__capacity-link--active': cap === details?.capacity,
                  })}
                  key={cap}
                >
                  {cap.replace('GB', ' GB')}
                </Link>
              ))}
            </div>

            <div className="Details__line Details__line--2" />
            <div className="Details__price">
              <div className="Details__price-current">{`$${details?.priceDiscount}`}</div>
              {details?.priceRegular && (
                <div className="Details__price-full">{`$${details?.priceRegular}`}</div>
              )}
            </div>
            <div className="Details__buttons">
              {!addedToCart ? (
                <button
                  type="button"
                  className="Details__buttons-add"
                  onClick={handleCartClick}
                >
                  Add to cart
                </button>
              ) : (
                <button type="button" className="Details__buttons-added">
                  Added
                </button>
              )}

              <button
                type="button"
                className="Details__buttons-favorite"
                onClick={handleFanClick}
              >
                <img
                  src={
                    isFan ? 'icons/Heart_Like_Red.svg' : 'icons/Heart_Like.svg'
                  }
                  alt="favorite"
                  className="Details__buttons-favorite-icon"
                />
              </button>
            </div>
            <div className="Details__description">
              <div className="Details__description-item">
                <p className="Details__description-text">Screen</p>
                <p className="Details__description-value">{details?.screen}</p>
              </div>
              <div className="Details__description-item">
                <p className="Details__description-text">Resolution</p>
                <p className="Details__description-value">
                  {details?.resolution}
                </p>
              </div>
              <div className="Details__description-item">
                <p className="Details__description-text">Processor</p>
                <p className="Details__description-value">
                  {details?.processor}
                </p>
              </div>
              <div className="Details__description-item">
                <p className="Details__description-text">RAM</p>
                <p className="Details__description-value">{details?.ram}</p>
              </div>
            </div>
          </div>

          <section className="About" data-cy="productDescription">
            <article className="About__title">
              <h3 className="About__title-text">About</h3>
              <div className="About__title-line" />
            </article>

            {description.map(des => (
              <article className="About__item" key={des.title}>
                <h4 className="About__item-title">{des.title}</h4>
                <div className="About__item-content">
                  {des.text.map(t => (
                    <p key={t}>{t}</p>
                  ))}
                </div>
              </article>
            ))}
          </section>
          <section className="Spect">
            <article className="Spect__title">
              <h3 className="Spect__title-text">Tech specs</h3>
              <div className="Spect__title-line" />
            </article>
            <article className="Spect__content">
              <div className="Spect__content-item">
                <p className="Spect__content-text">Screen</p>
                <p className="Spect__content-value">{details?.screen}</p>
              </div>
              <div className="Spect__content-item">
                <p className="Spect__content-text">Resolution</p>
                <p className="Spect__content-value">{details?.resolution}</p>
              </div>
              <div className="Spect__content-item">
                <p className="Spect__content-text">Processor</p>
                <p className="Spect__content-value">{details?.processor}</p>
              </div>
              <div className="Spect__content-item">
                <p className="Spect__content-text">RAM</p>
                <p className="Spect__content-value">
                  {details?.ram.replace('GB', ' GB')}
                </p>
              </div>
              <div className="Spect__content-item">
                <p className="Spect__content-text">Built in memory</p>
                <p className="Spect__content-value">
                  {details?.capacity.replace('GB', ' GB')}
                </p>
              </div>
              <div className="Spect__content-item">
                <p className="Spect__content-text">Camera</p>
                <p className="Spect__content-value">{details?.camera}</p>
              </div>
              <div className="Spect__content-item">
                <p className="Spect__content-text">Zoom</p>
                <p className="Spect__content-value">{details?.zoom}</p>
              </div>
              <div className="Spect__content-item">
                <p className="Spect__content-text">Cell</p>
                <p className="Spect__content-value">
                  {details?.cell.join(', ')}
                </p>
              </div>
            </article>
          </section>
        </div>
      ) : (
        <h2 style={{ color: 'red', paddingBottom: '50px' }}>{errorMessage}</h2>
      )}

      <ProductsSlider
        products={maxDiscountProducts}
        title="You may also like"
      />
    </div>
  );
};
