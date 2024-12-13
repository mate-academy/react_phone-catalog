import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames';

import styles from './CardPage.module.scss';

import { Breadcrumbs } from '../../components/Breadcrumbs';
import { GoToBack } from '../../components/GoToBack';

import { ProductData } from '../../types/ProductData';

import { getData } from '../../utils/fetchClients';
import { ImagesBlock } from '../../components/ImagesBlock';
import { Price } from '../../components/Price';
import { Product } from '../../types/Product';
import { ActionsButtons } from '../../components/ActionsButtons';
import { ProductsSlider } from '../../components/ProductsSlider';
import { Loader } from '../../components/Loader';

type QuizParams = {
  itemId: string;
};

export const CardPage = () => {
  const { itemId } = useParams<QuizParams>();
  const [category, setCategory] = useState<string | undefined>();
  const [product, setProduct] = useState<Product | undefined>();
  const [productData, setProductData] = useState<ProductData | undefined>();
  const [products, setProducts] = useState<Product[]>([]);
  const [productsOfCategory, setProductsOfCategory] = useState<ProductData[]>(
    [],
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    getData<Product[]>(`api/products.json`)
      .then(items => {
        const itemData = items.find(item => item.itemId === itemId);

        setProducts(items);
        setProduct(itemData);
        setCategory(itemData?.category);

        return itemData?.category;
      })
      .then(categoryData => {
        return getData<ProductData[]>(`api/${categoryData}.json`);
      })
      .then(listItems => {
        const item = listItems.find(({ id }) => id === itemId);

        setProductData(item);
        setProductsOfCategory(listItems);
      })
      .catch(() => {
        setError('Не вдалося завантажити дані. Спробуйте ще раз.');

        setTimeout(() => {
          navigate('..');
          setError(null);
        }, 2000);
      })
      .finally(() => setLoading(false));
  }, [navigate, itemId]);

  const getLink = (option: string, value: string) => {
    if (!productData) {
      return '';
    }

    const {
      color: itemColor,
      namespaceId: itemNamespaceId,
      capacity: itemCapacity,
    } = productData;

    const el = productsOfCategory.find(({ color, namespaceId, capacity }) => {
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

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!product || !productData) {
    return <div>От халепа!!!</div>;
  }

  return (
    <section className={classNames('section', styles['card-page'])}>
      <Breadcrumbs
        products={[]}
        classNameProps={styles['card-page__breadcrumbs']}
      />

      <GoToBack />

      <h1 className={classNames('subTitle', styles['card-page__title'])}>
        {productData?.name}
      </h1>

      {productData && (
        <ImagesBlock
          product={productData}
          classNameProp={styles['card-page__image-block']}
        />
      )}

      <div
        className={classNames(
          styles['card-page__main-controls'],
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

        <Price
          price={product.price}
          fullPrice={product.fullPrice}
          withFullPrice={true}
          classNameProp={styles['main-controls__price']}
        />

        <ActionsButtons product={product} />

        <div
          className={classNames(
            styles.mainControls__info,
            styles.info,
            styles['info--small'],
          )}
        >
          <div className={styles.info__item}>
            <span className={styles.info__name}>Screen</span>

            <span className={styles.info__value}>{productData.screen}</span>
          </div>

          <div className={styles.info__item}>
            <span className={styles.info__name}>Resolution</span>

            <span className={styles.info__value}>{productData.resolution}</span>
          </div>

          <div className={styles.info__item}>
            <span className={styles.info__name}>Processor</span>

            <span className={styles.info__value}>{productData.processor}</span>
          </div>

          <div className={styles.info__item}>
            <span className={styles.info__name}>RAM</span>

            <span className={styles.info__value}>{productData.ram}</span>
          </div>
        </div>
      </div>

      <div
        className={classNames(
          styles['card-page__about'],
          styles['content-block'],
        )}
      >
        <h3 className={styles['content-block__title']}>About</h3>

        <hr className="divider" />

        {productData.description.map(({ text }, index) => {
          return (
            <article
              key={index}
              className={styles['content-block__description']}
            >
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
          styles['card-page__tech-specs'],
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

            <span className={styles.info__value}>{productData.screen}</span>
          </div>

          <div className={styles.info__item}>
            <span className={styles.info__name}>Resolution</span>

            <span className={styles.info__value}>{productData.resolution}</span>
          </div>

          <div className={styles.info__item}>
            <span className={styles.info__name}>Processor</span>

            <span className={styles.info__value}>{productData.processor}</span>
          </div>

          <div className={styles.info__item}>
            <span className={styles.info__name}>RAM</span>

            <span className={styles.info__value}>{productData.ram}</span>
          </div>

          <div className={styles.info__item}>
            <span className={styles.info__name}>Built in memory</span>

            <span className={styles.info__value}>{productData.capacity}</span>
          </div>

          {category !== 'accessories' ? (
            <>
              <div className={styles.info__item}>
                <span className={styles.info__name}>Camera</span>

                <span className={styles.info__value}>{productData.camera}</span>
              </div>

              <div className={styles.info__item}>
                <span className={styles.info__name}>Zoom</span>

                <span className={styles.info__value}>{productData.zoom}</span>
              </div>
            </>
          ) : null}

          <div className={styles.info__item}>
            <span className={styles.info__name}>Cell</span>

            <span className={styles.info__value}>
              {productData.cell.join(', ')}
            </span>
          </div>
        </div>
      </div>

      <div className={styles['card-page__slider']}>
        <h2
          className={classNames(
            'sub-title',
            styles['sub-title'],
            styles['sub-title--short'],
          )}
        >
          You may also like
        </h2>

        <ProductsSlider products={products} />
      </div>
    </section>
  );
};
