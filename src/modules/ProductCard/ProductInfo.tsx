import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './ProductInfo.module.scss';
import { useInfoProduct } from '../../hooks/useInfoProduct';
import { Products } from '../../shared/types/Products';
import { useParams, useSearchParams } from 'react-router-dom';
import { ProductCard } from '../../shared/types/ProductCard';
import classNames from 'classnames';
import { Loader } from '../../shared/Loader';
import { DataNames } from '../../hooks/useProductsStorage';
import { useStorage } from '../../context/StorageContext';
import { getDataPublic } from '../../shared/functions/functions';
import { Article } from '../../shared/types/Article';
import { Carousel } from '../../shared/Carousel/Carousel';
import { NavAdress } from '../../shared/NavAdress';

const techNames = [
  'screen',
  'resolution',
  'processor',
  'ram',
  'camera',
  'zoom',
  'cell',
];

const aviableColors: Record<string, string> = {
  black: '#1C1C1E',
  green: '#3A7D44',
  yellow: '#F4D03F',
  white: '#F8F9FA',
  purple: '#7D3C98',
  red: '#E74C3C',
  spacegray: '#5E5E5E',
  midnightgreen: '#004953',
  gold: '#D4AF37',
  silver: '#C0C0C0',
  rosegold: '#B76E79',
  coral: '#FF6F61',
  midnight: '#191970',
  spaceblack: '#0B0B0B',
  blue: '#2E86C1',
  pink: '#FFC0CB',
  graphite: '#4B4B4B',
  sierrablue: '#4A90E2',
};

