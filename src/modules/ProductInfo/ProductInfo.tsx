import React, { useEffect, useState } from 'react';
import styles from './ProductInfo.module.scss';
import { useInfoProduct } from '../../hooks/useInfoProduct';
import { useParams, useSearchParams } from 'react-router-dom';
import { ProductCard } from '../../shared/types/ProductCard';
import classNames from 'classnames';
import { Loader } from '../../shared/Loader';
import { DataNames } from '../../hooks/useProductsStorage';
import { useStorage } from '../../context/StorageContext';
import { Carousel } from '../../shared/Carousel/Carousel';
import { NavAdress } from '../../shared/NavAdress';
import { getDataPublic } from '../../shared/functions/getDataPublic';
import { Article } from '../../shared/types/Article';

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
  const { category, modelName } = useParams();
  const [params, setParams] = useSearchParams();

  const { product, getProductCard } = useInfoProduct();
  const { findProduct, removeProduct, addProduct } = useStorage();

  const [activeProduct, setActiveProduct] = useState<ProductCard | null>(null);
  const [activeImg, setActiveImg] = useState<string>();
  const [sameProducts, setSameProducts] = useState<Article[] | null>();

  useEffect(() => {
    if (!category || !modelName) {
      return;
    }

    if (
      !Array.isArray(product) ||
      product.length === 0 ||
      product[0].namespaceId !== modelName
    ) {
      getProductCard(modelName, category);

      return;
    }

    if (!activeProduct) {
      setActiveProduct(product[0]);
      setActiveImg(product[0].images[0]);

      return;
    }

    if (!params.get('capacity') || !params.get('color')) {
      const newParams = new URLSearchParams(params);

      newParams.set('capacity', activeProduct.capacity);
      newParams.set('color', activeProduct.color);
      setParams(newParams);

      return;
    }

    const newProduct = product.find(
      el =>
        el.capacity === params.get('capacity') &&
        el.color === params.get('color'),
    );

    if (newProduct) {
      setActiveProduct(newProduct);
      setActiveImg(newProduct.images[0]);
    }
  }, [
    product,
    activeProduct,
    params,
    category,
    getProductCard,
    modelName,
    setParams,
  ]);

  const handleCapacity = (newCapacity: string) => {
    const newParams = new URLSearchParams(params);

    newParams.set('capacity', newCapacity);
    setParams(newParams);
  };

  const handleColor = (newColor: string) => {
    const newParams = new URLSearchParams(params);

    newParams.set('color', newColor);
    setParams(newParams);
  };

  useEffect(() => {
    if (product && activeProduct) {
      getDataPublic('products').then((response: Article[]) => {
        setSameProducts(
          response.filter((el: Article) => el.color === activeProduct?.color),
        );
      });
    }
  }, [activeProduct, category, product]);

  return (
    <div className={styles.card}>
      {product && activeProduct ? (
        <div className={styles.card__content}>
          <div style={{ marginTop: '24px' }} className={styles.card__wrapper}>
            <NavAdress />

            <a
              className={styles.card__backLink}
              href={`/#/${activeProduct.category}`}
            >
              {'< '}
              <span style={{ color: '#89939A' }}>Back</span>
            </a>
            <h1 className={styles.card__title}>{activeProduct.name}</h1>
          </div>
          <div className={styles.card__images}>
            {activeProduct.images.map(image => {
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
                    src={`${import.meta.env.BASE_URL}/${image}`}
                    className={styles.card__miniImage}
                    alt="Product Image"
                  />
                </div>
              );
            })}
          </div>
          <img
            className={styles.card__image}
            src={`${import.meta.env.BASE_URL}/${activeImg}`}
            alt="Product Image"
          />
          <div className={styles.card__parameters}>
            <div className={styles.card__colors}>
              <p className={styles.card__colorsTitle}>Active Colors</p>
              <div className={styles.card__buttons}>
                {activeProduct.colorsAvailable.map(
                  (currentColor: keyof typeof aviableColors) => {
                    return (
                      <div
                        key={currentColor}
                        className={classNames(styles.card__color, {
                          [styles['card__color--active']]:
                            currentColor === activeProduct.color,
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
                {activeProduct.capacityAvailable.map(cap => {
                  return (
                    <button
                      key={cap}
                      className={styles.card__capacityButton}
                      style={{
                        backgroundColor:
                          cap === activeProduct.capacity ? 'black' : 'white',
                        color:
                          cap === activeProduct.capacity ? 'white' : 'black',
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
                  {`$${activeProduct.priceDiscount}`}
                </h2>

                <h2 className={styles.card__priceFull}>
                  {`$${activeProduct.priceRegular}`}
                </h2>
              </div>

              <div className={styles.card__buttons}>
                {!findProduct(DataNames.cart, activeProduct.id) ? (
                  <button
                    onClick={() => {
                      addProduct(DataNames.cart, activeProduct.id);
                    }}
                    className={styles.card__buyButton}
                  >
                    Add to Cart
                  </button>
                ) : (
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      removeProduct(DataNames.cart, activeProduct.id);
                    }}
                    className={classNames(
                      styles.card__buyButton,
                      styles.card__buyButtonActive,
                    )}
                  >
                    Added to Cart
                  </button>
                )}

                {!findProduct(DataNames.favourites, activeProduct.id) ? (
                  <button
                    onClick={() =>
                      addProduct(DataNames.favourites, activeProduct.id)
                    }
                    className={styles.card__favourites}
                  >
                    <img
                      src={`${import.meta.env.BASE_URL}/img/icons/favourites.svg`}
                    />
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      removeProduct(DataNames.favourites, activeProduct.id)
                    }
                    className={styles.card__favourites}
                  >
                    <img
                      src={`${import.meta.env.BASE_URL}/img/icons/favourites_selected.svg`}
                    />
                  </button>
                )}
              </div>

              <div className={styles.card__decription}>
                <div className={styles.card__decriptionItem}>
                  <p className={styles.card__decriptionName}>Screen</p>
                  <p className={styles.card__decriptionValue}>
                    {activeProduct.screen}
                  </p>
                </div>
                <div className={styles.card__decriptionItem}>
                  <p className={styles.card__decriptionName}>Resolution</p>
                  <p className={styles.card__decriptionValue}>
                    {activeProduct.resolution}
                  </p>
                </div>
                <div className={styles.card__decriptionItem}>
                  <p className={styles.card__decriptionName}>Processor</p>
                  <p className={styles.card__decriptionValue}>
                    {activeProduct.processor}
                  </p>
                </div>
                <div className={styles.card__decriptionItem}>
                  <p className={styles.card__decriptionName}>RAM</p>
                  <p className={styles.card__decriptionValue}>
                    {activeProduct.ram}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.card__info}>
            <h1 className={styles.card__infoName}>About</h1>
            {activeProduct.description.map(el => {
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
                    {activeProduct[techName] || 'not found'}
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
