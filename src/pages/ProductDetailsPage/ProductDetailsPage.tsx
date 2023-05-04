import classNames from 'classnames';
import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  getProductById,
  getProductDetails,
  getSuggestedProducts,
} from '../../api';
import { Loader } from '../../components/Loader';
import { Slider } from '../../components/Slider';
import {
  capacities,
  colors,
  onBackClicked,
  scrollTop,
} from '../../helpers/consts';
import {
  ReactComponent as IconArrowRight,
} from '../../images/icons/arrow_right.svg';
import { ReactComponent as IconHome } from '../../images/icons/home.svg';
import { Product } from '../../types/Product';
import { ProductDetails } from '../../types/ProductDetails';
import { NotFoundPage } from '../NotFoundPage';
import './ProductDetailsPage.scss';

import { ShopContext } from '../../cart-context';
import {
  ReactComponent as IconHeartActive,
} from '../../images/icons/heart_like-active.svg';
import {
  ReactComponent as IconHeart,
} from '../../images/icons/heart_like.svg';

export const ProductDetailsPage: React.FC = () => {
  const {
    addToCart,
    cartItems,
    favouritesItems,
    addToFavourites,
    removeFromFavourites,
  } = useContext(ShopContext);

  const { productId = '' } = useParams();
  const [productDetails, setProductDetails] = useState<ProductDetails | null>(
    null,
  );
  const [product, setProduct] = useState<Product | null>(null);
  const [mainImage, setMainImage] = useState('');

  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const suggestedProductsData = await getSuggestedProducts();

        setSuggestedProducts(suggestedProductsData);

        setTimeout(() => setIsLoading(false), 250);
      } catch {
        if (!suggestedProducts.length) {
          setSuggestedProducts([]);
        }
      }
    };

    fetchData();
  }, [productId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productDetailsData = await getProductDetails(productId);
        const productData = await getProductById(productId);

        setProductDetails(productDetailsData);

        setProduct(productData || null);

        setMainImage(productDetailsData.images[0]);
      } catch {
        setProductDetails(null);
        setProduct(null);
      }
    };

    fetchData();
  }, [productId]);

  if (isLoading || product === null) {
    return <Loader />;
  }

  if (!productDetails) {
    return <NotFoundPage />;
  }

  const { images, name, description } = productDetails;
  const {
    price, discount, ram, capacity, id, screen,
  } = product;

  const imagesFolder = './';

  const addedToCart = cartItems.some((cartItem) => cartItem.id === id);
  const isInFavourites = favouritesItems.some(
    (favouritesItem) => favouritesItem.id === id,
  );

  const newPrice = price * (1 - discount / 100);

  scrollTop();

  return (
    <>
      <div className="product-details">
        <div className="product-details__container">
          <div className="path">
            <Link to="/" className="path__link">
              <IconHome />
            </Link>

            <IconArrowRight className="path__arrow" />

            <Link to="/phones" className="path__link">
              <div className="path__text">Phones</div>
            </Link>

            <IconArrowRight className="path__arrow" />

            <div className="path__text">{productDetails.name}</div>
          </div>

          <div className="path" data-cy="backButton">
            <button
              className="path__text"
              onClick={onBackClicked}
              style={{ cursor: 'pointer' }}
              type="button"
            >
              Back
            </button>
          </div>

          <h1 className="product-details__title">{name}</h1>

          <div className="product-details__gallery">
            <div className="product-details__images">
              {images.map((img) => (
                <button
                  className={classNames('product-details__image-container', {
                    'product-details__image-container--active':
                      mainImage === img,
                  })}
                  onClick={() => {
                    setMainImage(img);
                  }}
                  key={img}
                  type="button"
                >
                  <img
                    src={imagesFolder + img}
                    className="product-details__image"
                    alt="Product"
                  />
                </button>
              ))}
            </div>

            <img
              src={imagesFolder + mainImage}
              alt=""
              className="product-details__main-image"
            />

            <div className="product-details__options">
              <div className="product-details__options-section">
                <h2 className="product-details__options-title">
                  Available colors
                </h2>

                <div className="product-details__options-colors">
                  {colors.map((color, index) => (
                    <div
                      className={classNames(
                        'product-details__options-color-container',
                        {
                          'product-details__options-color-container--active':
                            index === 0,
                        },
                      )}
                    >
                      <div
                        className="product-details__options-color"
                        style={{ backgroundColor: color }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="product-details__options-section">
                <h2 className="product-details__options-title">
                  Select capacity
                </h2>

                <div className="product-details__options-capacities">
                  {capacities.map((capacityOption, index) => (
                    <div
                      className={classNames(
                        'product-details__options-capacity',
                        {
                          'product-details__options-capacity--active':
                            index === 0,
                        },
                      )}
                    >
                      {capacityOption}
                    </div>
                  ))}
                </div>
              </div>
              <div className="product-details__options-section">
                <div className="product-details__price">
                  <div className="product-details__new-price">{`$${newPrice}`}</div>

                  {!!discount && (
                    <div className="product-details__old-price">{`$${price}`}</div>
                  )}
                </div>

                <div className="product-details__buttons">
                  <button
                    className={classNames('product-details__add-to-cart', {
                      'product-details__add-to-cart--is_added': addedToCart,
                    })}
                    onClick={() => addToCart(id)}
                    type="button"
                  >
                    {addedToCart ? 'Added to cart' : 'Add to cart'}
                  </button>

                  <button
                    className="product-details__add-to-favourites"
                    onClick={() => {
                      if (isInFavourites) {
                        removeFromFavourites(id);
                      } else {
                        addToFavourites(id);
                      }
                    }}
                    type="button"
                  >
                    {isInFavourites ? (
                      <IconHeartActive
                        className="product-details__add-to-favourites-icon--
                        active"
                      />
                    ) : (
                      <IconHeart
                        className="product-details__add-to-favourites-icon"
                      />
                    )}
                  </button>
                </div>

                <div className="product-details__info">
                  <div className="product-details__info-element">
                    <div className="product-details__info-name">Screen</div>

                    <div className="product-details__info-value">{screen}</div>
                  </div>

                  <div className="product-details__info-element">
                    <div className="product-details__info-name">Resolution</div>

                    <div className="product-details__info-value">
                      {productDetails.display.screenResolution}
                    </div>
                  </div>

                  <div className="product-details__info-element">
                    <div className="product-details__info-name">Capacity</div>

                    <div className="product-details__info-value">
                      {capacity}
                    </div>
                  </div>

                  <div className="product-details__info-element">
                    <div className="product-details__info-name">Ram</div>

                    <div className="product-details__info-value">{ram}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="product-details__characteristics">
            <div
              className="product-details__about"
              data-cy="productDescription"
            >
              <h2 className="product-details__section-title"> About </h2>

              <p className="product-details__description">{description}</p>
            </div>

            <div className="product-details__specs">
              <h2 className="product-details__section-title"> Tech specs </h2>

              <div className="product-details__specs-container">
                <div className="product-details__spec">
                  <div className="product-details__spec-name">
                    Operating system
                  </div>

                  <div className="product-details__spec-value">
                    {productDetails.android.os}
                  </div>
                </div>

                <div className="product-details__spec">
                  <div className="product-details__spec-name">Screen</div>

                  <div className="product-details__spec-value">
                    {productDetails.display.screenSize}
                  </div>
                </div>

                <div className="product-details__spec">
                  <div className="product-details__spec-name">Resolution</div>

                  <div className="product-details__spec-value">
                    {productDetails.display.screenResolution}
                  </div>
                </div>

                <div className="product-details__spec">
                  <div className="product-details__spec-name">Ram</div>

                  <div className="product-details__spec-value">
                    {productDetails.storage.ram}
                  </div>
                </div>

                <div className="product-details__spec">
                  <div className="product-details__spec-name">
                    Built in memory
                  </div>

                  <div className="product-details__spec-value">
                    {productDetails.storage.flash}
                  </div>
                </div>

                <div className="product-details__spec">
                  <div className="product-details__spec-name">Camera</div>

                  <div className="product-details__spec-value">
                    {productDetails.camera.primary}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="product-details__suggested-products">
            <Slider title="You may also like" products={suggestedProducts} />
          </div>
        </div>
      </div>
    </>
  );
};
