/* eslint-disable max-len */
import { Link, useLocation, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { PathLine } from '../components/pathLine';
import * as postServices from '../helpers/products';
import { Item } from '../types/Item';
import { ProductsSlider } from '../components/ProductsSlider';
import { Filter } from '../types/filter';
import { ProductsContext } from '../components/ProductsContext';
import { Loader } from '../components/Loader';

export const ProductDetailsPage: React.FC = () => {
  const {
    products, isLoading, errorMessage, cartIds,
    favIds, addToCard, addToFavorite,
  } = useContext(ProductsContext);
  const { search } = useLocation();
  const { productId } = useParams();
  const [isLoadingItem, setIsloadingItem] = useState(false);
  const [errorMessageItem, setErrorMessageItem] = useState('');
  const [item, setItem] = useState<Item>();
  const product = products.find(p => p.id === productId);

  function loadItem() {
    setIsloadingItem(true);

    return postServices.getItem(productId)
      .then(setItem)
      .catch(() => {
        setErrorMessageItem('Unable to load Item');
        setTimeout(() => setErrorMessageItem(''), 3000);
      }).finally(() => setIsloadingItem(false));
  }

  useEffect(() => {
    loadItem();
  }, []);

  if (errorMessage || errorMessageItem) {
    return (<h1>{errorMessage}</h1>);
  }

  if (isLoading || isLoadingItem) {
    return <Loader />;
  }

  return (
    <>
      <PathLine />

      <div className="item">
        <Link
          className="item__back link"
          to={{ pathname: '..', search }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M10.4712 3.52861C10.2109 3.26826 9.78878 3.26826 9.52843 3.52861L5.52843 7.52861C5.26808 7.78896 5.26808 8.21107 5.52843 8.47141L9.52843 12.4714C9.78878 12.7318 10.2109 12.7318 10.4712 12.4714C10.7316 12.2111 10.7316 11.789 10.4712 11.5286L6.94265 8.00001L10.4712 4.47141C10.7316 4.21107 10.7316 3.78896 10.4712 3.52861Z" fill="#313237" />
          </svg>
          Back
        </Link>

        <h1 className="item__title">
          {item?.name}
        </h1>
      </div>

      <div className="grid" data-cy="productDescription">
        <div className="grid__item-1-2">
          <div className="item__container">
            <img className="item__img" src={item?.images[1]} alt={item?.images[1]} />
            <img className="item__img" src={item?.images[2]} alt={item?.images[2]} />
            <img className="item__img" src={item?.images[3]} alt={item?.images[3]} />
            <img className="item__img" src={item?.images[4]} alt={item?.images[4]} />
            <img className="item__img" src={item?.images[5]} alt={item?.images[5]} />
          </div>
        </div>

        <div className="grid__item-3-12 item__mainImg">
          <img className="item__img item__img--main" src={item?.images[0]} alt={item?.images[0]} />
        </div>

        <div className="grid__item-14-20">
          <h1 className="item__price">
            {product && (product.discount
              ? (
                <>
                  {`$${product.price - (product.price * (product.discount / 100))}`}
                  <span className="card__price--discount item__price--discount">
                    {`$${product.price}`}
                  </span>
                </>
              )
              : `$${product.price}`)}
          </h1>

          {product && (
            <>
              <div className="card__buttons item__buttons">
                <button
                  type="button"
                  className={cartIds.some(arr => arr[0] === product.id)
                    ? 'card__buttons-add card__buttons-add--selected'
                    : 'card__buttons-add'}
                  onClick={() => addToCard(product.id)}
                >
                  {cartIds.some(arr => arr[0] === product.id)
                    ? 'Added'
                    : 'Add to cart'}
                </button>

                <button
                  type="button"
                  className="card__buttons-favorite"
                  onClick={() => addToFavorite(product.id)}
                >
                  {favIds.includes(product.id)
                    ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M11.3 1.29878C10.7264 1.29878 10.1584 1.4118 9.62852 1.63137C9.09865 1.85092 8.61711 2.17283 8.21162 2.57847L8.00005 2.79005L7.78835 2.57836C6.96928 1.75929 5.85839 1.29914 4.70005 1.29914C3.54171 1.29914 2.43081 1.75929 1.61174 2.57836C0.792668 3.39743 0.33252 4.50833 0.33252 5.66667C0.33252 6.82501 0.792668 7.9359 1.61174 8.75497L7.50507 14.6483C7.77844 14.9217 8.22165 14.9217 8.49502 14.6483L14.3884 8.75497C14.794 8.34949 15.1158 7.86806 15.3353 7.33819C15.5549 6.80827 15.6679 6.24028 15.6679 5.66667C15.6679 5.09305 15.5549 4.52506 15.3353 3.99514C15.1158 3.46532 14.7941 2.98394 14.3885 2.57847C13.983 2.17277 13.5015 1.85094 12.9716 1.63137C12.4416 1.4118 11.8737 1.29878 11.3 1.29878Z" fill="#EB5757" />
                      </svg>

                    )
                    : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M9.62852 1.63137C10.1584 1.4118 10.7264 1.29878 11.3 1.29878C11.8737 1.29878 12.4416 1.4118 12.9716 1.63137C13.5015 1.85094 13.983 2.17277 14.3885 2.57847C14.7941 2.98394 15.1158 3.46532 15.3353 3.99514C15.5549 4.52506 15.6679 5.09305 15.6679 5.66667C15.6679 6.24028 15.5549 6.80827 15.3353 7.33819C15.1158 7.86806 14.794 8.34949 14.3884 8.75497C14.3883 8.75501 14.3884 8.75493 14.3884 8.75497L8.49502 14.6483C8.22165 14.9217 7.77844 14.9217 7.50507 14.6483L1.61174 8.75497C0.792668 7.9359 0.33252 6.82501 0.33252 5.66667C0.33252 4.50833 0.792668 3.39743 1.61174 2.57836C2.43081 1.75929 3.54171 1.29914 4.70005 1.29914C5.85839 1.29914 6.96928 1.75929 7.78835 2.57836L8.00005 2.79005L8.21162 2.57847C8.21158 2.57851 8.21166 2.57844 8.21162 2.57847C8.61711 2.17283 9.09865 1.85092 9.62852 1.63137ZM13.3983 3.56819C13.1228 3.29256 12.7957 3.07392 12.4357 2.92474C12.0756 2.77556 11.6898 2.69878 11.3 2.69878C10.9103 2.69878 10.5245 2.77556 10.1644 2.92474C9.80441 3.07392 9.4773 3.29256 9.2018 3.56819L8.49502 4.27497C8.22165 4.54834 7.77844 4.54834 7.50507 4.27497L6.7984 3.56831C6.24189 3.01179 5.48708 2.69914 4.70005 2.69914C3.91301 2.69914 3.15821 3.01179 2.60169 3.56831C2.04517 4.12483 1.73252 4.87963 1.73252 5.66667C1.73252 6.4537 2.04517 7.20851 2.60169 7.76502L8.00005 13.1634L13.3984 7.76502C13.674 7.48953 13.8928 7.16231 14.042 6.80228C14.1911 6.44226 14.2679 6.05637 14.2679 5.66667C14.2679 5.27696 14.1911 4.89107 14.042 4.53105C13.8928 4.17103 13.6739 3.84369 13.3983 3.56819Z" fill="#333333" />
                      </svg>
                    )}
                </button>
              </div>

              <div className="card__info">
                Screen
                <span className="card__info--bold">{product.screen}</span>
              </div>
              <div className="card__info">
                Capacity
                <span className="card__info--bold">{product.capacity}</span>
              </div>
              <div className="card__info">
                Flash
                <span className="card__info--bold">{item?.storage.flash}</span>
              </div>
              <div className="card__info">
                RAM
                <span className="card__info--bold">{product.ram}</span>
              </div>
            </>
          )}
        </div>

        <div className="grid__item-1-12">

          <h2 className="item__about-title">About</h2>
          <div className="card__line item__about-line" />
          <p className="item__about-text">
            {item?.description}
          </p>
          <h3 className="item__about-subtitle">AdditionalFeatures</h3>
          <p className="item__about-text">
            {item?.additionalFeatures.split(',').map(l => (
              <span key={l}>
                <span>{l}</span>
                <br />
              </span>
            ))}
          </p>
        </div>

        <div className="grid__item-14-22">
          <h2 className="item__about-title">Tech specs</h2>
          <div className="card__line item__about-line" />
          <div className="card__info">
            ScreenResolution
            <span className="card__info--bold">{item?.display.screenResolution}</span>
          </div>
          <div className="card__info">
            Operating system
            <span className="card__info--bold">{item?.android.os}</span>
          </div>
          <div className="card__info">
            User interface
            <span className="card__info--bold">{item?.android.ui}</span>
          </div>
          <div className="card__info">
            Availability
            <span className="card__info--bold">{item?.availability.join(' ')}</span>
          </div>

          <div className="card__info">
            Stand by Time
            <span className="card__info--bold">{item?.battery.standbyTime}</span>
          </div>

          <div className="card__info">
            Talk Time
            <span className="card__info--bold">{item?.battery.talkTime}</span>
          </div>

          <div className="card__info">
            Battery type
            <span className="card__info--bold">{item?.battery.type}</span>
          </div>

          <div className="card__info">
            Camera
            <span className="card__info--bold">
              {item?.camera.primary}
              <br />
              {item?.camera.features.join(' ')}
            </span>
            <br />
            <br />
          </div>

          <div className="card__info">
            Bluetooth
            <span className="card__info--bold">{item?.connectivity.bluetooth}</span>
          </div>

          <div className="card__info">
            Cell
            <span className="card__info--bold">{item?.connectivity.cell}</span>
          </div>

          <div className="card__info">
            GPS
            <span className="card__info--bold">
              {item?.connectivity.gps
                ? 'yes'
                : 'no'}
            </span>
          </div>

          <div className="card__info">
            Infrared
            <span className="card__info--bold">
              {item?.connectivity.infrared
                ? 'yes'
                : 'no'}
            </span>
          </div>

          <div className="card__info">
            Accelerometer
            <span className="card__info--bold">
              {item?.hardware.accelerometer
                ? 'yes'
                : 'no'}
            </span>
          </div>
          <div className="card__info">
            AudioJack
            <span className="card__info--bold">{item?.hardware.audioJack}</span>
          </div>
          <div className="card__info">
            CPU
            <span className="card__info--bold">{item?.hardware.cpu}</span>
          </div>
          <div className="card__info">
            FmRadio
            <span className="card__info--bold">
              {item?.hardware.fmRadio
                ? 'yes'
                : 'no'}
            </span>
          </div>
          <div className="card__info">
            USB
            <span className="card__info--bold">{item?.hardware.usb}</span>
          </div>
          <div className="card__info">
            Dimensions
            <span className="card__info--bold">{item?.sizeAndWeight.dimensions.join(' ')}</span>
          </div>
          <div className="card__info">
            Weight
            <span className="card__info--bold">{item?.sizeAndWeight.weight}</span>
          </div>
        </div>
      </div>

      <ProductsSlider filter={Filter.discount} />
    </>
  );
};
