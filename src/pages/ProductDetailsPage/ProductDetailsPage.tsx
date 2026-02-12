import { NavLink, useNavigate, useParams } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import styles from './ProductDetailsPage.module.scss';
import React, { useEffect, useMemo, useState } from 'react';
import { Product } from '../../types/Product';
import classNames from 'classnames';
import { GoBack } from '../../components/GoBack';
import { ProductData } from '../../types/ProductData';
import {
  getCategoryData,
  getProducts,
  getSuggestedProducts,
} from '../../api/api';
import { Loader } from '../../components/Loader';
import { ImagesBlock } from '../../components/ImagesBlock';
import { ActionButtons } from '../../components/Button';
import { ProductsSlider } from '../../components/ProductsSlider';
import { BreadCrumbs } from '../../components/BreadCrumbs';

export const ProductDetailsPage = () => {
  const { productId } = useParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [product, setProduct] = useState<Product | undefined>();
  const [category, setCategory] = useState<string | undefined>();
  const [productData, setProductData] = useState<ProductData | undefined>();
  const [categoryProducts, setCategoryProducts] = useState<ProductData[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    getProducts()
      .then(productsData => {
        setProducts(productsData);

        const itemData = productsData.find(item => item.itemId === productId);

        setProduct(itemData);
        setCategory(itemData?.category);

        return itemData?.category;
      })
      .then(categoryData => {
        return getCategoryData(categoryData);
      })
      .then(listProducts => {
        const item = listProducts.find(el => el.id === productId);

        setProductData(item);
        setCategoryProducts(listProducts);
      })
      .catch(() => {
        setError('Unable to load data');

        setTimeout(() => {
          navigate('..');
          setError(null);
        }, 5000);
      })
      .finally(() => setLoading(false));
  }, [productId, navigate]);

  const getLink = (option: string, value: string) => {
    if (!productData) {
      return '';
    }

    const {
      color: itemColor,
      namespaceId: itemNamespaceId,
      capacity: itemCapacity,
    } = productData;

    const el = categoryProducts.find(({ color, namespaceId, capacity }) => {
      return (
        namespaceId === itemNamespaceId &&
        ((option === 'color' && color === value && capacity === itemCapacity) ||
          (option === 'capacity' && capacity === value && color === itemColor))
      );
    });

    return el?.id ?? '';
  };

  const getLinkStyle = (isActive: boolean, color: string) => {
    const newColor = color.replace(' ', '');

    return classNames('circle-color', `circle-color--${newColor}`, {
      [`circle-color--active`]: isActive,
    });
  };

  const suggestedProducts = useMemo(
    () => getSuggestedProducts(products, 10),
    [products],
  );

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div style={{ marginTop: 50 }}>
        <Alert severity="error">{error}</Alert>
      </div>
    );
  }

  if (categoryProducts.length === 0 && !error && !loading) {
    return (
      <div style={{ marginTop: 50 }}>
        <Alert severity="warning">Product was not found</Alert>
      </div>
    );
  }

  return (
    <section className={classNames('section', styles['product-details'])}>
      {/* 👇 2. ДОДАНО КОМПОНЕНТ */}
      <BreadCrumbs
        products={products}
        classNameProps={styles['product-details__breadcrumbs']}
      />

      <GoBack classNameProps={styles['product-details__back']} />

      <h1 className={classNames('sub-title', styles['product-details__title'])}>
        {productData?.name}
      </h1>

      {productData && (
        <ImagesBlock
          product={productData}
          classNameProp={styles['product-details__image-block']}
        />
      )}

      <div
        className={classNames(
          styles['product-details__main-controls'],
          styles['main-controls'],
          styles['content-block'],
        )}
      >
        <div
          className={classNames(
            styles['main-controls__available-colors'],
            styles['available-colors'],
          )}
        >
          <p
            className={classNames(
              styles['available-colors__title-info'],
              styles['title-info'],
            )}
          >
            Available colors
          </p>
          <div className={styles['available-colors__row']}>
            {productData?.colorsAvailable.map(color => {
              return (
                <NavLink
                  key={color}
                  to={`/${category}/${getLink('color', color)}`}
                  className={({ isActive }) => getLinkStyle(isActive, color)}
                ></NavLink>
              );
            })}
          </div>
        </div>

        <hr className="divider" />

        <div
          className={classNames(
            styles['main-controls__capacity-available'],
            styles['capacity-available'],
          )}
        >
          <p
            className={classNames(
              styles['available-colors__title-info'],
              styles['title-info'],
            )}
          >
            Select capacity
          </p>

          <div className={styles['capacity-available__row']}>
            {productData?.capacityAvailable.map(capacity => {
              return (
                <NavLink
                  key={capacity}
                  to={`/${category}/${getLink('capacity', capacity)}`}
                  className={({ isActive }) =>
                    classNames(styles.capacity, {
                      [styles['capacity--active']]: isActive,
                    })
                  }
                >
                  {capacity}
                </NavLink>
              );
            })}
          </div>
        </div>

        <hr className="divider" />

        <p className={styles['main-controls__price']}>
          ${product?.price}
          &nbsp;
          <span>${product?.fullPrice}</span>
        </p>

        {product && <ActionButtons product={product} />}

        <div
          className={classNames(
            styles.mainControls__info,
            styles.info,
            styles['info--small'],
          )}
        >
          <div className={styles.info__item}>
            <span className={styles.info__name}>Screen</span>

            <span className={styles.info__value}>{productData?.screen}</span>
          </div>

          <div className={styles.info__item}>
            <span className={styles.info__name}>Resolution</span>

            <span className={styles.info__value}>
              {productData?.resolution}
            </span>
          </div>

          <div className={styles.info__item}>
            <span className={styles.info__name}>Processor</span>

            <span className={styles.info__value}>{productData?.processor}</span>
          </div>

          <div className={styles.info__item}>
            <span className={styles.info__name}>RAM</span>

            <span className={styles.info__value}>{productData?.ram}</span>
          </div>
        </div>
      </div>

      <div
        className={classNames(
          styles['product-details__about'],
          styles['content-block'],
        )}
      >
        <h3 className={styles['content-block__title']}>About</h3>

        <hr className="divider" />

        {productData?.description.map(({ title, text }, index) => {
          return (
            <article
              key={index}
              className={styles['content-block__description']}
            >
              <h4 className={styles['content-block__heading']}>{title}</h4>
              {text.map((paragraph, i) => {
                return (
                  <React.Fragment key={i}>
                    <p className={styles['content-block__text']}>{paragraph}</p>
                  </React.Fragment>
                );
              })}
            </article>
          );
        })}
      </div>

      <div
        className={classNames(
          styles['product-details__tech-specs'],
          styles['content-block'],
        )}
      >
        <h3 className={classNames(styles['content-block__title'])}>
          Tech specs
        </h3>

        <hr className="divider" />

        <div className={styles.info}>
          <div className={styles.info__item}>
            <span className={styles.info__name}>Screen</span>

            <span className={styles.info__value}>{productData?.screen}</span>
          </div>

          <div className={styles.info__item}>
            <span className={styles.info__name}>Resolution</span>

            <span className={styles.info__value}>
              {productData?.resolution}
            </span>
          </div>

          <div className={styles.info__item}>
            <span className={styles.info__name}>Processor</span>

            <span className={styles.info__value}>{productData?.processor}</span>
          </div>

          <div className={styles.info__item}>
            <span className={styles.info__name}>RAM</span>

            <span className={styles.info__value}>{productData?.ram}</span>
          </div>

          <div className={styles.info__item}>
            <span className={styles.info__name}>Built in memory</span>

            <span className={styles.info__value}>{productData?.capacity}</span>
          </div>

          {category !== 'accessories' ? (
            <>
              <div className={styles.info__item}>
                <span className={styles.info__name}>Camera</span>

                <span className={styles.info__value}>
                  {productData?.camera}
                </span>
              </div>

              <div className={styles.info__item}>
                <span className={styles.info__name}>Zoom</span>

                <span className={styles.info__value}>{productData?.zoom}</span>
              </div>
            </>
          ) : null}

          <div className={styles.info__item}>
            <span className={styles.info__name}>Cell</span>

            <span className={styles.info__value}>
              {productData?.cell.join(', ')}
            </span>
          </div>
        </div>
      </div>

      <div className={styles['product-details__slider']}>
        <h2
          className={classNames(
            'sub-title',
            styles['sub-title'],
            styles['sub-title--short'],
          )}
        >
          You may also like
        </h2>

        <ProductsSlider products={suggestedProducts} />
      </div>
    </section>
  );
};
