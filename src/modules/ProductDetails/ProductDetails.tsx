/* eslint-disable */
import React, { useState } from 'react';
import styles from './ProductDetails.module.scss';
import classNames from 'classnames';
import phones from '../../../public/api/phones.json';
import tablets from '../../../public/api/tablets.json';
import accessories from '../../../public/api/accessories.json';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { CardSlider } from '../../components/CardSlider';
import allProducts from '../../../public/api/products.json';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { Product } from '../../types/Product';
import { addFavorite, deleteFavourite } from '../../features/favorites';

export const ProductDetails: React.FC = () => {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const { category, productId } = useParams();
  const navigate = useNavigate();

  const favouriteProducts = useSelector(
    (state: RootState) => state.favorites.items,
  );

  const dispatch = useDispatch();

  const handleAddFavorite = (product: Product) => {
    const findProduct = allProducts.find(p => p.itemId === product.id);

    dispatch(addFavorite(findProduct));
  };

  const handleDeleteFavorite = () => {
    // eslint-disable-next-line no-use-before-define
    const findProduct = allProducts.find(p => p.itemId === product.id);

    dispatch(deleteFavourite(findProduct.itemId));
  };

  const hotProducts = allProducts
    .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price))
    .slice(0, 10);

  const [currentIndex, setCurrentIndex] = useState(0);

  let categoryData;

  if (category === 'phones') {
    categoryData = phones;
  } else if (category === 'tablets') {
    categoryData = tablets;
  } else if (category === 'accessories') {
    categoryData = accessories;
  } else {
    categoryData = null;
  }

  const product = categoryData?.find(product => productId === product.id);

  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index);
  };

  const handleNext = () => {
    setCurrentIndex(prevState =>
      prevState === product.images.length - 1 ? 0 : prevState + 1,
    );
  };

  const handlePrev = () => {
    setCurrentIndex(prevState =>
      prevState === 0 ? product.images.length - 1 : prevState - 1,
    );
  };

  const handleCapacityChange = (capacity: string, color: string) => {
    const newUrl = `/catalog/${category}/${product.namespaceId}-${capacity.toLowerCase()}-${color}`;

    navigate(newUrl);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd >= 1) {
      handleNext();
    }

    if (touchStart - touchEnd <= -1) {
      handlePrev();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <>
      <section
        className={classNames(styles['product-details'], styles.container)}
      >
        <Breadcrumbs
          currentCategory={product?.category}
          currentProduct={product.name}
        />
        <h1 className={styles.title}>{product.name}</h1>
        <div className={styles.main}>
          <div className={styles.gallery}>
            <div
              className={styles.slider}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className={styles.slider__track}
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {product.images.map((slide, index) => (
                  <div className={styles.slider__item} key={index}>
                    <img
                      src={slide}
                      alt={`Slide ${index + 1}`}
                      className={styles.slider__image}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.thumbnails}>
              {product.images.map((image, index) => (
                <div className={classNames(styles.thumbnail)} key={index}>
                  <img
                    key={index}
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className={styles['thumbnail-image']}
                    onClick={() => handleThumbnailClick(index)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className={classNames(styles.info)}>
            <div
              className={classNames(
                styles['available-colors'],
                styles.info__wrapper,
              )}
            >
              <h3>Available Colors</h3>
              {product.colorsAvailable.map((color, index) => (
                <div key={color} className={styles['color-option']}>
                  <input
                    type="radio"
                    id={`color-${index}`}
                    name="color"
                    value={color}
                    className={styles['color-input']}
                    onClick={() =>
                      handleCapacityChange(product.capacity, color)
                    }
                  />
                  <label
                    id={'color'}
                    htmlFor={`color-${index}`}
                    className={styles['color-option']}
                    style={{ backgroundColor: color }}
                  ></label>
                </div>
              ))}
            </div>

            <div
              className={classNames(
                styles['capacity-list'],
                styles.info__wrapper,
              )}
            >
              <h3>Select Capacity</h3>
              {product.capacityAvailable.map(capacity => (
                <button
                  onClick={() => handleCapacityChange(capacity, product.color)}
                  key={capacity}
                  className={classNames(styles['capacity-button'], {
                    [styles['is-active']]: capacity === product.capacity,
                  })}
                >
                  {capacity}
                </button>
              ))}
            </div>
            <div className={styles.pricing}>
              <span className={styles['current-price']}>
                ${product.priceDiscount}
              </span>
              <span className={styles['old-price']}>
                ${product.priceRegular}
              </span>
            </div>
            <div className={styles.buttons}>
              <button className={styles['add-to-cart']}>Add to cart</button>
              {favouriteProducts.some(p => p.itemId === product.id) ? (
                <button
                  onClick={handleDeleteFavorite}
                  className={classNames(
                    styles['product-card__button'],
                    styles.favorites,
                    styles.button,
                  )}
                >
                  <img
                    src="Images/Favourites-Filled.svg"
                    alt="Favorites"
                    className={styles['favorites-img']}
                  />
                </button>
              ) : (
                <button
                  onClick={() => {
                    handleAddFavorite(product);
                  }}
                  className={classNames(
                    styles['product-card__button'],
                    styles.favorites,
                    styles.button,
                    styles['is-active'],
                  )}
                >
                  <img
                    src="Images/Favorites-icon.svg"
                    alt="Favorites"
                    className={styles['favorites-img']}
                  />
                </button>
              )}
            </div>

            <ul className={styles['tech-specs__list']}>
              <li className={styles['tech-spec']}>
                <span className={styles['tech-spec-label']}>Screen:</span>
                <span className={styles['tech-spec-value']}>
                  {product.screen}
                </span>
              </li>

              <li className={styles['tech-spec']}>
                <span className={styles['tech-spec-label']}>Capacity:</span>
                <span className={styles['tech-spec-value']}>
                  {product.capacity}
                </span>
              </li>

              <li className={styles['tech-spec']}>
                <span className={styles['tech-spec-label']}>RAM:</span>
                <span className={styles['tech-spec-value']}>{product.ram}</span>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles['additional-info']}>
          <div className={styles.about}>
            <h2
              className={classNames(styles.about__title, styles.section__title)}
            >
              About
            </h2>
            {product.description.map((desc, index) => (
              <div key={index}>
                <h3 className={styles.product__title}>{desc.title}</h3>
                <p className={styles.product__text}>{desc.text}</p>
              </div>
            ))}
          </div>

          <div
            className={classNames(
              styles['tech-specs'],
              styles['tech-specs__bottom'],
            )}
          >
            <h2 className={styles.section__title}>Tech specs</h2>
            <ul className={styles['tech-specs__list']}>
              {Object.entries(product).map(([key, value]) => {
                if (
                  [
                    'id',
                    'category',
                    'images',
                    'description',
                    'capacity',
                    'capacityAvailable',
                    'colorsAvailable',
                    'color',
                    'namespaceId',
                    'name',
                  ].includes(key)
                ) {
                  return null;
                }

                const displayValue = Array.isArray(value)
                  ? value.join(', ')
                  : typeof value === 'string'
                    ? value
                    : '';

                return displayValue ? (
                  <li className={styles['tech-spec']} key={key}>
                    <span className={styles['tech-spec-label']}>
                      {key.charAt(0).toUpperCase() + key.slice(1)}:
                    </span>
                    <span className={styles['tech-spec-value']}>
                      {displayValue}
                    </span>
                  </li>
                ) : null;
              })}
            </ul>
          </div>
        </div>

        <div className={styles['related-products']}>
          <CardSlider
            sliderTitle={'You may also like'}
            products={hotProducts}
            showDiscount={true}
          />
        </div>
      </section>
    </>
  );
};
