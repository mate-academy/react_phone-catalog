import React, { useEffect, useState } from 'react';
import styles from './ProductInfo.module.scss';
import { useInfoProduct } from '../../hooks/useInfoProduct';
import { useParams, useSearchParams } from 'react-router-dom';
import { ProductCard } from '../../shared/types/ProductCard';
import { Loader } from '../../shared/Loader';
import { Carousel } from '../../shared/Carousel/Carousel';
import { NavAdress } from '../../shared/NavAdress';
import { getDataPublic } from '../../shared/functions/getDataPublic';
import { Article } from '../../shared/types/Article';
import { useTranslation } from 'react-i18next';
import { TechSpecs } from './components/TechSpecs';
import { Parameters } from './components/Parameters';

export const ProductInfo: React.FC = () => {
  const { category, modelName } = useParams();
  const [params, setParams] = useSearchParams();

  const { product, getProductCard } = useInfoProduct();

  const [activeProduct, setActiveProduct] = useState<ProductCard | null>(null);
  const [activeImg, setActiveImg] = useState<string>();
  const [sameProducts, setSameProducts] = useState<Article[] | null>();
  const { t } = useTranslation();

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
              <span style={{ color: '#89939A' }}>{t('inf_back')}</span>
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
          <Parameters
            changeCapacity={handleCapacity}
            changeColor={handleColor}
            currentProduct={activeProduct}
          />

          <div className={styles.card__info}>
            <h1 className={styles.card__infoName}>{t('inf_about')}</h1>
            {activeProduct.description.map(el => {
              return (
                <div key={el.title} className={styles.card__intoItem}>
                  <h3 className={styles.card__infoTitle}>{el.title}</h3>
                  <p className={styles.card__infoText}>{el.text}</p>
                </div>
              );
            })}
          </div>

          <TechSpecs object={activeProduct} />
          {sameProducts && (
            <div className={styles.card__carousel}>
              <Carousel
                title={t('inf_alsoLike')}
                items={sameProducts}
                isInfo={true}
              />
            </div>
          )}
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};
