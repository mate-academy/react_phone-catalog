import classNames from 'classnames';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  useState,
  useEffect,
  useContext,
  Fragment,
} from 'react';
import { BreadCrumbs } from '../../components/BreadCrumbs/BreadCrumbs';
import { BackButton } from '../../components/BackButton/BackButton';

import { Product } from '../../types/Product';
import { PhoneDetails } from '../../types/Phone';

import {
  getAllProducts,
  getPhoneDetails,
  getShuffleProducts,
} from '../../helpers/FetchProducts';
import { Loader } from '../../components/Loader/Loader';
import './ProductDetailsPage.scss';

import { CartContext } from '../../contexts/cartContext';
import { FavouritesContext } from '../../contexts/favoritesContext';

import FavouritesFilled from '../../Images/Icons/FavouritesFilled.svg';
import FavouritesHeartLike from '../../Images/Icons/FavouritesHeartLike.svg';

import { ProductsSlider } from '../../components/ProductsSlider/ProductsSlider';

export interface ColorsType {
  [key: string]: string;
}

export const colorDictionary: ColorsType = {
  black: '#1F2020',
  coral: '#EE7762',
  gold: '#F9E5C9',
  green: '#AEE1CD',
  midnightgreen: '#004953',
  purple: '#e5ddea',
  red: '#BA0C2E',
  rosegold: '#E6C7C2',
  silver: '#e2e4e1',
  spacegray: '#535150',
  white: '#F8F7F2',
  yellow: '#F3D060',
};