export const ProductInfo: React.FC = () => {
  const { product, getProductCard } = useInfoProduct();
  const [searchParams, setSeachParams] = useSearchParams();
  const { category, modelName } = useParams<{
    category: Products;
    modelName: string;
  }>();
  const { findProduct, removeProduct, addProduct } = useStorage();

  const [currentProduct, setCurrentProduct] = useState<ProductCard | null>(
    null,
  );
  const [capacity, setCapacity] = useState<string | null>(null);
  const [color, setColor] = useState<string | null>(null);
  const [activeImg, setActiveImg] = useState<string | null>(null);
  const [sameProducts, setSameProducts] = useState<Article[] | null>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (!category || !modelName) {
      return;
    }

    getProductCard(category, modelName);
  }, [category, modelName, getProductCard]);

  useEffect(() => {
    if (product && !currentProduct) {
      const defaultProduct = product[0];

      const initialColor = searchParams.get('color') || defaultProduct.color;
      const initialCapacity =
        searchParams.get('capacity') || defaultProduct.capacity;

      setCurrentProduct(defaultProduct);
      setColor(initialColor);
      setCapacity(initialCapacity);
      setActiveImg(defaultProduct.images[0]);

      if (isFirstRender.current) {
        const newParams = new URLSearchParams(searchParams);

        newParams.set('color', initialColor);
        newParams.set('capacity', initialCapacity);
        setSeachParams(newParams);
        isFirstRender.current = false;
      }
    }
  }, [product, currentProduct, searchParams, setSeachParams]);

  useEffect(() => {
    if (product && currentProduct) {
      const newProduct = product.find(
        el =>
          el.capacity === searchParams.get('capacity') &&
          el.color === searchParams.get('color'),
      );

      setCurrentProduct(newProduct);
      setActiveImg(newProduct?.images[0]);
    }
  }, [searchParams, product, currentProduct]);

  const handleColor = (newColor: string) => {
    setColor(newColor);
    const newParams = new URLSearchParams(searchParams);

    newParams.set('color', newColor);
    setSeachParams(newParams);
  };

  const handleCapacity = (newCapacity: string) => {
    setCapacity(newCapacity);
    const newParams = new URLSearchParams(searchParams);

    newParams.set('capacity', newCapacity);
    setSeachParams(newParams);
  };

  const findSameProducts = useCallback(async () => {
    if (product && currentProduct) {
      const response = await getDataPublic('products');
      const result = response
        .filter(
          (el: Article) =>
            el.capacity === currentProduct.capacity ||
            el.color === currentProduct.color,
        )
        .slice(0, 10);

      setSameProducts(result);
    }
  }, [product, currentProduct]);

  useEffect(() => {
    findSameProducts();
  }, [product, findSameProducts]);

  return (
    <div className={styles.card}>
      {product && currentProduct ? (
        <div className={styles.card__content}>
          <div style={{ marginTop: '24px' }} className={styles.card__wrapper}>
            <NavAdress />

            <a
              className={styles.card__backLink}
              href={`/#/${currentProduct.category}`}
            >
              {'< '}
              <span style={{ color: '#89939A' }}>Back</span>
            </a>
            <h1 className={styles.card__title}>{currentProduct.name}</h1>
          </div>
          <div className={styles.card__images}>
            {currentProduct.images.map(image => {
              return (
                <div
                  key={image}
                  className={styles.card__imgBox}
                  onClick={() => setActiveImg(image)}
                  style={{
                    borderColor: activeImg === image ? '#000' : '#E2E6E9',
                    cursor: 'pointer',
                  }}
                >
                  <img
                    key={image}
                    src={image}
                    className={styles.card__miniImage}
                    alt="Product Image"
                  />
                </div>
              );
            })}
          </div>
          <img
            className={styles.card__image}
            src={activeImg}
            alt="Product Image"
          />
          <div className={styles.card__parameters}>
            <div className={styles.card__colors}>
              <p className={styles.card__colorsTitle}>Active Colors</p>
              <div className={styles.card__buttons}>
                {currentProduct.colorsAvailable.map(
                  (currentColor: keyof typeof aviableColors) => {
                    return (
                      <div
                        key={currentColor}
                        className={classNames(styles.card__color, {
                          [styles['card__color--active']]:
                            currentColor === currentProduct.color,
                        })}
                      >
                        <button
                          onClick={() => handleColor(currentColor)}
                          key={currentColor}
                          className={styles.card__colorButton}
                          style={{
                            backgroundColor: aviableColors[currentColor],
                          }}
                        />
                      </div>
                    );
                  },
                )}
              </div>
            </div>

            <div className={styles.card__capacity}>
              <p className={styles.card__capacityTitle}>Select Capacity</p>
              <div className={styles.card__buttons}>
                {currentProduct.capacityAvailable.map(cap => {
                  return (
                    <button
                      key={cap}
                      className={styles.card__capacityButton}
                      style={{
                        backgroundColor:
                          cap === currentProduct.capacity ? 'black' : 'white',
                        color:
                          cap === currentProduct.capacity ? 'white' : 'black',
                      }}
                      onClick={() => handleCapacity(cap)}
                    >
                      {cap}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className={styles.card__buy}>
              <div className={styles.card__prices}>
                <h2 className={styles.card__price}>
                  {`$${currentProduct.priceDiscount}`}
                </h2>

                <h2 className={styles.card__priceFull}>
                  {`$${currentProduct.priceRegular}`}
                </h2>
              </div>

              <div className={styles.card__buttons}>
                {!findProduct(DataNames.cart, currentProduct.id) ? (
                  <button
                    onClick={() => {
                      addProduct(DataNames.cart, currentProduct.id);
                    }}
                    className={styles.card__buyButton}
                  >
                    Add to Cart
                  </button>
                ) : (
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      removeProduct(DataNames.cart, currentProduct.id);
                    }}
                    className={classNames(
                      styles.card__buyButton,
                      styles.card__buyButtonActive,
                    )}
                  >
                    Added to Cart
                  </button>
                )}

                {!findProduct(DataNames.favourites, currentProduct.id) ? (
                  <button
                    onClick={() =>
                      addProduct(DataNames.favourites, currentProduct.id)
                    }
                    className={styles.card__favourites}
                  >
                    <img src="/img/icons/favourites.svg" />
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      removeProduct(DataNames.favourites, currentProduct.id)
                    }
                    className={styles.card__favourites}
                  >
                    <img src="/img/icons/favourites_selected.svg" />
                  </button>
                )}
              </div>

              <div className={styles.card__decription}>
                <div className={styles.card__decriptionItem}>
                  <p className={styles.card__decriptionName}>Screen</p>
                  <p className={styles.card__decriptionValue}>
                    {currentProduct.screen}
                  </p>
                </div>
                <div className={styles.card__decriptionItem}>
                  <p className={styles.card__decriptionName}>Resolution</p>
                  <p className={styles.card__decriptionValue}>
                    {currentProduct.resolution}
                  </p>
                </div>
                <div className={styles.card__decriptionItem}>
                  <p className={styles.card__decriptionName}>Processor</p>
                  <p className={styles.card__decriptionValue}>
                    {currentProduct.processor}
                  </p>
                </div>
                <div className={styles.card__decriptionItem}>
                  <p className={styles.card__decriptionName}>RAM</p>
                  <p className={styles.card__decriptionValue}>
                    {currentProduct.ram}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.card__info}>
            <h1 className={styles.card__infoName}>About</h1>
            {product[0].description.map(el => {
              return (
                <div key={el.title} className={styles.card__intoItem}>
                  <h3 className={styles.card__infoTitle}>{el.title}</h3>
                  <p className={styles.card__infoText}>{el.text}</p>
                </div>
              );
            })}
          </div>

          <div className={styles.card__tech}>
            <h1 className={styles.card__techTitle}>Tech specs</h1>
            {techNames.map(techName => {
              return (
                <div key={techName} className={styles.card__techItem}>
                  <p className={styles.card__techName}>{techName}</p>
                  <p className={styles.card__techValue}>
                    {currentProduct[techName] || 'not found'}
                  </p>
                </div>
              );
            })}
          </div>
          {sameProducts && (
            <div className={styles.card__carousel}>
              <Carousel title={'You may also like'} items={sameProducts} />
            </div>
          )}
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};
