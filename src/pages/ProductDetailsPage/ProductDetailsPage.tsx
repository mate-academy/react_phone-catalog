import { useNavigate, useParams } from 'react-router-dom';
import { fetchProduct, fetchProductsItem } from '../../utils/fetch';
import { useEffect, useState } from 'react';
import { Product, Products, SortType } from '../../utils/types';
import styles from './ProductDetailsPage.module.scss';
import { Loader } from '../../components/Loader';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { GoBack } from '../../components/GoBack';
import { Title } from '../../components/Title';
import classNames from 'classnames';
import { colors } from '../../utils/colors';
import { ToBuyButton } from '../../components/ToBuyButton';
import { AddToFavourites } from '../../components/AddToFavourites';
import { AboutProduct } from '../../components/AboutProduct';
import { TechSpecs } from '../../components/TechSpecs';
import { ProductSlider } from '../../components/ProductSlider';

export const ProductDetailsPage = () => {
  // #region state
  const [isLoading, setIsLoading] = useState(false);
  const [displayedProduct, setDisplayedProduct] = useState<Product | null>(
    null,
  );
  const [displayedProductInCategory, setDisplayedProductInCategory] =
    useState<Products | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [displayedImageIndex, setDisplayedImageIndex] = useState(0);
  const { category, productId } = useParams();
  const navigate = useNavigate();
  // #endregion
  // #region functions
  const handleColorChange = (color: string) => {
    if (category === 'accessories') {
      const normalizedColor = color.split(' ').join('-');

      navigate(
        `/${category}/${displayedProduct?.namespaceId + '-' + displayedProduct?.capacity + '-' + normalizedColor}`,
      );
    }

    if (category === 'phones' || category === 'tablets') {
      navigate(
        `/${category}/${displayedProduct?.namespaceId + '-' + displayedProduct?.capacity.toLowerCase() + '-' + color}`,
      );
    }
  };

  const handleCapacityChange = (capacity: string) => {
    if (category === 'accessories') {
      const normalizedColor = displayedProduct?.color.split(' ').join('-');

      navigate(
        `/${category}/${displayedProduct?.namespaceId + '-' + capacity.toLowerCase() + '-' + normalizedColor}`,
      );
    }

    if (category === 'phones' || category === 'tablets') {
      navigate(
        `/${category}/${displayedProduct?.namespaceId + '-' + capacity.toLowerCase() + '-' + displayedProduct?.color}`,
      );
    }
  };

  // #endregion

  useEffect(() => {
    if (category && productId) {
      setIsLoading(true);

      Promise.all([
        fetchProduct(category, productId),
        fetchProductsItem(productId),
      ])
        .then(([productResult, productItemResult]) => {
          if (productResult) {
            setDisplayedProduct(productResult);
          } else {
            setErrorMessage('Product was not found');
          }

          if (productItemResult) {
            setDisplayedProductInCategory(productItemResult);
          }
        })
        .catch(() => {
          setErrorMessage('Something went wrong');
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [productId, category]);

  return (
    <div className={styles.productDetails}>
      {isLoading && <Loader />}

      {errorMessage && (
        <div className={styles.productDetails__error}>
          <h2>{errorMessage}</h2>
        </div>
      )}
      {!isLoading && !errorMessage && displayedProduct && category && (
        <>
          <Breadcrumbs name={displayedProduct.name} />
          <div className={styles.productDetails__goback}>
            <img src="../src/img/icons/arrow_left_black.png" alt="arrow icon" />
            <GoBack> Back </GoBack>
          </div>
          <div className={styles.productDetails__title}>
            <Title level={2}>{displayedProduct.name}</Title>
          </div>
          <div className={styles.productDetails__top}>
            <div className={styles.productDetails__imageContainer}>
              <img
                src={`/${displayedProduct.images[displayedImageIndex]}`}
                alt="product image"
                className={styles.productDetails__image}
              />
            </div>

            <div className={styles.productDetails__images}>
              {displayedProduct.images.map((image, index) => {
                return (
                  <img
                    src={`/${image}`}
                    className={classNames(
                      styles['productDetails__images-item'],
                      {
                        [styles['productDetails__images-item--active']]:
                          index === displayedImageIndex,
                      },
                    )}
                    alt={`${displayedProduct?.name} ${index + 1}`}
                    key={image}
                    onClick={() => {
                      setDisplayedImageIndex(index);
                    }}
                  />
                );
              })}
            </div>

            <div className={styles.productDetails__details}>
              <div className={styles.productDetails__selectors}>
                <div className={styles.productDetails__selector}>
                  <p className={styles.productDetails__label}>
                    Available colors
                  </p>
                  <div className={styles.productDetails__selectorButtons}>
                    {displayedProduct?.colorsAvailable.map(color => {
                      return (
                        <div
                          className={classNames(
                            styles.productDetails__colorButtonContainer,
                            {
                              [styles[
                                'productDetails__colorButtonContainer--active'
                              ]]: displayedProduct.color === color,
                            },
                          )}
                          key={color}
                        >
                          <input
                            type="radio"
                            name="color"
                            style={{ backgroundColor: colors[color] }}
                            className={styles.productDetails__colorButton}
                            checked={displayedProduct.color === color}
                            onChange={() => handleColorChange(color)}
                          />
                        </div>
                      );
                    })}
                  </div>
                  <div className={styles.productDetails__line}></div>
                </div>
                <div className={styles.productDetails__selector}>
                  <p className={styles.productDetails__label}>
                    Select capacity
                  </p>
                  <div className={styles.productDetails__selectorButtons}>
                    {displayedProduct?.capacityAvailable.map(
                      (capacity: string) => {
                        return (
                          <button
                            className={classNames(
                              styles.productDetails__capacity,
                              {
                                [styles['productDetails__capacity--active']]:
                                  displayedProduct.capacity === capacity,
                              },
                            )}
                            key={capacity}
                            onClick={() => handleCapacityChange(capacity)}
                          >
                            {capacity}
                          </button>
                        );
                      },
                    )}
                  </div>
                  <div className={styles.productDetails__line}></div>
                </div>
              </div>
              <div className={styles.productDetails__prices}>
                <Title level={2}>{`$${displayedProduct.priceRegular}`}</Title>
                <p
                  className={styles.productDetails__discountPrice}
                >{`$${displayedProduct.priceDiscount}`}</p>
              </div>
              <div className={styles.productDetails__buttons}>
                {displayedProductInCategory && (
                  <>
                    <ToBuyButton
                      height="48"
                      product={displayedProductInCategory}
                    />
                    <AddToFavourites
                      size="m"
                      product={displayedProductInCategory}
                    />
                  </>
                )}
              </div>
              <div className={styles.productDetails__characteristics}>
                <div className={styles.productDetails__characteristic}>
                  <p className={styles.productDetails__characteristicName}>
                    Screen
                  </p>
                  <p className={styles.productDetails__characteristicValue}>
                    {displayedProduct.screen}
                  </p>
                </div>
                <div className={styles.productDetails__characteristic}>
                  <p className={styles.productDetails__characteristicName}>
                    Resolution
                  </p>
                  <p className={styles.productDetails__characteristicValue}>
                    {displayedProduct.resolution}
                  </p>
                </div>
                <div className={styles.productDetails__characteristic}>
                  <p className={styles.productDetails__characteristicName}>
                    Processor
                  </p>
                  <p className={styles.productDetails__characteristicValue}>
                    {displayedProduct.processor}
                  </p>
                </div>
                <div className={styles.productDetails__characteristic}>
                  <p className={styles.productDetails__characteristicName}>
                    RAM
                  </p>
                  <p className={styles.productDetails__characteristicValue}>
                    {displayedProduct.ram}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.productDetails__description}>
            <div className={styles.productDetails__about}>
              <AboutProduct product={displayedProduct} />
            </div>
            <div className={styles.productDetails__specs}>
              <TechSpecs product={displayedProduct} />
            </div>
          </div>
          <div className={styles.productDetails__slider}>
            <ProductSlider
              title="You may also like"
              category={category}
              sortBy={SortType.random}
            />
          </div>
        </>
      )}
    </div>
  );
};
