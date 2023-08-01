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

export const ProductDetailsPage: FC = () => {
  const selectedProduct = useAppSelector(state => state.selectedPhone.value);
  const phones = useAppSelector(state => state.phones.value);
  const statusPhone = useAppSelector(state => state.phones.status);
  const dispatch = useAppDispatch();
  const phoneDetails = useAppSelector(state => state.phoneDetails.value);
  const phoneDetailsStatus = useAppSelector(state => state.phoneDetails.status);
  const [productCard, setProductCard] = useState<PhoneDetails | null>(() => {
    const storedValue = window.localStorage.getItem('productCard');

    if (storedValue !== null) {
      return JSON.parse(storedValue);
    }

    return null;
  });

  const [brandNewModels, setBrandNewModels] = useState<Product[]>([]);
  const location = useLocation();

  useEffect(() => {
    if (selectedProduct !== null) {
      dispatch(loadPhoneDetails(selectedProduct.phoneId));
    }
  }, []);

  useEffect(() => {
    if (phones.length > 0) {
      const res = [...phones].sort(
        (a: Product, b: Product) => +b.year - +a.year,
      );

      setBrandNewModels(res);
    }
  }, [phones]);

  useEffect(() => {
    if (selectedProduct !== null) {
      dispatch(loadPhoneDetails(selectedProduct.phoneId));
    }
  }, [location.pathname.split('/')[2]]);

  useEffect(() => {
    if (phoneDetailsStatus === AsyncStatus.IDLE && Array.isArray(phoneDetails) === false && phoneDetails !== null) {
      window.localStorage.setItem('productCard', JSON.stringify(phoneDetails));
      if (window.localStorage.getItem('productCard')) {
        const savedCard = window.localStorage.getItem('productCard');

        if (savedCard) {
          setProductCard(JSON.parse(savedCard));
        }
      }
    }
  }, [phoneDetails]);

  const isLoading = phoneDetailsStatus === AsyncStatus.LOADING || !productCard || !phoneDetails || statusPhone === AsyncStatus.LOADING;

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
            {productCard.name}
          </h1>
          <section
            className="product-details-page__product-section product-section"
          >
            <div className="product-section__gallery gallery">
              <div className="gallery__small-img-container small-img-container">
                {productCard.images.map((img, index) => (
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
                <img className="big-img-container__big-img" src={productCard.images[bigImgIndex]} alt="Phoduct" />
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
                  {productCard.capacityAvailable.map((item, index) => (
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
                  <p className="prices-amount__price">{`${productCard.priceDiscount}$`}</p>
                  <p className="prices-amount__price prices-amount__price--discount">{`${productCard.priceRegular}$`}</p>
                </div>
                <div className="buy-buttons__buttons-buy-like buttons-buy-like">
                  <button
                    className="buttons-buy-like__add-to-card"
                    type="button"
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
                  <dd className="description-product--value">{productCard.screen}</dd>
                  <dt className="description-product--title">Resolution</dt>
                  <dd className="description-product--value">{productCard.resolution}</dd>
                  <dt className="description-product--title">Processor</dt>
                  <dd className="description-product--value">{productCard.processor}</dd>
                  <dt className="description-product--title">RAM</dt>
                  <dd className="description-product--value">{productCard.ram}</dd>
                </dl>
              </div>
            </div>
          </section>
          <section className="product-details-page__product-articles product-articles">
            <article className="product-articles__article-about article-about">
              <h2 className="article-about__title">About</h2>
              {productCard.description.map(article => (
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
                <dd className="tech-specs-list--value">{productCard.screen}</dd>
                <dt className="tech-specs-list--title">Resolution</dt>
                <dd className="tech-specs-list--value">{productCard.resolution}</dd>
                <dt className="tech-specs-list--title">Processor</dt>
                <dd className="tech-specs-list--value">{productCard.processor}</dd>
                <dt className="tech-specs-list--title">RAM</dt>
                <dd className="tech-specs-list--value">{productCard.ram}</dd>
                <dt className="tech-specs-list--title">Built in memory</dt>
                <dd className="tech-specs-list--value">{productCard.capacity}</dd>
                <dt className="tech-specs-list--title">Camera</dt>
                <dd className="tech-specs-list--value">{productCard.camera}</dd>
                <dt className="tech-specs-list--title">Zoom</dt>
                <dd className="tech-specs-list--value">{productCard.zoom}</dd>
                <dt className="tech-specs-list--title">Cell</dt>
                <dd className="tech-specs-list--value">{productCard.cell}</dd>
              </dl>
            </article>
          </section>
          <div className="product-details-page__you-may-like you-may-like">
            <h2 className="you-may-like__title">You may also like</h2>
            {statusPhone === AsyncStatus.IDLE && brandNewModels.length && (
              <ProductsSlider phones={brandNewModels} />
            )}
          </div>
        </>
      )}
    </div>
  );
};
