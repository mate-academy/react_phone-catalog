import { useParams } from 'react-router-dom';
import { Breadcrumbs } from '../../../shared/components/Breadcrumbs';
import styles from './ProductDetailsPage.module.scss';
import { Category, Product, ProductKeys } from '../../../../_types/products';
import { useCallback, useEffect, useState } from 'react';
import {
  filteredByCategory,
  getProducById,
} from '../../../../_services/products';
import { Loader } from '../../../shared/components/Loader';
import { IconButton } from '../../../shared/components/IconButton';
import { BackButton } from '../../../shared/components/BackButton';
import classNames from 'classnames';
import ProductSpecs from '../../../shared/components/ProductSpecs/ProductSpecs';
import { useSlider } from '../../../../_hooks/useSlider';
import { useSwipeable } from 'react-swipeable';
import { ProductsSlider } from '../../../shared/components/ProductsSlider';
import { AddToCardButton } from '../../../shared/components/AddToCardButton';
import { DividedLine } from '../../../shared/components/DividedLine';
import { useProducts } from '../../../../_hooks/useProducts';

export const ProductDetailsPage = () => {
  const { productId } = useParams();
  const {
    data: product,
    loading,
    error,
  } = useProducts(() => getProducById(productId!), 'Failed to fetch product', [
    productId,
  ]);

  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product?.color,
  );
  const [selectedCapacity, setSelectedCapacity] = useState<string | undefined>(
    product?.capacity,
  );
  const [prevProductId, setPrevProductId] = useState<string | null>(null);
  const { currentIndex, handlePrev, handleNext, goToIndex } = useSlider({
    itemCount: product?.details?.images.length || 0,
  });

  const mainSpecKeys: ProductKeys[] = [
    'screen',
    'resolution',
    'processor',
    'ram',
  ];
  const additionalSpecKeys: ProductKeys[] = [
    'capacity',
    'camera',
    'zoom',
    'cell',
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    if (productId !== prevProductId) {
      setPrevProductId(productId || null);
    }

    if (product) {
      setSelectedCapacity(product.details?.capacity);
      setSelectedColor(product.details?.color);
    }
  }, [product, productId, prevProductId]);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handlePrev,
    onSwipedRight: handleNext,
  });

  const getSuggestedProducts = useCallback(
    (products: Product[], category?: Category) => {
      return category
        ? filteredByCategory(category, products).sort(() => Math.random() - 0.5)
        : products;
    },
    [],
  );

  if (loading) {
    return <Loader />;
  }

  if (error || !product) {
    return <p>Product was not found</p>;
  }

  return (
    <div className={styles.productDetails}>
      <Breadcrumbs category={product?.category} productName={productId} />
      <div className={styles.productDetails__backButton}>
        <BackButton />
      </div>

      <div key={productId} className={styles.productDetails__content}>
        <section className={styles.productDetails__details} {...swipeHandlers}>
          <h2 className={styles.productDetails__title}>{product?.name}</h2>

          <img
            src={product?.details?.images[currentIndex]}
            className={styles['productDetails__photo-mask']}
          ></img>

          <div className={styles['productDetails__photo-previews']}>
            {product?.details?.images.map((image, index) => (
              <button
                key={image}
                className={classNames(styles['productDetails__photo-preview'], {
                  [styles['productDetails__photo-preview--selected']]:
                    index === currentIndex,
                })}
                style={{ backgroundImage: `url(${image})` }}
                onClick={() => goToIndex(index)}
              ></button>
            ))}
          </div>
          <div className={styles.productDetails__id}>ID: {product?.id}</div>
          <div className={styles.controls}>
            <div className={styles.controls__box}>
              <div className={styles.controls__title}>Available colors</div>
              <div className={styles.controls__options}>
                {product?.details?.colorsAvailable.map(colorName => (
                  // eslint-disable-next-line jsx-a11y/label-has-associated-control
                  <label htmlFor={colorName} key={colorName}>
                    <input
                      id={colorName}
                      type="radio"
                      name="color"
                      value={colorName}
                      checked={colorName === selectedColor}
                      onChange={() => setSelectedColor(colorName)}
                      className={styles.controls__radio}
                    />
                    <IconButton
                      modificator="selector"
                      backgroundColor={colorName}
                      key={colorName}
                      selected={colorName === selectedColor}
                      onClick={() => setSelectedColor(colorName)}
                    />
                  </label>
                ))}
              </div>
            </div>
            <DividedLine />
            <div className={styles.controls__box}>
              <div className={styles.controls__title}>Select capacity</div>
              <div className={styles.controls__options}>
                {product?.details?.capacityAvailable.map(capacity => (
                  <label key={capacity} className={styles.controls__capacity}>
                    <input
                      className={styles.controls__radio}
                      type="radio"
                      name="capacity"
                      value={capacity}
                      checked={capacity === selectedCapacity}
                      onChange={() => setSelectedCapacity(capacity)}
                    />
                    {capacity}
                  </label>
                ))}
              </div>
            </div>
            <DividedLine />
            <div className={styles['controls__buttons-prices']}>
              <div className={styles['controls__prices-box']}>
                <div>&#36;{product?.price}</div>
                <div className={styles['controls__full-price']}>
                  &#36;{product?.fullPrice}
                </div>
              </div>
              <AddToCardButton product={product} height="48" />
            </div>
            {product && <ProductSpecs product={product} keys={mainSpecKeys} />}
          </div>
        </section>

        <section className={styles.productDetails__about}>
          <article className={styles.productDetails__article}>
            <h3>About</h3>
            <DividedLine />
          </article>

          {product.details?.description.map(item => (
            <article
              key={item.title}
              className={styles.productDetails__article}
            >
              <h4>{item.title}</h4>
              <div>
                {item.text.map((paragraph, index, array) => (
                  <p key={paragraph} className={styles.about__text}>
                    {paragraph}
                    {index !== array.length - 1 ? (
                      <>
                        <br />
                        <br />
                      </>
                    ) : null}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </section>
        <section className={styles.productDetails__specs}>
          <article className={styles.productDetails__article}>
            <h3>Tech specs</h3>
            <DividedLine />
          </article>
          {product && (
            <ProductSpecs
              product={product}
              keys={[...mainSpecKeys, ...additionalSpecKeys]}
              bodyText={true}
            />
          )}
        </section>
        <section className={styles.productDetails__slider}>
          <ProductsSlider
            title="You may also like"
            sortFn={products =>
              getSuggestedProducts(products, product.category)
            }
          />
        </section>
      </div>
    </div>
  );
};
