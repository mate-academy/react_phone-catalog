import React, {
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { AppContext } from '../../context/AppContext';
import { CartContext } from '../../context/CartContext';
import { FavContext } from '../../context/FavContext';
import { getProductInfo } from '../../helpers/products';
import arrow from '../../images/icons/Arrow_left.svg';
import { Category } from '../../types/Category';
import { PhoneInfo } from '../../types/PhoneInfo';
import './ProductDetailsPage.scss';
import { ProductsSlider } from '../../components/ProductsSlider';

type PhoneColorsType = {
  black: string,
  coral: string,
  gold: string,
  green: string,
  midnightgreen: string,
  purple: string,
  red: string,
  rosegold: string,
  silver: string,
  spacegray: string,
  white: string,
  yellow: string,
};

const PhoneColors: PhoneColorsType = {
  black: '#202020',
  coral: '#e4664f',
  gold: '#fbd7bd',
  green: '#ade1cd',
  midnightgreen: '#4e5850',
  purple: '#d1cddb',
  red: '#ba0c2f',
  rosegold: '#fddcd7',
  silver: '#ebebe3',
  spacegray: '#5f5f5f',
  white: '#f9f6ef',
  yellow: '#ffe680',
};

export const ProductDetailsPage: React.FC = () => {
  const { pathname } = useLocation();
  const category = pathname.slice(1).split('/')[0] as Category;
  const { productId } = useParams();
  const [product, setProduct] = useState<PhoneInfo>();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const { cart, handleAddToCart } = useContext(CartContext);
  const { fav, handleAddToFav } = useContext(FavContext);
  const { hotPriceProducts } = useContext(AppContext);

  const allImages = useMemo(() => {
    return product?.images || [];
  }, [product]);

  useEffect(() => {
    if (productId) {
      setIsLoading(true);

      getProductInfo(productId)
        .then(setProduct)
        .catch(() => { })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [productId]);

  useEffect(() => {
    setSelectedImage(allImages[0]);
  }, [allImages]);

  const handleImageSelect = (url: string) => {
    setSelectedImage(url);
  };

  const isAddedToCart = cart.some(item => item === productId);
  const isAddedToFav = fav.some(item => item === productId);

  return (
    <div className="ProductDetailsPage">
      <div className="container">
        {product && !isLoading && (
          <>
            <div className="ProductDetailsPage__content">
              <div className="ProductDetailsPage__section">
                <div className="ProductDetailsPage__top">
                  <Breadcrumbs
                    category={category}
                    productName={product.name}
                  />
                  <div className="ProductDetailsPage__back-and-title">
                    <Link to=".." className="Back">
                      <img
                        src={arrow}
                        alt="Arrow"
                        className="Back__icon"
                      />
                      <p className="Back__text">
                        Back
                      </p>
                    </Link>
                    <h2 className="ProductDetailsPage__product-title">
                      {product.name}
                    </h2>
                  </div>
                </div>

                <ul className="ProductDetailsPage__images">
                  {product.images.map(image => (
                    <li
                      key={image}
                      className={classNames('ProductDetailsPage__item', {
                        'ProductDetailsPage__item--active':
                          selectedImage === image,
                      })}
                    >
                      <Link
                        to={pathname}
                        className="ProductDetailsPage__image-link"
                        onClick={() => handleImageSelect(image)}
                      >
                        <img
                          src={`_new/${image}`}
                          alt={image}
                          className="ProductDetailsPage__image"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="ProductDetailsPage__main-image">
                  <img
                    src={`_new/${selectedImage}`}
                    alt={selectedImage}
                    className="ProductDetailsPage__main-image-selected"
                  />
                </div>
                <div className="ProductDetailsPage__main-info">
                  <div className="ProductDetailsPage__product-options">
                    <div className="ProductDetailsPage__colors-and-id">
                      <p className="ProductDetailsPage__colors-text">
                        Available colors
                      </p>
                      <ul className="ProductDetailsPage__colors">
                        {product.colorsAvailable.map(color => (
                          <li
                            key={color}
                            className={classNames('ProductDetailsPage__color', {
                              'ProductDetailsPage__color--selected':
                                product.color === color,
                            })}
                          >
                            <Link
                              to={pathname.replace(product.color, color)}
                              className="ProductDetailsPage__color-link"
                            >
                              <span
                                className="ProductDetailsPage__color-circle"
                                style={{
                                  backgroundColor:
                                    PhoneColors[color as keyof PhoneColorsType],
                                }}
                              />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="ProductDetailsPage__line" />
                    <div className="ProductDetailsPage__capacity-info">
                      <p className="ProductDetailsPage__capacity-text">
                        Select capacity
                      </p>
                      <ul className="ProductDetailsPage__capacity-list">
                        {product.capacityAvailable.map(capacity => (
                          <li
                            key={capacity}
                            className="ProductDetailsPage__capacity-item"
                          >
                            <Link
                              to={pathname.replace(
                                product.capacity.toLowerCase(),
                                capacity.toLowerCase(),
                              )}
                              className={classNames(
                                'ProductDetailsPage__capacity', {
                                  'ProductDetailsPage__capacity--selected':
                                    product.capacity === capacity,
                                },
                              )}
                            >
                              {capacity.replace('GB', ' GB')}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="ProductDetailsPage__line" />
                  </div>
                  <div className="ProductDetailsPage__price-and-buttons">
                    <div className="ProductDetailsPage__prices">
                      <span className="ProductDetailsPage__price-discount">
                        {`$${product.priceDiscount}`}
                      </span>
                      <span className="ProductDetailsPage__price-full">
                        {`$${product.priceRegular}`}
                      </span>
                    </div>
                    <div className="ProductDetailsPage__actions">
                      <button
                        type="button"
                        className={classNames('button__add-to-cart', {
                          'button__added-to-cart': isAddedToCart,
                        })}
                        onClick={() => handleAddToCart(product.id)}
                      >
                        {isAddedToCart ? (
                          'Added to cart'
                        ) : (
                          'Add to cart'
                        )}
                      </button>
                      <button
                        type="button"
                        aria-label="Like"
                        className={classNames('button button--like', {
                          'button--like-active': isAddedToFav,
                        })}
                        onClick={() => handleAddToFav(product.id)}
                      />
                    </div>
                  </div>
                  <div className="ProductDetailsPage__features Feature">
                    <ul className="Feature__list">
                      <li className="Feature__item">
                        <p className="Feature__name">Screen</p>
                        <p className="Feature__value">{product.screen}</p>
                      </li>
                      <li className="Feature__item">
                        <p className="Feature__name">Resolution</p>
                        <p className="Feature__value">
                          {product.resolution.replace('х', ' х ')}
                        </p>
                      </li>
                      <li className="Feature__item">
                        <p className="Feature__name">Processor</p>
                        <p className="Feature__value">{product.processor}</p>
                      </li>
                      <li className="Feature__item">
                        <p className="Feature__name">RAM</p>
                        <p className="Feature__value">
                          {product.ram.replace('GB', ' GB')}
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="ProductDetailsPage__section">
                <article className="ProductDetailsPage__section-content About">
                  <div className="ProductDetailsPage__section-top">
                    <h3 className="ProductDetailsPage__section-title">
                      About
                    </h3>
                    <div className="ProductDetailsPage__line" />
                  </div>

                  <div className="Description">
                    <ul className="Description__list">
                      {product.description.map(item => (
                        <li className="Description__item">
                          <h4 className="Description__title">
                            {item.title}
                          </h4>
                          <p className="Description__text">
                            {item.text}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>

                <article className="ProductDetailsPage__section-content
                  TechSpecs"
                >
                  <div className="ProductDetailsPage__section-top">
                    <h3 className="ProductDetailsPage__section-title">
                      Tech specs
                    </h3>
                    <div className="ProductDetailsPage__line" />
                  </div>

                  <div className="TechSpecs">
                    <ul className="Feature__list">
                      <li className="Feature__item">
                        <p className="Feature__name">Screen</p>
                        <p className="Feature__value">{product.screen}</p>
                      </li>
                      <li className="Feature__item">
                        <p className="Feature__name">Resolution</p>
                        <p className="Feature__value">
                          {product.resolution.replace('х', ' х ')}
                        </p>
                      </li>
                      <li className="Feature__item">
                        <p className="Feature__name">Processor</p>
                        <p className="Feature__value">{product.processor}</p>
                      </li>
                      <li className="Feature__item">
                        <p className="Feature__name">RAM</p>
                        <p className="Feature__value">
                          {product.ram.replace('GB', ' GB')}
                        </p>
                      </li>
                      <li className="Feature__item">
                        <p className="Feature__name">Built in memory</p>
                        <p className="Feature__value">
                          {product.capacity.replace('GB', ' GB')}
                        </p>
                      </li>
                      <li className="Feature__item">
                        <p className="Feature__name">Camera</p>
                        <p className="Feature__value">{product.camera}</p>
                      </li>
                      <li className="Feature__item">
                        <p className="Feature__name">Zoom</p>
                        <p className="Feature__value">{product.zoom}</p>
                      </li>
                      <li className="Feature__item">
                        <p className="Feature__name">Cell</p>
                        <p className="Feature__value">
                          {product.cell.join(', ')}
                        </p>
                      </li>
                    </ul>
                  </div>
                </article>
              </div>

              <div className="ProductDetailsPage__section">
                <div className="ProductDetailsPage__section-slider">
                  <ProductsSlider
                    title="You may also like"
                    products={hotPriceProducts}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
