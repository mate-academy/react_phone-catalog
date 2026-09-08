import React, { useEffect, useMemo, useState } from 'react';
import styles from './ProductDetailsPage.module.scss';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { useNavigate, useParams } from 'react-router-dom';
import { ProductsType } from '../../types/ProductsType';
import { Loader } from '../../components/Loader';
import { Button } from '../../components/Button';
import { useSwipeable } from 'react-swipeable';
import { ProductsSlider } from '../../components/ProductsSlider';
import { getSuggestedProducts } from '../../utils/getSuggestedProducts';
import classNames from 'classnames';
import { BackLink } from '../../components/BackLink';
import { PaymentsButtons } from '../../components/PaymentsButtons';
import {
  productColors,
  ProductColorsType,
} from '../../types/ProductColorsType';
import { useCategoriesRTK } from '../../hooks/useCategoriesRTK';

interface Props {
  category: ProductsType;
}

enum VariantChangeType {
  VariantColor = 'color',
  VariantCapacity = 'capacity',
}

export const ProductDetailsPage = ({ category }: Props) => {
  const { productId } = useParams();
  const { categorie: products, loading, error } = useCategoriesRTK(category);
  const {
    categorie: allProducts,
    loading: allProductsLoading,
    error: allProductsError,
  } = useCategoriesRTK(ProductsType.Products);

  const navigate = useNavigate();

  const product = useMemo(() => {
    return products.find(el => el.id === productId);
  }, [products, productId]);

  const [currentPhoto, setCurrentPhoto] = useState<string | undefined>(
    undefined,
  );

  const handlersSwipe = useSwipeable({
    onSwipedLeft: () => {
      if (!product?.images || !currentPhoto) {
        return;
      }

      const currentIndex = product.images.indexOf(currentPhoto);
      const nextIndex = Math.min(currentIndex + 1, product.images.length - 1);

      setCurrentPhoto(product.images[nextIndex]);
    },
    onSwipedRight: () => {
      if (!product?.images || !currentPhoto) {
        return;
      }

      const currentIndex = product.images.indexOf(currentPhoto);
      const prevIndex = Math.max(currentIndex - 1, 0);

      setCurrentPhoto(product.images[prevIndex]);
    },
    trackMouse: true,
  });

  useEffect(() => {
    if (product?.images?.length) {
      setCurrentPhoto(product.images[0]);
    }
    // else {
    // setCurrentPhoto('img/accessories/apple-watch-series-4/silver/00.webp'); // любе фото якщо немає основного
    // }
  }, [product, setCurrentPhoto]);

  useEffect(() => {
    if (error || !product) {
      const timeout = setTimeout(() => {
        navigate('/');
      }, 3000);

      return () => clearTimeout(timeout);
    }

    return undefined;
  }, [error, product, navigate]);

  if (loading) {
    return <Loader />;
  }

  if (error || !product) {
    return (
      <div>
        <img
          className={`not-found__img ${styles['product-details__not-found-img']}`}
          src="img/product-not-found.png"
          alt="productNotFound"
        />
        <h3 className={styles['product-details__not-found-title']}>
          Product was not found
        </h3>
      </div>
    );
  }

  const descriptionItems = [
    { title: 'Screen', value: product.screen },
    { title: 'Resolution', value: product.resolution },
    { title: 'Processor', value: product.processor },
    { title: 'RAM', value: product.ram },
    { title: 'Built in memory', value: product.capacity },
    { title: 'Camera', value: product.camera },
    { title: 'Zoom', value: product.zoom },
    { title: 'Cell', value: product.cell.join(', ') },
  ];

  const InfoBlock = ({ isSmall = false }: { isSmall?: boolean }) => {
    const normalizedItems = isSmall
      ? descriptionItems.slice(0, 4)
      : descriptionItems;

    return (
      <div className={styles['product-details__info']}>
        {normalizedItems.map(({ title, value }) => {
          if (!value) {
            return;
          }

          return (
            <div className={styles['product-details__info-row']} key={value}>
              <p
                className={classNames(styles['product-details__info-title'], {
                  'body-text': !isSmall,
                  'small-text': isSmall,
                })}
              >
                {title}
              </p>
              <p
                className={classNames(
                  styles['product-details__info-description'],
                  { 'body-text': !isSmall },
                )}
              >
                {value}
              </p>
            </div>
          );
        })}
      </div>
    );
  };

  const handleVariantChange = (key: VariantChangeType, value: string) => {
    const currentProduct =
      products.find(
        findItem =>
          findItem.namespaceId === product.namespaceId &&
          findItem[key] === value &&
          findItem.color ===
            (key === VariantChangeType.VariantCapacity
              ? product.color
              : value) &&
          findItem.capacity ===
            (key === VariantChangeType.VariantColor ? product.capacity : value),
      ) || product;

    navigate(`/${product.category}/${currentProduct.id}`, {
      state: { keepScroll: true },
    });
  };

  const ChangeOptionsBlock = ({
    variantChange,
    title,
  }: {
    variantChange: VariantChangeType;
    title: string;
  }) => {
    const normalizedItems = [];

    switch (variantChange) {
      case VariantChangeType.VariantColor:
        normalizedItems.push(...product.colorsAvailable);
        break;
      case VariantChangeType.VariantCapacity:
        normalizedItems.push(...product.capacityAvailable);
        break;
      default:
        return;
    }

    return (
      <div className={styles['product-details__options']}>
        <div
          className={`small-text ${styles['product-details__options-block']}`}
        >
          <p
            className={`small-text ${styles['product-details__options-title']}`}
          >
            {title}
          </p>
          <div className={styles['product-details__options-buttons']}>
            {normalizedItems.map(el => {
              const normalizedColor = el.split(' ').join('');
              const color =
                productColors[normalizedColor as keyof ProductColorsType] || el;

              return (
                <Button
                  key={el}
                  className="body-text"
                  isCapacity={
                    variantChange === VariantChangeType.VariantCapacity
                  }
                  isRatio={variantChange === VariantChangeType.VariantColor}
                  isCircle={variantChange === VariantChangeType.VariantColor}
                  isSelected={product[variantChange] === el}
                  disabled={product[variantChange] === el}
                  style={{
                    color:
                      variantChange === VariantChangeType.VariantColor
                        ? color
                        : '',
                  }}
                  onClick={() => handleVariantChange(variantChange, el)}
                >
                  {variantChange === VariantChangeType.VariantCapacity && el}
                </Button>
              );
            })}
          </div>
        </div>
        <hr className={styles['product-details__options-line']} />
      </div>
    );
  };

  const DescriptionBlock = ({
    children,
    title,
    className,
  }: {
    children: React.ReactNode;
    title: string;
    className?: string;
  }) => {
    return (
      <div
        className={classNames(
          styles['product-details__description-block'],
          className,
        )}
      >
        <div className={styles['product-details__description-title']}>
          <h3>{title}</h3>
          <hr className={styles['product-details__description-line']} />
        </div>

        {children}
      </div>
    );
  };

  return (
    <div className={`container ${styles['product-details']}`}>
      <Breadcrumbs lastTitle={product.name} />
      <div className="page__info">
        <BackLink category={product.category as ProductsType} />
        <h1>{product.name}</h1>
      </div>
      <section className={`section ${styles['product-details__main']}`}>
        <img
          className={styles['product-details__photo-big']}
          src={currentPhoto}
          alt="photo"
          draggable={false}
          {...handlersSwipe}
        />
        <div className={styles['product-details__photos-wrapper']}>
          {product.images.map(img => (
            <div
              key={img}
              className={styles['product-details__photo-frame']}
              onClick={() => setCurrentPhoto(img)}
            >
              <img
                className={styles['product-details__photo-small']}
                src={img}
                alt="small-photo"
              />
            </div>
          ))}
        </div>
        <div className={styles['product-details__controls']}>
          <ChangeOptionsBlock
            title={'Available colors'}
            variantChange={VariantChangeType.VariantColor}
          />
          <ChangeOptionsBlock
            title={'Select capacity'}
            variantChange={VariantChangeType.VariantCapacity}
          />
          <div className={styles['product-details__payment']}>
            <div className={styles['product-details__price']}>
              <h2>${product.priceDiscount}</h2>
              <p className={styles['product-details__price-old']}>
                ${product.priceRegular}
              </p>
            </div>
            <PaymentsButtons product={product.id} isPage={true} />
          </div>
          <InfoBlock isSmall={true} />
        </div>
      </section>

      <section className={`section ${styles['product-details__description']}`}>
        <DescriptionBlock
          title="About"
          className={styles['product-details__description-block--left']}
        >
          {product.description.map((el, i) => (
            <div
              key={i}
              className={styles['product-details__description-content']}
            >
              <h4>{el.title}</h4>

              {el.text.map((part, partI) => (
                <p
                  key={partI}
                  className={`body-text ${styles['product-details__description-content-text']}`}
                >
                  {part}
                </p>
              ))}
            </div>
          ))}
        </DescriptionBlock>

        <DescriptionBlock
          title="About"
          className={styles['product-details__description-block--right']}
        >
          <InfoBlock />
        </DescriptionBlock>
      </section>

      {allProductsLoading ? (
        <Loader />
      ) : allProductsError ? (
        'error'
      ) : (
        <section className="section">
          <ProductsSlider
            title={'You may also like'}
            products={getSuggestedProducts(product, allProducts)}
          />
        </section>
      )}
    </div>
  );
};
