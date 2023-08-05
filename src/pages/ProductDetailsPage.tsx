/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable max-len */
import { FC, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import Breadcrumbs from './components/Breadcrumbs';
import '../styles/styles.scss';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Product } from '../types/Product';
import { Loader } from './components/Loader';
import { incrementAsync as loadPhoneDetails } from '../features/PhoneDetails/phoneDetailsSlice';
import { AsyncStatus } from '../types/AsyncStatus';
import { ProductsSlider } from './components/ProductsSlider';
import { PhoneDetails } from '../types/PhoneDetails';
import {
  phonesDetaildStatusSelector,
  phonesDetailsSelector,
  phonesSelector,
  phonesStatusSelector,
  selectedPhoneSelector,
} from '../app/selector';
import { setInCardPhone, unsetFromCardPhone } from '../features/PhonesInCard/phonesInCardSlice';
import { KeyJson, SavedCard } from './CardPage';
import { incrementAsync } from '../features/phones/phonesSlice';

export const ProductDetailsPage: FC = () => {
  const dispatch = useAppDispatch();
  const selectedProduct = useAppSelector(selectedPhoneSelector);
  const phonesFromServer = useAppSelector(phonesSelector);
  const statusPhones = useAppSelector(phonesStatusSelector);
  const phoneDetails = useAppSelector(phonesDetailsSelector);
  const phoneDetailsStatus = useAppSelector(phonesDetaildStatusSelector);
  const [productDetails, setProductDetails] = useState<PhoneDetails | null>(() => {
    const storedValue = window.localStorage.getItem(KeyJson.DETAILS);

    if (storedValue !== null) {
      return JSON.parse(storedValue);
    }

    return null;
  });

  const [brandNewModels, setBrandNewModels] = useState<Product[]>([]);
  const location = useLocation();
  const [isCarded, setIsCarded] = useState<boolean>(() => {
    const savedCardJSON = window.localStorage.getItem(KeyJson.CARD);

    if (savedCardJSON) {
      return JSON.parse(savedCardJSON).some(
        (card: SavedCard) => phoneDetails?.id === card.value.id,
      );
    }

    return false;
  });

  const handleCardedProducts = () => {
    setIsCarded(prev => !prev);
    const savedCardsJSON = window.localStorage.getItem(KeyJson.CARD);

    if (savedCardsJSON && selectedProduct) {
      const savedCards = JSON.parse(savedCardsJSON);

      if (savedCards.find((card: SavedCard) => card.id === selectedProduct?.id)) {
        const newsavedCards = savedCards.filter((card: SavedCard) => card.id !== selectedProduct?.id);

        dispatch(unsetFromCardPhone(selectedProduct));
        window.localStorage.setItem(KeyJson.CARD, JSON.stringify(newsavedCards));
      } else {
        const newSave = {
          id: selectedProduct.id,
          amount: 1,
          value: selectedProduct,
        };

        if (selectedProduct) {
          dispatch(setInCardPhone(selectedProduct));
        }

        window.localStorage.setItem(KeyJson.CARD, JSON.stringify([...savedCards, newSave]));
      }
    } else {
      const phone = phonesFromServer.find((p: Product) => p.id === selectedProduct?.id);

      if (selectedProduct) {
        dispatch(setInCardPhone(selectedProduct));
      }

      window.localStorage.setItem(KeyJson.CARD, JSON.stringify({
        id: 1,
        amount: 1,
        value: phone,
      }));
    }
  };

  useEffect(() => {
    dispatch(incrementAsync());
  }, []);

  useEffect(() => {
    if (phonesFromServer.length > 0) {
      const res = [...phonesFromServer].sort(
        (a: Product, b: Product) => +b.year - +a.year,
      );

      setBrandNewModels(res);
    }
  }, [phonesFromServer]);

  useEffect(() => {
    if (selectedProduct !== null) {
      dispatch(loadPhoneDetails(selectedProduct.phoneId));
    }
  }, [location.pathname.split('/')[2]]);

  useEffect(() => {
    if (phoneDetailsStatus === AsyncStatus.IDLE
      && Array.isArray(phoneDetails) === false
      && phoneDetails !== null) {
      window.localStorage.setItem(KeyJson.DETAILS, JSON.stringify(phoneDetails));
      if (window.localStorage.getItem(KeyJson.DETAILS)) {
        const savedCard = window.localStorage.getItem(KeyJson.DETAILS);

        if (savedCard) {
          setProductDetails(JSON.parse(savedCard));
        }
      }
    }
  }, [phoneDetails]);

  const isLoadingLoad = phoneDetailsStatus === AsyncStatus.LOADING
    || !productDetails
    || !phoneDetails
    || statusPhones === AsyncStatus.LOADING;

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
      {isLoadingLoad ? (
        <Loader />
      ) : (
        <>
          <Breadcrumbs />
          <Link className="product-details-page__link-move-back link-move-back" to="..">
            <img className="link-move-back__arrow" src="images/icons/ArrowLeft-dark.svg" alt="Back button" />
            Back
          </Link>
          <h1 className="product-details-page__title">
            {productDetails.name}
          </h1>
          <section
            className="product-details-page__product-section product-section"
          >
            <div className="product-section__gallery gallery">
              <div className="gallery__small-img-container small-img-container">
                {productDetails.images.map((img, index) => (
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
                <img className="big-img-container__big-img" src={productDetails.images[bigImgIndex]} alt="Phoduct" />
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
                  {productDetails.capacityAvailable.map((item, index) => (
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
                  <p className="prices-amount__price">{`${productDetails.priceDiscount}$`}</p>
                  <p className="prices-amount__price prices-amount__price--discount">{`${productDetails.priceRegular}$`}</p>
                </div>
                <div className="buy-buttons__buttons-buy-like buttons-buy-like">
                  <button
                    className={classNames(
                      'buttons-buy-like__add-to-card',
                      { 'buttons-buy-like__add-to-card--is-added': isCarded },
                    )}
                    type="button"
                    onClick={handleCardedProducts}
                  >
                    Add to cart
                  </button>
                  <a
                    href="http://"
                    className="buttons-buy-like__add-to-favorites add-to-favorites"
                  >
                    <img
                      className="add-to-favorites__icon"
                      src="images/icons/HeartLike.svg"
                      alt="icon"
                    />
                  </a>
                </div>
              </div>
              <div className="choose-section__details-product details-product">
                <dl className="details-product__description-product description-product">
                  <dt className="description-product--title">Screen</dt>
                  <dd className="description-product--value">{productDetails.screen}</dd>
                  <dt className="description-product--title">Resolution</dt>
                  <dd className="description-product--value">{productDetails.resolution}</dd>
                  <dt className="description-product--title">Processor</dt>
                  <dd className="description-product--value">{productDetails.processor}</dd>
                  <dt className="description-product--title">RAM</dt>
                  <dd className="description-product--value">{productDetails.ram}</dd>
                </dl>
              </div>
            </div>
          </section>
          <section className="product-details-page__product-articles product-articles">
            <article className="product-articles__article-about article-about">
              <h2 className="article-about__title">About</h2>
              {productDetails.description.map(article => (
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
                <dd className="tech-specs-list--value">{productDetails.screen}</dd>
                <dt className="tech-specs-list--title">Resolution</dt>
                <dd className="tech-specs-list--value">{productDetails.resolution}</dd>
                <dt className="tech-specs-list--title">Processor</dt>
                <dd className="tech-specs-list--value">{productDetails.processor}</dd>
                <dt className="tech-specs-list--title">RAM</dt>
                <dd className="tech-specs-list--value">{productDetails.ram}</dd>
                <dt className="tech-specs-list--title">Built in memory</dt>
                <dd className="tech-specs-list--value">{productDetails.capacity}</dd>
                <dt className="tech-specs-list--title">Camera</dt>
                <dd className="tech-specs-list--value">{productDetails.camera}</dd>
                <dt className="tech-specs-list--title">Zoom</dt>
                <dd className="tech-specs-list--value">{productDetails.zoom}</dd>
                <dt className="tech-specs-list--title">Cell</dt>
                <dd className="tech-specs-list--value">{productDetails.cell}</dd>
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