export const ProductDetailsPage = () => {
  const { isInCart, handleCart } = useContext(CartContext);
  const { isInFavorites, handleFavorites } = useContext(FavouritesContext);

  const location = useLocation();
  const { pathname } = location;
  const productAdress = pathname.split('/').filter((item) => item !== '');
  const productId = productAdress[productAdress.length - 1];
  const [productInfo, setProductInfo] = useState<Product | null>(null);
  const [details, setDetails] = useState<PhoneDetails | null>(null);
  const [products, setProducts] = useState<Product[] | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState('');
  const navigate = useNavigate();

  const handleImageChange = (image: string) => {
    setCurrentImage(image);
  };

  const handleColorChange = (color: string) => {
    const Url = `/${productInfo?.category}/${details?.namespaceId}-${details?.capacity}-${color}`.toLowerCase();

    navigate(Url);
  };

  const handleCapacityChange = (capacity: string) => {
    const Url = `/${productInfo?.category}/${details?.namespaceId}-${capacity}-${details?.color}`.toLowerCase();

    navigate(Url);
  };

  useEffect(() => {
    async function getData() {
      try {
        const phoneDetails = await getPhoneDetails(productId || '');

        if (!phoneDetails) {
          setError('Product details were not found...');

          return;
        }

        setDetails(phoneDetails);
        setCurrentImage(phoneDetails.images[0]);

        const phones = await getAllProducts();
        const phoneInfo = phones.find(
          (phone) => phone.phoneId === phoneDetails.id,
        );

        if (!phoneInfo) {
          setError('Could not find exact product...');

          return;
        }

        setProductInfo(phoneInfo);
      } finally {
        setIsLoading(false);
      }
    }

    getData();
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const shuffledProducts = await getShuffleProducts();

        setProducts(shuffledProducts);
      } catch (err) {
        setError('Could not find exact product...');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="product-details">
      <div className="product-details__navigation" data-cy="breadCrumbs">
        <BreadCrumbs productName={details?.name || '???'} />
      </div>

      <section className="product-details__back-button">
        <BackButton />
      </section>

      {!details || !productInfo || error ? (
        <div className="product-details__error">
          <h1 className="product-details__error-title">{error}</h1>
          <p className="product-details__error-description">
            Something went wrong...
          </p>
        </div>
      ) : (
        <>
          <section
            className="product-details__section
            product-details__section--small"
          >
            <h1 className="product-details__title">{details.name}</h1>
          </section>

          <section className="product-details__section">
            <div className="product-details__grid">
              <div className="product-details__small-photos">
                {details.images.map((image) => (
                  <div
                    key={image}
                    className={classNames(
                      'product-details__small-photo-container',
                      {
                        'product-details__small-photo-container--selected':
                          image === currentImage,
                      },
                    )}
                    onClick={() => handleImageChange(image)}
                    aria-hidden
                  >
                    <img
                      className="product-details__photo"
                      src={image}
                      alt={image}
                    />
                  </div>
                ))}
              </div>

              <div className="product-details__big-photo-container">
                <img
                  className="product-details__photo"
                  src={currentImage}
                  alt={currentImage}
                />
              </div>

              <div className="product-details__actions">
                <div className="product-details__colors">
                  <p className="product-details__actions-title">
                    Available colors
                  </p>

                  <div className="product-details__colors-container">
                    {details.colorsAvailable.map((color) => (
                      <button
                        key={color}
                        type="button"
                        className={classNames(
                          'product-details__colors-button',
                          {
                            'product-details__colors-button--selected':
                              color === details.color,
                          },
                        )}
                        style={{
                          backgroundColor: colorDictionary[color],
                        }}
                        aria-label="change-color"
                        onClick={() => handleColorChange(color)}
                      />
                    ))}
                  </div>
                </div>

                <div className="product-details__underline" />

                <div className="product-details__capacity">
                  <p className="product-details__actions-title">
                    Select capacity
                  </p>

                  <div className="product-details__capacity-button-container">
                    {details.capacityAvailable.map((capacity) => (
                      <button
                        key={capacity}
                        type="button"
                        className={classNames(
                          'product-details__capacity-button',
                          {
                            'product-details__capacity-button--selected':
                              capacity === details.capacity,
                          },
                        )}
                        onClick={() => handleCapacityChange(capacity)}
                      >
                        {capacity}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="product-details__underline" />

                <div className="product-details__price">
                  <span className="product-details__price-new">
                    {`$${details.priceDiscount}`}
                  </span>

                  <span className="product-details__price-old">
                    {`$${details.priceRegular}`}
                  </span>
                </div>

                <div className="product-details__buttons">
                  <button
                    type="button"
                    className={classNames('product-details__button-add-cart', {
                      'product-details__button-add-cart--added':
                        isInCart(productInfo),
                    })}
                    onClick={() => handleCart(productInfo)}
                  >
                    {isInCart(productInfo) ? 'Added to cart' : 'Add to cart'}
                  </button>

                  <button
                    type="button"
                    className={classNames('product-details__button-favorites', {
                      'product-details__button-favorites--added':
                        isInFavorites(productInfo),
                    })}
                    data-cy="addToFavorite"
                    onClick={() => handleFavorites(productInfo)}
                  >
                    {isInFavorites(productInfo) ? (
                      <img src={FavouritesFilled} alt="FavouritesFilled" />
                    ) : (
                      <img
                        src={FavouritesHeartLike}
                        alt="FavouritesHeartLike"
                      />
                    )}
                  </button>
                </div>

                <ul className="product-details__actions-description">
                  <li className="product-details__actions-description-box">
                    <span
                      className="product-details__actions-description-title"
                    >
                      Screen
                    </span>

                    <span
                      className="product-details__actions-description-value"
                    >
                      {details.screen}
                    </span>
                  </li>

                  <li className="product-details__actions-description-box">
                    <span
                      className="product-details__actions-description-title"
                    >
                      Resolution
                    </span>

                    <span
                      className="product-details__actions-description-value"
                    >
                      {details.resolution}
                    </span>
                  </li>

                  <li className="product-details__actions-description-box">
                    <span
                      className="product-details__actions-description-title"
                    >
                      Processor
                    </span>

                    <span
                      className="product-details__actions-description-value"
                    >
                      {details.processor}
                    </span>
                  </li>

                  <li className="product-details__actions-description-box">
                    <span
                      className="product-details__actions-description-title"
                    >
                      RAM
                    </span>

                    <span
                      className="product-details__actions-description-value"
                    >
                      {details.ram}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section className="product-details__section">
            <div className="product-details__grid">
              <div className="product-details__about">
                <h2 className="product-details__second-title">About</h2>

                <div className="product-details__underline" />

                <div className="product-details__about-description">
                  {details.description.map(article => (
                    <article
                      key={article.title}
                      className="product-details__about-article"
                    >
                      <h3 className="product-details__third-title">
                        {article.title}
                      </h3>
                      {article.text.map((text) => (
                        <p className="product-details__about-text" key={text}>
                          {text}
                        </p>
                      ))}
                    </article>
                  ))}
                </div>
              </div>

              <div className="product-details__tech">
                <h2 className="product-details__second-title">Tech specs</h2>

                <div className="product-details__underline" />

                <ul className="product-details__tech-list">
                  <li className="product-details__tech-item">
                    <span className="product-details__tech-title">Screen</span>

                    <span className="product-details__tech-text">
                      {details.screen}
                    </span>
                  </li>

                  <li className="product-details__tech-item">
                    <span className="product-details__tech-title">
                      Resolution
                    </span>

                    <span className="product-details__tech-text">
                      {details.resolution}
                    </span>
                  </li>

                  <li className="product-details__tech-item">
                    <span className="product-details__tech-title">
                      Processor
                    </span>

                    <span className="product-details__tech-text">
                      {details.processor}
                    </span>
                  </li>

                  <li className="product-details__tech-item">
                    <span className="product-details__tech-title">RAM</span>

                    <span className="product-details__tech-text">
                      {details.ram}
                    </span>
                  </li>

                  <li className="product-details__tech-item">
                    <span className="product-details__tech-title">
                      Built in memory
                    </span>

                    <span className="product-details__tech-text">
                      {details.capacity}
                    </span>
                  </li>

                  <li className="product-details__tech-item">
                    <span className="product-details__tech-title">Camera</span>

                    <span className="product-details__tech-text">
                      {details.camera}
                    </span>
                  </li>

                  <li className="product-details__tech-item">
                    <span className="product-details__tech-title">Zoom</span>

                    <span className="product-details__tech-text">
                      {details.zoom}
                    </span>
                  </li>

                  <li className="product-details__tech-item">
                    <span className="product-details__tech-title">Cell</span>

                    <span className="product-details__tech-text">
                      {details.cell.map((cells, ind) => (
                        <Fragment key={cells}>
                          {ind !== details.cell.length - 1
                            ? `${cells}, `
                            : cells}
                        </Fragment>
                      ))}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </>
      )}

      <section className="product-slider__section">
        {products && (
          <ProductsSlider title="You may also like" products={products} />
        )}
      </section>
    </section>
  );
};
