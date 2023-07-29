/* eslint-disable max-len */
import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from './components/Breadcrumbs';
import '../styles/styles.scss';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Phone } from '../types/Phone';
import { Loader } from './components/Loader';
import { ProductsSlider } from './components/ProductsSlider';
import { incrementAsync as loadPhoneDetails } from '../features/PhoneDetails/phoneDetailsSlice';
import { AsyncStatus } from '../types/AsyncStatus';

export const ProductDetailsPage: FC = () => {
  const selectedProduct = useAppSelector(state => state.selectedPhone.value);
  const [productCard, setProductCard] = useState<Phone | null>(selectedProduct);
  const phones = useAppSelector(state => state.phones.value);
  const dispatch = useAppDispatch();
  const phoneDetails = useAppSelector(state => state.phoneDetails.value);
  const phoneDetailsStatus = useAppSelector(state => state.phoneDetails.status);

  const brandNewModels = [...phones].sort(
    (a: Phone, b: Phone) => +b.year - +a.year,
  );

  useEffect(() => {
    if (selectedProduct) {
      window.localStorage.setItem(
        'productCard', JSON.stringify(selectedProduct),
      );
    }

    if (window.localStorage.getItem('productCard')) {
      const savedCard = window.localStorage.getItem('productCard') || '';

      if (savedCard.length > 0) {
        setProductCard(JSON.parse(savedCard));
      }
    }
  }, []);

  useEffect(() => {
    if (productCard) {
      dispatch(loadPhoneDetails(productCard.id));
    }
  }, [productCard]);

  const isLoading = !productCard || phoneDetailsStatus === AsyncStatus.LOADING || !phoneDetails;

  return (
    <div className="product-details-page">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Breadcrumbs productName={productCard.name} />
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
                <img className="small-img-container__img" src="img/phones/apple-iphone-11/black/00.jpg" alt="Phoduct" />
                <img className="small-img-container__img" src="img/phones/apple-iphone-11/black/00.jpg" alt="Phoduct" />
                <img className="small-img-container__img" src="img/phones/apple-iphone-11/black/00.jpg" alt="Phoduct" />
                <img className="small-img-container__img" src="img/phones/apple-iphone-11/black/00.jpg" alt="Phoduct" />
                <img className="small-img-container__img" src="img/phones/apple-iphone-11/black/00.jpg" alt="Phoduct" />
              </div>
              <div className="gallery__big-img-container big-img-container">
                <img className="big-img-container__big-img" src="img/phones/apple-iphone-11/black/00.jpg" alt="Phoduct" />
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
                  <li className="capasity-picker__items">64 GB</li>
                  <li className="capasity-picker__items">256 GB</li>
                  <li className="capasity-picker__items">512 GB</li>
                </ul>
              </div>
              <div className="choose-section__buy-buttons buy-buttons">
                <p className="buy-buttons__price">$1099</p>
                <p className="buy-buttons__price buy-buttons__price--discount">$1199</p>
                <button
                  className="buy-buttons__add-to-card"
                  type="button"
                >
                  Add to cart
                </button>
                <a
                  href="http://"
                  className="buy-buttons__add-to-favorites add-to-favorites"
                >
                  <img
                    className="add-to-favorites__icon"
                    src="images/icons/HeartLike.svg"
                    alt="icon"
                  />
                </a>
              </div>
              <div className="choose-section__description description">
                <dl className="product-card__description-phone description-phone">
                  <dt className="description-phone--title">Screen</dt>
                  <dd className="description-phone--value">6.5” OLED</dd>
                  <dt className="description-phone--title">Resolution</dt>
                  <dd className="description-phone--value">2688x1242</dd>
                  <dt className="description-phone--title">Processor</dt>
                  <dd className="description-phone--value">Apple A12 Bionic</dd>
                  <dt className="description-phone--title">RAM</dt>
                  <dd className="description-phone--value">3 GB</dd>
                </dl>
              </div>
            </div>
          </section>
          <section className="product-details-page__product-articles product-articles">
            <article className="product-articles__article-about article-about">
              <h2 className="article-about__title">About</h2>
              <h3 className="article-about__sub-title">And then there was Pro</h3>
              <p className="article-about__text">
                A transformative triple‑camera system that adds tons of capability without complexity.

                An unprecedented leap in battery life. And a mind‑blowing chip that doubles down on machine learning and pushes the boundaries of what a smartphone can do. Welcome to the first iPhone powerful enough to be called Pro.
              </p>
              <h3 className="article-about__sub-title">Camera</h3>
              <p className="article-about__text">
                Meet the first triple‑camera system to combine cutting‑edge technology with the legendary simplicity of iPhone. Capture up to four times more scene. Get beautiful images in drastically lower light. Shoot the highest‑quality video in a smartphone — then edit with the same tools you love for photos. You’ve never shot with anything like it.
              </p>
              <h3 className="article-about__sub-title">Shoot it. Flip it. Zoom it. Crop it. Cut it. Light it. Tweak it. Love it.</h3>
              <p className="article-about__text">
                iPhone 11 Pro lets you capture videos that are beautifully true to life, with greater detail and smoother motion. Epic processing power means it can shoot 4K video with extended dynamic range and cinematic video stabilization — all at 60 fps. You get more creative control, too, with four times more scene and powerful new editing tools to play with.
              </p>
            </article>
            <article className="product-articles__tech-specs">
              <dl className="tech-specs__description-product description-product">
                <dt className="description-product--title">Screen</dt>
                <dd className="description-product--value">6.5” OLED</dd>
                <dt className="description-product--title">Resolution</dt>
                <dd className="description-product--value">2688x1242</dd>
                <dt className="description-product--title">Processor</dt>
                <dd className="description-product--value">Apple A12 Bionic</dd>
                <dt className="description-product--title">RAM</dt>
                <dd className="description-product--value">3 GB</dd>
                <dt className="description-product--title">Built in memory</dt>
                <dd className="description-product--value">64 GB</dd>
                <dt className="description-product--title">Camera</dt>
                <dd className="description-product--value">12 Mp + 12 Mp + 12 Mp (Triple)</dd>
                <dt className="description-product--title">Zoom</dt>
                <dd className="description-product--value">Optical, 2x</dd>
                <dt className="description-product--title">Cell</dt>
                <dd className="description-product--value">GSM, LTE, UMTS</dd>
              </dl>
            </article>
          </section>
          <div className="product-details-page__you-may-like you-may-like">
            <h2 className="you-may-like">You may also like</h2>
            <ProductsSlider phones={brandNewModels} />
          </div>
        </>
      )}
    </div>
  );
};
