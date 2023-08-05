/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable max-len */
import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import Breadcrumbs from './components/Breadcrumbs';
import '../styles/styles.scss';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Product } from '../types/Product';
import { Loader } from './components/Loader';
import { incrementAsync as loadPhoneDetails } from '../features/PhoneDetails/phoneDetailsSlice';
import { AsyncStatus } from '../types/AsyncStatus';
import { ProductsSlider } from './components/ProductsSlider';
import {
  favoriteProductsSelector,
  phoneCardSelector,
  phonesDetaildStatusSelector,
  phonesDetailsSelector,
  phonesSelector,
  phonesStatusSelector,
  selectedPhoneSelector,
} from '../app/selector';
import { setInCardPhone, unsetFromCardPhone } from '../features/PhonesInCard/phonesInCardSlice';
import { incrementAsync as loadPhones } from '../features/phones/phonesSlice';
import { KeyJson } from '../types/KeyJson';
import { setFavoritePhone, unsetFavoritePhone } from '../features/PhonesFavorites/phonesFavoritesSlice';

export const ProductDetailsPage: FC = () => {
  const dispatch = useAppDispatch();
  const selectedProduct = useAppSelector(selectedPhoneSelector);
  const phonesFromServer = useAppSelector(phonesSelector);
  const statusPhones = useAppSelector(phonesStatusSelector);
  const phoneDetails = useAppSelector(phonesDetailsSelector);
  const phoneDetailsStatus = useAppSelector(phonesDetaildStatusSelector);
  const cardedPhones = useAppSelector(phoneCardSelector);
  const favoritesPhones = useAppSelector(favoriteProductsSelector);
  const [brandNewModels, setBrandNewModels] = useState<Product[]>([]);
  // const location = useLocation();

  const handleCardedProducts = () => {
    if (phoneDetails && phonesFromServer) {
      const currentPhone = phonesFromServer.find(p => p.itemId === phoneDetails.id);

      if (currentPhone) {
        if (cardedPhones.some(card => card.id === currentPhone.itemId)) {
          dispatch(unsetFromCardPhone(currentPhone));
        } else {
          dispatch(setInCardPhone(currentPhone));
        }
      }
    }
  };

  const handleFavoritesProducts = () => {
    if (phoneDetails || phonesFromServer) {
      const currentPhone = phonesFromServer.find(p => p.itemId === phoneDetails?.id);

      if (currentPhone) {
        if (favoritesPhones.find(p => p.id === currentPhone.id)) {
          dispatch(unsetFavoritePhone(currentPhone));
        } else {
          dispatch(setFavoritePhone(currentPhone));
        }
      }
    }
  };

  useEffect(() => {
    dispatch(loadPhones());
    if (selectedProduct) {
      dispatch(loadPhoneDetails(selectedProduct.itemId));
    }
  }, []);

  useEffect(() => {
    if (phoneDetails && phoneDetailsStatus === AsyncStatus.IDLE) {
      window.localStorage.setItem(KeyJson.DETAILS, JSON.stringify(phoneDetails));
    }
  }, [phoneDetails]);

  useEffect(() => {
    if (statusPhones === AsyncStatus.IDLE) {
      const sortByYear = [...phonesFromServer].sort(
        (a: Product, b: Product) => b.year - a.year,
      );

      setBrandNewModels(sortByYear);
    }
  }, [phonesFromServer]);

  const isLoading = phoneDetailsStatus === AsyncStatus.LOADING
    || statusPhones === AsyncStatus.LOADING || !phoneDetails || !phonesFromServer;

  const [bigImgIndex, setBigImgIndex] = useState(0);
  const [capacityIndex, setCapacityIndex] = useState(0);

  function handleGalleryImg(index: number) {
    setBigImgIndex(index);
  }

  function handleCapacityItem(index: number) {
    setCapacityIndex(index);
  }

  return (
    <div className="product-details-page">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Breadcrumbs />
          <Link className="product-details-page__link-move-back link-move-back" to="..">
            <img className="link-move-back__arrow" src="images/icons/ArrowLeft-dark.svg" alt="Back button" />
            Back
          </Link>
          <h1 className="product-details-page__title">
            {phoneDetails.name}
          </h1>
          <section
            className="product-details-page__product-section product-section"
          >
            <div className="product-section__gallery gallery">
              <div className="gallery__small-img-container small-img-container">
                {phoneDetails.images.map((img, index) => (
                  <img
                    className="small-img-container__img"
                    src={img}
                    alt="Phoduct"
                    key={img}
                    onClick={() => handleGalleryImg(index)}
                  />
                ))}
              </div>
              <div className="gallery__big-img-container big-img-container">
                <img className="big-img-container__big-img" src={phoneDetails.images[bigImgIndex]} alt="Phoduct" />
              </div>
            </div>
            <div className="product-section__choose-section choose-section">
              <div className="choose-section__colors-picker colors-picker">
                <h2 className="colors-picker__title">Available colors</h2>
                <ul className="colors-picker__list">
                  <li className="colors-picker__items-colors items-colors">
                    <div className="items-colors__color items-colors__color--1" />
                  </li>
                  <li className="colors-picker__items-colors items-colors">
                    <div className="items-colors__color items-colors__color--2" />
                  </li>
                  <li className="colors-picker__items-colors items-colors">
                    <div className="items-colors__color items-colors__color--3" />
                  </li>
                  <li className="colors-picker__items-colors items-colors">
                    <div className="items-colors__color items-colors__color--4" />
                  </li>
                </ul>
              </div>
              <div className="choose-section__capasity-picker capasity-picker">
                <h2 className="capasity-picker__title">Select capacity</h2>
                <ul className="capasity-picker__list">
                  {phoneDetails.capacityAvailable.map((item, index) => (
                    <li
                      key={item}
                      className={classNames(
                        'capasity-picker__items ',
                        { 'capasity-picker__items--active': index === capacityIndex },
                      )}
                      onClick={() => handleCapacityItem(index)}
                    >
                      {item}
                    </li>

                  ))}
                </ul>
              </div>
              <div className="choose-section__buy-buttons buy-buttons">
                <div className="buy-buttons__prices-amount prices-amount">
                  <p className="prices-amount__price">{`${phoneDetails.priceDiscount}$`}</p>
                  <p className="prices-amount__price prices-amount__price--discount">{`${phoneDetails.priceRegular}$`}</p>
                </div>
                <div className="buy-buttons__buttons-buy-like buttons-buy-like">
                  <button
                    className={classNames(
                      'buttons-buy-like__add-to-card',
                      {
                        'buttons-buy-like__add-to-card--is-added': cardedPhones.some(
                          card => phoneDetails.id === card.value.itemId,
                        ),
                      },
                    )}
                    type="button"
                    onClick={handleCardedProducts}
                  >
                    Add to cart
                  </button>
                  <button
                    onClick={handleFavoritesProducts}
                    type="button"
                    className="buttons-buy-like__add-to-favorites add-to-favorites"
                  >
                    <img
                      className="add-to-favorites__icon"
                      src={favoritesPhones.some(p => phoneDetails.id === p.itemId) ? 'images/icons/HeartLikeFilled.svg' : 'images/icons/HeartLike.svg'}
                      alt="icon"
                    />
                  </button>
                </div>
              </div>
              <div className="choose-section__details-product details-product">
                <dl className="details-product__description-product description-product">
                  <dt className="description-product--title">Screen</dt>
                  <dd className="description-product--value">{phoneDetails.screen}</dd>
                  <dt className="description-product--title">Resolution</dt>
                  <dd className="description-product--value">{phoneDetails.resolution}</dd>
                  <dt className="description-product--title">Processor</dt>
                  <dd className="description-product--value">{phoneDetails.processor}</dd>
                  <dt className="description-product--title">RAM</dt>
                  <dd className="description-product--value">{phoneDetails.ram}</dd>
                </dl>
              </div>
            </div>
          </section>
          <section className="product-details-page__product-articles product-articles">
            <article className="product-articles__article-about article-about">
              <h2 className="article-about__title">About</h2>
              {phoneDetails.description.map(article => (
                <div key={article.title}>
                  <h3 className="article-about__sub-title">{article.title}</h3>
                  {article.text.map(text => (
                    <p className="article-about__text" key={text}>
                      {text}
                    </p>
                  ))}
                </div>
              ))}
            </article>
            <article className="product-articles__tech-specs tech-specs">
              <h2 className="tech-specs__title">Tech specs</h2>
              <dl className="tech-specs__tech-specs-list tech-specs-list">
                <dt className="tech-specs-list--title">Screen</dt>
                <dd className="tech-specs-list--value">{phoneDetails.screen}</dd>
                <dt className="tech-specs-list--title">Resolution</dt>
                <dd className="tech-specs-list--value">{phoneDetails.resolution}</dd>
                <dt className="tech-specs-list--title">Processor</dt>
                <dd className="tech-specs-list--value">{phoneDetails.processor}</dd>
                <dt className="tech-specs-list--title">RAM</dt>
                <dd className="tech-specs-list--value">{phoneDetails.ram}</dd>
                <dt className="tech-specs-list--title">Built in memory</dt>
                <dd className="tech-specs-list--value">{phoneDetails.capacity}</dd>
                <dt className="tech-specs-list--title">Camera</dt>
                <dd className="tech-specs-list--value">{phoneDetails.camera}</dd>
                <dt className="tech-specs-list--title">Zoom</dt>
                <dd className="tech-specs-list--value">{phoneDetails.zoom}</dd>
                <dt className="tech-specs-list--title">Cell</dt>
                <dd className="tech-specs-list--value">{phoneDetails.cell}</dd>
              </dl>
            </article>
          </section>
          <div className="product-details-page__you-may-like you-may-like">
            <h2 className="you-may-like__title">You may also like</h2>
            {statusPhones === AsyncStatus.IDLE && brandNewModels.length && (
              <ProductsSlider phones={brandNewModels} />
            )}
          </div>
        </>
      )}
    </div>
  );
};
