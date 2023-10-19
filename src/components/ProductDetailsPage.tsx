/* eslint-disable max-len */
import classNames from 'classnames';
import {
  useContext, useEffect, useState,
} from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useLocalStorage } from '../helpers/useLocalStorage';
import { Product } from '../types/Product';
import { CustomSlider } from './CustomSlider';
import { Gallery } from './Gallety';
import { ProductsContext } from './ProductsContext';

function getRandomItem<T>(items: T[]) {
  return Math.floor(Math.random() * items.length);
}

export const ProductDetailsPage = () => {
  const { slug } = useParams();
  const { products } = useContext(ProductsContext);
  const navigate = useNavigate();
  const product = products.find(item => item.id === slug);
  const [activeColor, setActiveColor] = useState('');
  const [activeCapacity, setActiveCapacity] = useState(0);
  const [galleryPhotos, setGalleryPhotos] = useState<string[]>([]);
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [cartProducts, save] = useLocalStorage<Product[]>('products', []);
  const [favorites, saveFav] = useLocalStorage<Product[]>('favorites', []);
  let isFavourite = false;

  const sliderProducts = [
    products[getRandomItem(products)],
    products[getRandomItem(products)],
    products[getRandomItem(products)],
    products[getRandomItem(products)],
    products[getRandomItem(products)],
  ];

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (product) {
      setGalleryPhotos([
        product.imageUrl,
        'https://placehold.jp/80x80.png',
        'https://placehold.jp/80x80.png',
        'https://placehold.jp/80x80.png',
        'https://placehold.jp/80x80.png',
      ]);
    }
  }, [product]);

  const sliderSettings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 870,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (product) {
    isFavourite = favorites.find((item: Product) => item.id === product.id);
  }

  return (
    <div className="container grid">
      {product
        ? (
          <>
            <div data-cy="breadCrumbs" className="subheader grid__item--1-10 product__subheader">
              <Link to="/">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M7.59075 0.807088C7.83149 0.619846 8.16859 0.619846 8.40933 0.807088L14.4093 5.47375C14.5717 5.60006 14.6667 5.79426 14.6667 5.99999V13.3333C14.6667 13.8638 14.456 14.3725 14.0809 14.7475C13.7058 15.1226 13.1971 15.3333 12.6667 15.3333H3.33337C2.80294 15.3333 2.29423 15.1226 1.91916 14.7475C1.54409 14.3725 1.33337 13.8638 1.33337 13.3333V5.99999C1.33337 5.79426 1.42836 5.60006 1.59075 5.47375L7.59075 0.807088ZM2.66671 6.32605V13.3333C2.66671 13.5101 2.73695 13.6797 2.86197 13.8047C2.98699 13.9298 3.15656 14 3.33337 14H12.6667C12.8435 14 13.0131 13.9298 13.1381 13.8047C13.2631 13.6797 13.3334 13.5101 13.3334 13.3333V6.32605L8.00004 2.1779L2.66671 6.32605Z" fill="#313237" />
                  <path fillRule="evenodd" clipRule="evenodd" d="M5.33337 8.00001C5.33337 7.63182 5.63185 7.33334 6.00004 7.33334H10C10.3682 7.33334 10.6667 7.63182 10.6667 8.00001V14.6667C10.6667 15.0349 10.3682 15.3333 10 15.3333C9.63185 15.3333 9.33337 15.0349 9.33337 14.6667V8.66668H6.66671V14.6667C6.66671 15.0349 6.36823 15.3333 6.00004 15.3333C5.63185 15.3333 5.33337 15.0349 5.33337 14.6667V8.00001Z" fill="#313237" />
                </svg>
              </Link>

              <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M0.528636 0.528606C0.788986 0.268256 1.2111 0.268256 1.47145 0.528606L5.47145 4.52861C5.73179 4.78896 5.73179 5.21107 5.47145 5.47141L1.47145 9.47141C1.2111 9.73176 0.788986 9.73176 0.528636 9.47141C0.268287 9.21107 0.268287 8.78896 0.528636 8.52861L4.05723 5.00001L0.528636 1.47141C0.268287 1.21107 0.268287 0.788955 0.528636 0.528606Z" fill="#B4BDC4" />
              </svg>

              {product.type === 'phone'
                && (
                  <Link to="/phones" className="subheader__text small-text product__group">
                    Phones
                  </Link>
                )}

              {product.type === 'tablet'
                && (
                  <Link to="/tablets" className="subheader__text small-text product__group">
                    Tablets
                  </Link>
                )}

              {product.type === 'accessory'
                && (
                  <Link to="/accessories" className="subheader__text small-text product__group">
                    Accessories
                  </Link>
                )}

              <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M0.528636 0.528606C0.788986 0.268256 1.2111 0.268256 1.47145 0.528606L5.47145 4.52861C5.73179 4.78896 5.73179 5.21107 5.47145 5.47141L1.47145 9.47141C1.2111 9.73176 0.788986 9.73176 0.528636 9.47141C0.268287 9.21107 0.268287 8.78896 0.528636 8.52861L4.05723 5.00001L0.528636 1.47141C0.268287 1.21107 0.268287 0.788955 0.528636 0.528606Z" fill="#B4BDC4" />
              </svg>

              <p className="subheader__text small-text">
                {product.name}
              </p>

            </div>

            <button
              data-cy="backButton"
              type="button"
              className="product__back grid__item--1-2 small-text"
              onClick={() => navigate(-1)}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M10.4712 3.52861C10.2109 3.26826 9.78878 3.26826 9.52843 3.52861L5.52843 7.52861C5.26808 7.78896 5.26808 8.21107 5.52843 8.47141L9.52843 12.4714C9.78878 12.7318 10.2109 12.7318 10.4712 12.4714C10.7316 12.2111 10.7316 11.789 10.4712 11.5286L6.94265 8.00001L10.4712 4.47141C10.7316 4.21107 10.7316 3.78896 10.4712 3.52861Z" fill="#89939A" />
              </svg>

              <div>Back</div>
            </button>

            <h1 className="product__header grid__item--1-24">{product.name}</h1>

            <Gallery photos={galleryPhotos} />

            <div data-cy="productDescription" className="product__info grid__item--14-20">
              <div className="product__colors">
                <p className="small-text">Pick a color</p>
                <div className="product__color-buttons">
                  <button
                    className={classNames(
                      'product__color',
                      { 'product__color--active': activeColor === 'skin' },
                    )}
                    type="button"
                    onClick={() => {
                      setActiveColor('skin');
                    }}
                  >
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="2" y="2" width="28" height="28" rx="14" fill="#FCDBC1" stroke="white" strokeWidth="2" />
                      <rect x="0.5" y="0.5" width="31" height="31" rx="15.5" stroke="#E2E6E9" />
                    </svg>
                  </button>
                  <button
                    className={classNames(
                      'product__color',
                      { 'product__color--active': activeColor === 'gray' },
                    )}
                    type="button"
                    onClick={() => {
                      setActiveColor('gray');
                    }}
                  >
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="2" y="2" width="28" height="28" rx="14" fill="#5F7170" stroke="white" strokeWidth="2" />
                      <rect x="0.5" y="0.5" width="31" height="31" rx="15.5" stroke="#E2E6E9" />
                    </svg>
                  </button>
                  <button
                    className={classNames(
                      'product__color',
                      { 'product__color--active': activeColor === 'black' },
                    )}
                    type="button"
                    onClick={() => {
                      setActiveColor('black');
                    }}
                  >
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="2" y="2" width="28" height="28" rx="14" fill="#4C4C4C" stroke="white" strokeWidth="2" />
                      <rect x="0.5" y="0.5" width="31" height="31" rx="15.5" stroke="#E2E6E9" />
                    </svg>
                  </button>
                  <button
                    className={classNames(
                      'product__color',
                      { 'product__color--active': activeColor === 'white' },
                    )}
                    type="button"
                    onClick={() => {
                      setActiveColor('white');
                    }}
                  >
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="2" y="2" width="28" height="28" rx="14" fill="#F0F0F0" stroke="white" strokeWidth="2" />
                      <rect x="0.5" y="0.5" width="31" height="31" rx="15.5" stroke="#E2E6E9" />
                    </svg>
                  </button>
                </div>
              </div>
              <hr className="product__line" />

              <div className="product__capacity">
                <p className="small-text">Select capacity</p>
                <div className="product__color-buttons">
                  <button
                    className={classNames(
                      'product__button button-text',
                      { 'product__button--active': activeCapacity === 64 },
                    )}
                    type="button"
                    onClick={() => {
                      setActiveCapacity(64);
                    }}
                  >
                    64 GB
                  </button>
                  <button
                    className={classNames(
                      'product__button button-text',
                      { 'product__button--active': activeCapacity === 128 },
                    )}
                    type="button"
                    onClick={() => {
                      setActiveCapacity(128);
                    }}
                  >
                    128 GB
                  </button>
                  <button
                    className={classNames(
                      'product__button button-text',
                      { 'product__button--active': activeCapacity === 256 },
                    )}
                    type="button"
                    onClick={() => {
                      setActiveCapacity(256);
                    }}
                  >
                    256 GB
                  </button>

                </div>
              </div>
              <hr className="product__line" />

              <h1 className="product__price">
                {product.discount === 0
                  && `$${product.price}`}

                {product.discount !== 0
                  && (
                    <>
                      $
                      {
                        product.price - (product.price * (product.discount / 100))
                      }
                      <span className="product__fullprice">{`$${product.price}`}</span>
                    </>
                  )}
              </h1>

              {isDuplicate
                && <p className="small-text">Product already in the cart</p>}

              <div className="slider__button-wrapper slider__button-wrapper--product">
                <button
                  type="button"
                  className="slider__button slider__button--product button-text"
                  onClick={() => {
                    for (let i = 0; i < cartProducts.length; i += 1) {
                      if (cartProducts[i].id === product.id) {
                        setIsDuplicate(true);

                        setTimeout(() => {
                          setIsDuplicate(false);
                        }, 3000);

                        return;
                      }
                    }

                    if (!isDuplicate) {
                      save([...cartProducts, product]);
                    }
                  }}
                >
                  Add to cart
                </button>

                <button
                  type="button"
                  className="slider__button--like"
                  onClick={() => {
                    if (isFavourite) {
                      const newFavorites = favorites.filter((item:Product) => item.id !== product.id);

                      saveFav([...newFavorites]);
                    } else {
                      saveFav([...favorites, product]);
                    }
                  }}
                >
                  {isFavourite
                    ? (
                      <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M9.62848 0.631356C10.1584 0.411782 10.7264 0.298767 11.3 0.298767C11.8736 0.298767 12.4416 0.411782 12.9715 0.631356C13.5014 0.85093 13.9829 1.17276 14.3884 1.57846C14.794 1.98392 15.1158 2.46531 15.3353 2.99513C15.5549 3.52505 15.6679 4.09304 15.6679 4.66665C15.6679 5.24026 15.5549 5.80825 15.3353 6.33817C15.1157 6.86805 14.794 7.34947 14.3883 7.75496C14.3883 7.755 14.3883 7.75492 14.3883 7.75496L8.49498 13.6483C8.22161 13.9217 7.77839 13.9217 7.50503 13.6483L1.61169 7.75496C0.792623 6.93589 0.332474 5.82499 0.332474 4.66665C0.332474 3.50831 0.792623 2.39741 1.61169 1.57834C2.43076 0.759273 3.54166 0.299124 4.7 0.299124C5.85834 0.299124 6.96924 0.759273 7.78831 1.57834L8 1.79003L8.21158 1.57846C8.21162 1.57842 8.21154 1.5785 8.21158 1.57846C8.61706 1.17281 9.0986 0.850909 9.62848 0.631356ZM13.3982 2.56818C13.1227 2.29255 12.7956 2.0739 12.4356 1.92472C12.0756 1.77555 11.6897 1.69877 11.3 1.69877C10.9103 1.69877 10.5244 1.77555 10.1644 1.92472C9.80436 2.0739 9.47726 2.29255 9.20176 2.56818L8.49498 3.27496C8.22161 3.54833 7.77839 3.54833 7.50503 3.27496L6.79836 2.56829C6.24184 2.01177 5.48704 1.69912 4.7 1.69912C3.91296 1.69912 3.15816 2.01177 2.60164 2.56829C2.04512 3.12481 1.73247 3.87961 1.73247 4.66665C1.73247 5.45369 2.04512 6.20849 2.60164 6.76501L8 12.1634L13.3984 6.76501C13.674 6.48951 13.8927 6.16229 14.0419 5.80227C14.1911 5.44224 14.2679 5.05635 14.2679 4.66665C14.2679 4.27695 14.1911 3.89106 14.0419 3.53103C13.8927 3.17101 13.6739 2.84367 13.3982 2.56818Z" fill="#EB5757" />
                      </svg>
                    )
                    : (
                      <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M9.62848 0.631356C10.1584 0.411782 10.7264 0.298767 11.3 0.298767C11.8736 0.298767 12.4416 0.411782 12.9715 0.631356C13.5014 0.85093 13.9829 1.17276 14.3884 1.57846C14.794 1.98392 15.1158 2.46531 15.3353 2.99513C15.5549 3.52505 15.6679 4.09304 15.6679 4.66665C15.6679 5.24026 15.5549 5.80825 15.3353 6.33817C15.1157 6.86805 14.794 7.34947 14.3883 7.75496C14.3883 7.755 14.3883 7.75492 14.3883 7.75496L8.49498 13.6483C8.22161 13.9217 7.77839 13.9217 7.50503 13.6483L1.61169 7.75496C0.792623 6.93589 0.332474 5.82499 0.332474 4.66665C0.332474 3.50831 0.792623 2.39741 1.61169 1.57834C2.43076 0.759273 3.54166 0.299124 4.7 0.299124C5.85834 0.299124 6.96924 0.759273 7.78831 1.57834L8 1.79003L8.21158 1.57846C8.21162 1.57842 8.21154 1.5785 8.21158 1.57846C8.61706 1.17281 9.0986 0.850909 9.62848 0.631356ZM13.3982 2.56818C13.1227 2.29255 12.7956 2.0739 12.4356 1.92472C12.0756 1.77555 11.6897 1.69877 11.3 1.69877C10.9103 1.69877 10.5244 1.77555 10.1644 1.92472C9.80436 2.0739 9.47726 2.29255 9.20176 2.56818L8.49498 3.27496C8.22161 3.54833 7.77839 3.54833 7.50503 3.27496L6.79836 2.56829C6.24184 2.01177 5.48704 1.69912 4.7 1.69912C3.91296 1.69912 3.15816 2.01177 2.60164 2.56829C2.04512 3.12481 1.73247 3.87961 1.73247 4.66665C1.73247 5.45369 2.04512 6.20849 2.60164 6.76501L8 12.1634L13.3984 6.76501C13.674 6.48951 13.8927 6.16229 14.0419 5.80227C14.1911 5.44224 14.2679 5.05635 14.2679 4.66665C14.2679 4.27695 14.1911 3.89106 14.0419 3.53103C13.8927 3.17101 13.6739 2.84367 13.3982 2.56818Z" fill="#b4bdc3" />
                      </svg>
                    )}

                </button>
              </div>

              <div className="product__data">
                <p className="product__data-name small-text">Screen</p>
                <p className="product__data-value small-text">{product.screen}</p>
              </div>

              <div className="product__data">
                <p className="product__data-name small-text">Resolution</p>
                <p className="product__data-value small-text">N * N px</p>
              </div>

              <div className="product__data">
                <p className="product__data-name small-text">Processor</p>
                <p className="product__data-value small-text">Some processor</p>
              </div>

              <div className="product__data">
                <p className="product__data-name small-text">Ram</p>
                <p className="product__data-value small-text">{product.ram}</p>
              </div>
            </div>

            <div className="product__about grid__item--1-12">
              <h2 className="product__about-title">About</h2>
              <hr className="product__line" />
              <p className="product__text body-text">{product.snippet}</p>
            </div>

            <div className="product__tech grid__item--14-24">
              <h2 className="product__about-title">Tech specs</h2>
              <hr className="product__line" />
              <div className="product__data">
                <p className="product__data-name small-text">Screen</p>
                <p className="product__data-value small-text">{product.screen}</p>
              </div>

              <div className="product__data">
                <p className="product__data-name small-text">Resolution</p>
                <p className="product__data-value small-text">N * N px</p>
              </div>

              <div className="product__data">
                <p className="product__data-name small-text">Processor</p>
                <p className="product__data-value small-text">Some processor</p>
              </div>

              <div className="product__data">
                <p className="product__data-name small-text">Built in memory</p>
                <p className="product__data-value small-text">{`${activeCapacity} GB`}</p>
              </div>

              <div className="product__data">
                <p className="product__data-name small-text">Camera</p>
                <p className="product__data-value small-text">Some camera</p>
              </div>

              <div className="product__data">
                <p className="product__data-name small-text">Zoom</p>
                <p className="product__data-value small-text">Some zoom</p>
              </div>

              <div className="product__data">
                <p className="product__data-name small-text">Cell</p>
                <p className="product__data-value small-text">GSM, LTE, UMTS</p>
              </div>

              <div className="product__data">
                <p className="product__data-name small-text">Ram</p>
                <p className="product__data-value small-text">{product.ram}</p>
              </div>
            </div>

            <div className="product__slider grid__item--1-24">
              <CustomSlider
                products={sliderProducts}
                settings={sliderSettings}
                title="You may also like"
              />
            </div>
          </>
        )
        : <h1>Whoops... Something went wrong</h1>}
    </div>
  );
};
