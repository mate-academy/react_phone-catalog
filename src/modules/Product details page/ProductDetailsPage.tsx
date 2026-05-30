/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/indent */

import { useEffect, useState, useContext } from 'react';
import { Breadcrumbs } from '../Product page/components/Breadcrumbs/Breadcrumbs';
import styles from './ProductDetailsPage.module.scss';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { colorMap } from '../../utils/colorMap';
import { Loader } from '../Product page/components/Loader/Loader';
import classNames from 'classnames';
import { ProductsSlider } from '../Home page/components/ProductsSlider/ProductsSlider';
import { CartContext } from '../../context/CartContext';
import { BackButton } from './components/Back button/BackButton';
import { useFavourites } from '../../context/FavouritesContext';
import { ProductNotFound } from './components/ProductNotFoundPage/ProductNotFound';
import { WrongMessage } from '../../components/WrongMessage/WrongMessage';
import { useTranslation } from 'react-i18next';
/* eslint-enable max-len */
export const ProductDetailsPage = () => {
  const { t } = useTranslation();

  const { category, productId } = useParams();
  const [isAnimated, setIsAnimated] = useState<boolean>(false);
  const { isFavourite, toggleFavourite } = useFavourites();
  const handleAddToFavourites = (product: Product) => {
    toggleFavourite(product);
    setIsAnimated(true);

    setTimeout(() => {
      setIsAnimated(false);
    }, 300);
  };

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedColor, setSelectedColor] = useState();
  const [selectedCapacity, setSelectedCapacity] = useState();
  const [products, setProducts] = useState<[] | null>([]);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);
  const loadProducts = async () => {
    const response = await fetch('./api/products.json');
    const data1 = await response.json();

    setProducts(data1);
  };

  useEffect(() => {
    loadProducts();
  }, []);
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`./api/${category}.json`);
      const fetchedData = await response.json();

      setData(fetchedData);
    } catch (e) {
      setError('Failed to download product');
    } finally {
      setTimeout(() => setIsLoading(false), 1000);
    }
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  const product = data?.find(pr => String(pr.id) === productId);

  const { items, dispatch } = useContext(CartContext);
  const isInCart = items.some(item => item.product.id === productId);
  const handleAddToCart = () => {
    if (!product) {
      return null;
    }

    if (!isInCart) {
      dispatch({ type: 'ADD_ITEM', payload: product });
    }
  };

  useEffect(() => {
    if (product) {
      setSelectedCapacity(product.capacity);
      setSelectedColor(product.color);
    }
  }, [product]);

  const handleColorChange = color => {
    setSelectedColor(color);
    const newColorItem = data.find(
      item =>
        item.namespaceId === product.namespaceId &&
        item.color === color &&
        item.capacity === selectedCapacity,
    );

    if (newColorItem) {
      navigate(`/${category}/${newColorItem.id}`);
    }
  };

  const handleCapacityChange = capacity => {
    setSelectedCapacity(capacity);
    const newCapacityItem = data.find(
      item =>
        item.namespaceId === product.namespaceId &&
        item.capacity === capacity &&
        item.color === selectedColor,
    );

    if (newCapacityItem) {
      navigate(`/${category}/${newCapacityItem.id}`);
    }
  };

  const [images, setImages] = useState([]);

  useEffect(() => {
    const imgs = product
      ? [...Array(product.images.length)].map((_, index) => {
          return `./img/${category}/${product.namespaceId}/${product.color}/0${index}.webp`;
        })
      : [];

    setImages(imgs);
    setSelectedImage(imgs[0]);
  }, [product]);

  if (error) {
    return (
      <WrongMessage title={error} showReload onReload={() => fetchData()} />
    );
  }

  if (isLoading) {
    return <Loader />;
  }

  if (!product && !isLoading) {
    return <ProductNotFound />;
  }

  return (
    product && (
      <div className={styles.ProductDetailsPage}>
        <div className={styles.ProductDetailsPage__header}>
          <Breadcrumbs />
          <div className={styles.ProductDetailsPage__header__container}>
            <BackButton />
            <h1 className={styles.ProductDetailsPage__title}>{product.name}</h1>
          </div>
        </div>
        <div className={styles.ProductDetailsPage__mainInfo}>
          <div className={styles.ProductDetailsPage__main}>
            <div className={styles.ProductDetailsPage__images}>
              {/* '../../../public/img/phones/apple-iphone-11/black/' */}
              <div className={styles.ProductDetailsPage__thumbnails}>
                {images.map((image, index) => {
                  return (
                    <div
                      className={styles.ProductDetailsPage__thumbnail}
                      onClick={() => setSelectedImage(image)}
                      key={index}
                    >
                      <img src={image} alt={`${product.name} ${index}`} />
                    </div>
                  );
                })}
              </div>
              <div className={[styles['ProductDetailsPage__main-image']]}>
                <img
                  src={selectedImage || images[0]}
                  alt={product.name}
                  className={styles.ProductDetailsPage__image}
                />
              </div>
            </div>
            <div className={styles.ProductDetailsPage__info}>
              <div className={styles.ProductDetailsPage__radioButtons}>
                <div className={styles['ProductDetailsPage__available-colors']}>
                  <p
                    className={[
                      styles['ProductDetailsPage__available-colors__title'],
                    ]}
                  >
                    {t('productDetails.colors')}
                  </p>
                  <div
                    className={[
                      styles['ProductDetailsPage__available-colors__colors'],
                    ]}
                  >
                    {product.colorsAvailable.map((color, index) => {
                      return (
                        /* eslint-disable jsx-a11y/label-has-associated-control */ <label
                          key={color}
                          className={classNames(
                            styles.ProductDetailsPage__colorLabel,
                            {
                              [styles[
                                'ProductDetailsPage__colorLabel--active'
                              ]]: selectedColor === color,
                            },
                          )}
                        >
                          <input
                            checked={selectedColor === color}
                            className={[
                              styles[
                                'ProductDetailsPage__available-colors__color'
                              ],
                            ]}
                            key={index}
                            type="radio"
                            value={color}
                            onChange={() => handleColorChange(color)}
                          ></input>
                          <span
                            className={styles.ProductDetailsPage__colorCircle}
                            style={{
                              backgroundColor: colorMap[color] || color,
                            }}
                          ></span>
                        </label>
                        /* eslint-enable jsx-a11y/label-has-associated-control */
                      );
                    })}
                  </div>
                </div>
                <div
                  className={[
                    styles['ProductDetailsPage__available-capacities'],
                  ]}
                >
                  <p
                    className={[
                      styles['ProductDetailsPage__available-capacities__title'],
                    ]}
                  >
                    {t('productDetails.capacity')}
                  </p>
                  <div
                    className={[
                      styles[
                        'ProductDetailsPage__available-capacities__capacities'
                      ],
                    ]}
                  >
                    {product.capacityAvailable.map((capacity, index) => {
                      return (
                        <label
                          key={capacity}
                          className={classNames(
                            styles.ProductDetailsPage__capacityLabel,
                            {
                              [styles[
                                'ProductDetailsPage__capacityLabel--active'
                              ]]: selectedCapacity === capacity,
                            },
                          )}
                          onClick={() => handleCapacityChange(capacity)}
                        >
                          <input
                            checked={selectedCapacity === capacity}
                            className={[
                              styles[
                                'ProductDetailsPage__available-capacities__capacity'
                              ],
                            ]}
                            key={index}
                            type="radio"
                            value={capacity}
                            onChange={() => handleCapacityChange}
                          ></input>
                          <span className={styles.ProductDetailsPage__option}>
                            {capacity}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className={styles.ProductDetailsPage__priceAndButtons}>
                <div className={styles.ProductDetailsPage__priceContainer}>
                  <div className={styles.ProductDetailsPage__price}>
                    <p className={styles.ProductDetailsPage__price__value}>
                      ${product.priceDiscount}{' '}
                    </p>
                    <p className={styles.ProductDetailsPage__price__oldValue}>
                      ${product.priceRegular}{' '}
                    </p>
                  </div>
                  <div className={styles.ProductDetailsPage__buttons}>
                    <button
                      className={styles.ProductDetailsPage__addToCart}
                      onClick={handleAddToCart}
                    >
                      {t('productDetails.add_to_cart')}
                    </button>
                    <div
                      className={classNames(
                        styles.ProductDetailsPage__favourite,
                        {
                          [styles['ProductDetailsPage__favourite--animated']]:
                            isAnimated,
                        },
                      )}
                      onClick={() => handleAddToFavourites(product)}
                    >
                      <img
                        src={
                          isFavourite(product.id)
                            ? './img/buttons/Icons/Buttons/Icons/Favourites Filled (Heart Like).svg'
                            : './img/Favourites (Heart Like).svg'
                        }
                        alt="like"
                        className={styles.ProductCard__imageLike}
                      />
                    </div>
                  </div>
                </div>
                <ul className={styles.ProductDetailsPage__mainSpecs}>
                  <li className={styles.ProductDetailsPage__spec}>
                    <span className={styles.ProductDetailsPage__spec_name}>
                      {t('productDetails.screen')}
                    </span>
                    <span className={styles.ProductDetailsPage__spec_value}>
                      {product.screen}
                    </span>
                  </li>
                  <li className={styles.ProductDetailsPage__spec}>
                    <span className={styles.ProductDetailsPage__spec_name}>
                      {t('productDetails.resolution')}
                    </span>
                    <span className={styles.ProductDetailsPage__spec_value}>
                      {product.resolution}
                    </span>
                  </li>
                  <li className={styles.ProductDetailsPage__spec}>
                    <span className={styles.ProductDetailsPage__spec_name}>
                      {t('productDetails.processor')}
                    </span>
                    <span className={styles.ProductDetailsPage__spec_value}>
                      {product.processor}
                    </span>
                  </li>
                  <li className={styles.ProductDetailsPage__spec}>
                    <span className={styles.ProductDetailsPage__spec_name}>
                      {t('productDetails.ram')}
                    </span>
                    <span className={styles.ProductDetailsPage__spec_value}>
                      {product.ram}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className={styles.ProductDetailsPage__description}>
            <section className={styles.ProductDetailsPage__about}>
              <h2 className={styles.ProductDetailsPage__description__title}>
                {t('productDetails.about')}
              </h2>
              <div className={styles.ProductDetailsPage__sections}>
                {[1, 2, 3].map((item, index) => {
                  return (
                    <div
                      className={styles.ProductDetailsPage__section}
                      key={index}
                    >
                      <h3 className={styles.ProductDetailsPage__section__title}>
                        {product.description[index].title}
                      </h3>
                      <p className={styles.ProductDetailsPage__section__text}>
                        {product.description[index].text}
                      </p>
                    </div>
                  );
                })}
              </div>
            </section>
            <section className={styles.ProductDetailsPage__specs}>
              <h2 className={styles.ProductDetailsPage__specs__title}>
                {t('productDetails.tech_specs')}
              </h2>
              <ul className={styles.ProductDetailsPage__specs__list}>
                <li className={styles.ProductDetailsPage__spec}>
                  <span
                    className={`${styles.ProductDetailsPage__spec_name} ${styles['ProductDetailsPage__spec_name--bigger']}`}
                  >
                    {t('productDetails.screen')}
                  </span>
                  <span
                    className={`${styles.ProductDetailsPage__spec_value} ${styles['ProductDetailsPage__spec_value--bigger']}`}
                  >
                    {product.screen}
                  </span>
                </li>
                <li className={styles.ProductDetailsPage__spec}>
                  <span
                    className={`${styles.ProductDetailsPage__spec_name} ${styles['ProductDetailsPage__spec_name--bigger']}`}
                  >
                    {t('productDetails.resolution')}
                  </span>
                  <span
                    className={`${styles.ProductDetailsPage__spec_value} ${styles['ProductDetailsPage__spec_value--bigger']}`}
                  >
                    {product.resolution}
                  </span>
                </li>
                <li className={styles.ProductDetailsPage__spec}>
                  <span
                    className={`${styles.ProductDetailsPage__spec_name} ${styles['ProductDetailsPage__spec_name--bigger']}`}
                  >
                    {t('productDetails.processor')}
                  </span>
                  <span
                    className={`${styles.ProductDetailsPage__spec_value} ${styles['ProductDetailsPage__spec_value--bigger']}`}
                  >
                    {product.processor}
                  </span>
                </li>
                <li className={styles.ProductDetailsPage__spec}>
                  <span
                    className={`${styles.ProductDetailsPage__spec_name} ${styles['ProductDetailsPage__spec_name--bigger']}`}
                  >
                    {t('productDetails.ram')}
                  </span>
                  <span
                    className={`${styles.ProductDetailsPage__spec_value} ${styles['ProductDetailsPage__spec_value--bigger']}`}
                  >
                    {product.ram}
                  </span>
                </li>
                <li className={styles.ProductDetailsPage__spec}>
                  <span
                    className={`${styles.ProductDetailsPage__spec_name} ${styles['ProductDetailsPage__spec_name--bigger']}`}
                  >
                    {t('productDetails.built_in_memory')}
                  </span>
                  <span
                    className={`${styles.ProductDetailsPage__spec_value} ${styles['ProductDetailsPage__spec_value--bigger']}`}
                  >
                    {selectedCapacity || product.capacityAvailable[0]}
                  </span>
                </li>
                <li className={styles.ProductDetailsPage__spec}>
                  <span
                    className={`${styles.ProductDetailsPage__spec_name} ${styles['ProductDetailsPage__spec_name--bigger']}`}
                  >
                    {t('productDetails.camera')}
                  </span>
                  <span
                    className={`${styles.ProductDetailsPage__spec_value} ${styles['ProductDetailsPage__spec_value--bigger']}`}
                  >
                    {product.camera}
                  </span>
                </li>
                <li className={styles.ProductDetailsPage__spec}>
                  <span
                    className={`${styles.ProductDetailsPage__spec_name} ${styles['ProductDetailsPage__spec_name--bigger']}`}
                  >
                    {t('productDetails.zoom')}
                  </span>
                  <span
                    className={`${styles.ProductDetailsPage__spec_value} ${styles['ProductDetailsPage__spec_value--bigger']}`}
                  >
                    {product.zoom}
                  </span>
                </li>
                <li className={styles.ProductDetailsPage__spec}>
                  <span
                    className={`${styles.ProductDetailsPage__spec_name} ${styles['ProductDetailsPage__spec_name--bigger']}`}
                  >
                    {t('productDetails.cell')}
                  </span>
                  <span
                    className={`${styles.ProductDetailsPage__spec_value} ${styles['ProductDetailsPage__spec_value--bigger']}`}
                  >
                    {product.cell}
                  </span>
                </li>
              </ul>
            </section>
          </div>
          <div className={styles.ProductDetailsPage__footer}>
            <ProductsSlider
              products={products}
              hasDiscount={true}
              title={t('slider.title')}
            />
          </div>
        </div>
      </div>
    )
  );
};
/* eslint-enable @typescript-eslint/indent */
