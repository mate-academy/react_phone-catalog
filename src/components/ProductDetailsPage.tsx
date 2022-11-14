/* eslint-disable max-len */
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import classNames from 'classnames';
import { useLocalStorage } from '../helpers/useLocalStorage';
import { ProductsContext } from './ProductsContext';
import { Gallery } from './Gallery';
import { CustomSlider } from './CustomSlider';
import { Product } from '../types/Product';

function getRandomItem<T>(items: T[]) {
  return Math.floor(Math.random() * items.length);
}

export const ProductDetailsPage = () => {
  const { products } = useContext(ProductsContext);
  const { slug } = useParams();
  const navigate = useNavigate();
  const product = products.find(prod => prod.id === slug);
  const [activeColor, setActiveColor] = useState('');
  const [activeCapacity, setActiveCapacity] = useState(0);
  const [galleryPhotos, setGalleryPhotos] = useState<string[]>([]);
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [cartProducts, save] = useLocalStorage<Product[]>('products', []);
  const [favorites, saveFavorite] = useLocalStorage<Product[]>('favorites', []);
  let inCart = false;
  let isFavourite = false;

  if (product) {
    for (let i = 0; i < cartProducts.length; i += 1) {
      if (cartProducts[i].length === product.id) {
        inCart = true;

        break;
      }
    }
  }

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
    isFavourite = favorites.find((fav: Product) => fav.id === product.id);
  }

  return (
    <div className="container grid">
      {product
        ? (
          <>
            <div
              className="subheader product__subheader grid__item--1-10"
              data-cy="breadCrumbs"
            >
              <Link to="/">
                <img src="img/svg/home.svg" alt="Home" />
              </Link>

              <img src="img/svg/home.svg" alt="Home" />

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

              <img src="img/svg/arrow-right.svg" alt="Arrow right" />

              <p className="subheader__text small-text">
                {product.name}
              </p>

            </div>

            <button
              type="button"
              data-cy="backButton"
              className="product__back grid__item--1-2 small-text"
              onClick={() => navigate(-1)}
            >
              <img src="img/svg/arrow-left-grey.svg" alt="Arrow left" />

              <div>Back</div>
            </button>

            <h1 className="product__header grid__item--1-24">{product.name}</h1>

            <Gallery photos={galleryPhotos} />

            <div data-cy="productDescription" className="product__info grid__item--14-20">
              <div className="product__colours">
                <p className="small-text">Pick a color</p>
                <div className="product__color-buttons">
                  <button
                    type="button"
                    className={classNames(
                      'product__color',
                      { 'product__color--active': activeColor === 'skin' },
                    )}
                    onClick={() => {
                      setActiveColor('skin');
                    }}
                  >
                    <img src="img/svg/color-skin.svg" alt="Skin" />
                  </button>

                  <button
                    type="button"
                    className={classNames(
                      'product__color',
                      { 'product__color--active': activeColor === 'gray' },
                    )}
                    onClick={() => {
                      setActiveColor('gray');
                    }}
                  >
                    <img src="img/svg/color-grey.svg" alt="Gray" />
                  </button>

                  <button
                    type="button"
                    className={classNames(
                      'product__color',
                      { 'product__color--active': activeColor === 'black' },
                    )}
                    onClick={() => {
                      setActiveColor('black');
                    }}
                  >
                    <img src="img/svg/color-black.svg" alt="Black" />
                  </button>

                  <button
                    type="button"
                    className={classNames(
                      'product__color',
                      { 'product__color--active': activeColor === 'white' },
                    )}
                    onClick={() => {
                      setActiveColor('white');
                    }}
                  >
                    <img src="img/svg/color-white.svg" alt="White" />
                  </button>
                </div>
              </div>

              <hr className="product__line" />

              <div className="product__capacity">
                <p className="small-text">Select capacity</p>
                <div className="product__color-buttons">
                  <button
                    type="button"
                    className={classNames(
                      'product__button button-text',
                      { 'product__button--active': activeCapacity === 64 },
                    )}
                    onClick={() => {
                      setActiveCapacity(64);
                    }}
                  >
                    64 GB
                  </button>

                  <button
                    type="button"
                    className={classNames(
                      'product__button button-text',
                      { 'product__button--active': activeCapacity === 256 },
                    )}
                    onClick={() => {
                      setActiveCapacity(256);
                    }}
                  >
                    256 GB
                  </button>

                  <button
                    type="button"
                    className={classNames(
                      'product__button button-text',
                      { 'product__button--active': activeCapacity === 512 },
                    )}
                    onClick={() => {
                      setActiveCapacity(512);
                    }}
                  >
                    512 GB
                  </button>
                </div>
              </div>

              <hr className="product__line" />

              <h1 className="product__price">
                {product?.discount === 0
              && `$${product.price}`}

                {product?.discount !== 0
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
                  className={classNames(
                    'button-text slider__button slider__button--product',
                    { slider__button: !inCart },
                    { 'slider__button--active': inCart },
                  )}
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
                  {inCart
                    ? 'Added to cart'
                    : 'Add to cart' }
                </button>

                <button
                  type="button"
                  className="slider__button--like"
                  onClick={() => {
                    if (isFavourite) {
                      const newFavorites = favorites.filter((fav: Product) => fav.id !== product.id);

                      saveFavorite([newFavorites]);
                    } else {
                      saveFavorite([favorites, product]);
                    }
                  }}
                >
                  {isFavourite
                    ? (
                      <img src="img/svg/heart-red.svg" alt="Heart" />
                    )
                    : (
                      <img src="img/svg/heart-grey.svg" alt="Heart" />
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
                <p className="product__data-value small-text">Processor</p>
              </div>

              <div className="product__data">
                <p className="product__data-name small-text">RAM</p>
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
                <p className="product__data-value small-text">Processor</p>
              </div>

              <div className="product__data">
                <p className="product__data-name small-text">RAM</p>
                <p className="product__data-value small-text">{product.ram}</p>
              </div>

              <div className="product__data">
                <p className="product__data-name small-text">Built in memory</p>
                <p className="product__data-value small-text">{`${activeCapacity} GB`}</p>
              </div>

              <div className="product__data">
                <p className="product__data-name small-text">Camera</p>
                <p className="product__data-value small-text">Camera</p>
              </div>

              <div className="product__data">
                <p className="product__data-name small-text">Zoom</p>
                <p className="product__data-value small-text">Zoom</p>
              </div>

              <div className="product__data">
                <p className="product__data-name small-text">Cell</p>
                <p className="product__data-value small-text">GSM, LTE, UMTS</p>
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
        : <h1>Something went wrong</h1>}
    </div>
  );
};
