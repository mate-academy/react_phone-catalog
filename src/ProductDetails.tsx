import {
  useState,
  useEffect,
  useContext,
} from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { Product } from './types/Product';
import { Details } from './types/Details';
import { LocaleStorageTypes } from './types/LocaleStorageTypes';
import { Loader } from './Loader';
import { getDetails } from './api/products';
import { ProductsSlider } from './ProductsSlider';
import { GoBack } from './GoBack';
import { Context } from './Context';
import {
  findProductOnCart,
  findProductOnFavourites,
  updateCart,
  updateFavourites,
} from './utils/productManipulations';

type Props = {
  favouritesTimeout?: number,
};

export const ProductDetails: React.FC<Props> = ({
  favouritesTimeout,
}) => {
  const avaliebleColors = ['#f0f0f0', '#000', '#62849c', '#96999b'];
  const avaliebleCapacity = [64, 264, 512];
  const {
    setChosenProducts,
    setProductsToBuy,
    setLoadingItem,
  } = useContext(Context);
  const { pathname } = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [details, setDetails] = useState<Details | null>(null);
  const [activeImageUrl, setActiveImageUrl] = useState(details?.images[0]);
  const [activeColor, setActiveColor] = useState(avaliebleColors[0]);
  const [activeCapacity, setActiveCapacity] = useState(avaliebleCapacity[0]);
  const [isPhotoActive, setIsPhotoActive] = useState(false);
  const activeProduct = JSON.parse(
    localStorage.getItem(LocaleStorageTypes.product) as string,
  );
  const display = details?.display.screenResolution.slice(
    details?.display.screenResolution.indexOf('(') + 1,
    details?.display.screenResolution.length - 1,
  );
  const screen = details?.display.screenResolution.slice(
    0, details?.display.screenResolution.indexOf('('),
  );
  const screenSize = details?.display.screenSize.slice(
    0, details?.display.screenSize.indexOf(' '),
  );
  const camera = details?.camera.primary.slice(
    0, details?.camera.primary.indexOf(' '),
  );

  const getUrl = (url: string | undefined) => {
    return url?.split('phones').join('products');
  };

  const get = async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      const response = await getDetails((activeProduct as Product).id);

      setDetails(response as Details);
      setActiveImageUrl(getUrl((response as Details).images[0]));
    } catch (error) {
      setIsError(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    get();
  }, []);

  return (
    <div className="details">
      <GoBack />
      <h1 className="details__title">{activeProduct?.name}</h1>

      {isLoading && (
        <Loader />
      )}

      {isError && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}

      {(!isLoading && !isError && activeProduct) && (
        <>
          <div className="details__product">
            <div className="details__photo_container">
              {details?.images.map(imageUrl => (
                <button
                  type="button"
                  aria-label="image"
                  className={classNames(
                    'details__small_photo',
                    {
                      'details__small_photo--active':
                      getUrl(imageUrl) === activeImageUrl,
                    },
                  )}
                  key={imageUrl}
                  style={{ backgroundImage: `url(${getUrl(imageUrl)})` }}
                  onClick={() => {
                    setActiveImageUrl(getUrl(imageUrl));
                  }}
                />
              ))}
            </div>

            <button
              type="button"
              aria-label="big image"
              className={classNames(
                'details__photo',
                { 'details__photo--active': isPhotoActive },
              )}
              style={{ backgroundImage: `url(${activeImageUrl})` }}
              onClick={() => setIsPhotoActive(!isPhotoActive)}
            />

            <div className="details__characteristics">
              <h6 className="details__subtitle">Available colors</h6>

              <div className="details__color_container">
                {avaliebleColors.map(color => (
                  <button
                    type="button"
                    className="details__color_button"
                    key={color}
                    disabled={activeColor === color}
                    onClick={() => setActiveColor(color)}
                  >
                    <div
                      className={classNames('details__color_border', {
                        'details__color_border--active': activeColor === color,
                      })}
                    >
                      <div
                        className="details__color"
                        style={{ backgroundColor: `${color}` }}
                      />
                    </div>
                  </button>
                ))}
              </div>

              <div className="details__line" />

              <h6 className="details__subtitle">Select capacity</h6>

              <div className="details__capacity_container">
                <button
                  type="button"
                  className="details__capacity_button"
                  onClick={() => {
                    setActiveCapacity(64);
                  }}
                >
                  <div
                    className={classNames('details__capacity', {
                      'details__capacity--active': activeCapacity === 64,
                    })}
                  >
                    64 GB
                  </div>
                </button>
                <button
                  type="button"
                  className="details__capacity_button"
                  onClick={() => {
                    setActiveCapacity(256);
                  }}
                >
                  <div
                    className={classNames('details__capacity', {
                      'details__capacity--active': activeCapacity === 256,
                    })}
                  >
                    256 GB
                  </div>
                </button>
                <button
                  type="button"
                  className="details__capacity_button"
                  onClick={() => {
                    setActiveCapacity(512);
                  }}
                >
                  <div
                    className={classNames('details__capacity', {
                      'details__capacity--active': activeCapacity === 512,
                    })}
                  >
                    512 GB
                  </div>
                </button>
              </div>

              <div className="details__line" />

              <div className="details__price_container">
                {activeProduct.discount === 0 && (
                  <div className="details__price">{`$${activeProduct.price}`}</div>
                )}

                {(activeProduct.price && activeProduct.discount !== 0) && (
                  <>
                    <div className="details__price">{`$${activeProduct.price - (activeProduct.price * activeProduct.discount) / 100}`}</div>
                    <div className="details__price_old">{`$${activeProduct.price}`}</div>
                  </>
                )}
              </div>

              <div className="details__button_container">
                <button
                  type="button"
                  className={classNames(
                    'details__button_add',
                    {
                      'details__button_add--active':
                      findProductOnCart(activeProduct.id) === true,
                    },
                  )}
                  onClick={(event) => updateCart(
                    setProductsToBuy,
                    event,
                    activeProduct,
                  )}
                >
                  {findProductOnCart(activeProduct.id) === true
                    ? 'Added to cart'
                    : 'Add to cart'}
                </button>
                <button
                  type="button"
                  aria-label="favourites"
                  className={classNames(
                    'details__button_favourites',
                    {
                      'details__button_favourites--active':
                      findProductOnFavourites(activeProduct.id),
                    },
                  )}
                  onClick={(event) => updateFavourites(
                    setChosenProducts,
                    setLoadingItem,
                    event,
                    activeProduct,
                    favouritesTimeout,
                  )}
                />
              </div>

              <div>
                <div className="details__description_container">
                  <div className="details__description">Screen</div>
                  <div className="details__value">{`${screen} ${screenSize}` || '-'}</div>
                </div>
                <div className="details__description_container">
                  <div className="details__description">Resolution</div>
                  <div className="details__value">{display || '-'}</div>
                </div>
                <div className="details__description_container">
                  <div className="details__description">Processor</div>
                  <div className="details__value">
                    {details?.hardware.cpu || '-'}
                  </div>
                </div>
                <div className="details__description_container">
                  <div className="details__description">RAM</div>
                  <div className="details__value">
                    {details?.storage.ram || '-'}
                  </div>
                </div>
              </div>
            </div>

            <div className="details__id">ID: 802390</div>

            <div className="details__about">
              <div className="details__about_title">About</div>

              <div className="details__line" />

              {details?.additionalFeatures && (
                <>
                  <div className="details__about_subtitle">
                    Additional Features
                  </div>

                  <p className="details__about_text">
                    {details?.additionalFeatures}
                  </p>
                </>
              )}

              {details?.description && (
                <>
                  <div className="details__about_subtitle">
                    Description
                  </div>

                  <p className="details__about_text">
                    {details?.description}
                  </p>
                </>
              )}
            </div>

            <div className="details__about--techSpecs">
              <div className="details__about_title">
                Tech specs
              </div>

              <div className="details__line" />

              <div className="details__about_specs">
                <div className="details__about_container">
                  <div className="details__about_spec">
                    Screen
                  </div>
                  <div className="details__about_value">
                    {`${screen} ${screenSize}` || '-'}
                  </div>
                </div>
                <div className="details__about_container">
                  <div className="details__about_spec">
                    Resolution
                  </div>
                  <div className="details__about_value">
                    {display || '-'}
                  </div>
                </div>
                <div className="details__about_container">
                  <div className="details__about_spec">
                    Processor
                  </div>
                  <div className="details__about_value">
                    {details?.hardware.cpu || '-'}
                  </div>
                </div>
                <div className="details__about_container">
                  <div className="details__about_spec">
                    RAM
                  </div>
                  <div className="details__about_value">
                    {details?.storage.ram || '-'}
                  </div>
                </div>
                <div className="details__about_container">
                  <div className="details__about_spec">
                    Built in memory
                  </div>
                  <div className="details__about_value">
                    {details?.storage.flash || '-'}
                  </div>
                </div>
                <div className="details__about_container">
                  <div className="details__about_spec">
                    Camera
                  </div>
                  <div className="details__about_value">
                    {`${camera} Mp` || '-'}
                  </div>
                </div>
              </div>
            </div>

          </div>

          <ProductsSlider
            pathname={pathname}
            title="You may also like"
            dicount={false}
            random
          />
        </>
      )}

      {(!isLoading && !isError && !activeProduct) && (
        <h3>No product</h3>
      )}
      <div
        className={classNames(
          'details__cover',
          { 'details__cover--active': isPhotoActive === true },
        )}
      />
    </div>
  );
};

ProductDetails.defaultProps = {
  favouritesTimeout: 0,
};
