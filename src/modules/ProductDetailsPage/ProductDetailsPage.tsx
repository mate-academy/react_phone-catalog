import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getColorHex } from '../shared/utils/productHelpers';
import cn from 'classnames';
import {
  getProductDetails,
  getProducts,
  getSuggestedProducts,
} from '../shared/api/products';
import type {
  Product,
  ProductCategory,
  ProductDetails as ProductDetailsType,
} from '../shared/types';
import { useCart } from '../shared/context/CartContext';
import { useFavorites } from '../shared/context/FavoritesContext';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import { BackButton } from '../shared/components/BackButton';
import { Loader } from '../shared/components/Loader';
import { Icon } from '../shared/components/Icon';
import { ProductsSlider } from '../shared/components/ProductsSlider';
import { ProductImages } from './components/ProductImages';
import styles from './ProductDetailsPage.module.scss';

const categoryLabels: Record<ProductCategory, string> = {
  phones: 'Phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

export const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();

  const [details, setDetails] = useState<ProductDetailsType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  const { isInCart, addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    if (!productId) {
      return;
    }

    setIsLoading(!details);
    setNotFound(false);

    getProductDetails(productId)
      .then(result => {
        if (!result) {
          setNotFound(true);

          return;
        }

        setDetails(result);
      })
      .catch(() => setNotFound(true))
      .finally(() => setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  useEffect(() => {
    getProducts().then(setAllProducts);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (notFound || !details) {
    return <p className={styles.notFound}>Product was not found</p>;
  }

  const product = allProducts.find(item => item.itemId === details.id);

  const inCart = isInCart(details.id);
  const favorite = isFavorite(details.id);

  const changeVariant = (capacity: string, color: string) => {
    const newId = details.namespaceId
      ? `${details.namespaceId}-${capacity.toLowerCase()}-${color.toLowerCase()}`
      : details.id;

    navigate(`/product/${newId}`);
  };

  const suggested = getSuggestedProducts(allProducts, details.id, 8);

  return (
    <div className={styles.wrapper}>
      <Breadcrumbs
        items={[
          { label: 'Home', to: '/' },
          {
            label: categoryLabels[details.category],
            to: `/${details.category}`,
          },
          { label: details.name },
        ]}
      />

      <BackButton to={`/${details.category}`} />

      <div className={styles.layout}>
        <ProductImages images={details.images} name={details.name} />

        <div>
          <h1 className={styles.title}>{details.name}</h1>

          {details.colorsAvailable.length > 0 && (
            <div className={styles.optionGroup}>
              <div className={styles.optionLabel}>
                <span>Available colors</span>
              </div>
              <div className={styles.swatches}>
                {details.colorsAvailable.map(color => (
                  <label key={color} className={styles.colorLabel}>
                    <input
                      type="radio"
                      name="color"
                      value={color}
                      checked={color === details.color}
                      onChange={() => changeVariant(details.capacity, color)}
                      className={styles.visuallyHidden}
                    />

                    <span
                      className={cn(styles.colorSwatch, {
                        [styles.active]: color === details.color,
                      })}
                      style={{ backgroundColor: getColorHex(color) }}
                      aria-label={color}
                    />
                  </label>
                ))}
              </div>
            </div>
          )}

          {details.capacityAvailable.length > 0 && (
            <div className={styles.optionGroup}>
              <div className={styles.optionLabel}>
                <span>Select capacity</span>
              </div>
              <div className={styles.swatches}>
                {details.capacityAvailable.map(capacity => (
                  <label key={capacity} className={styles.capacityLabel}>
                    <input
                      type="radio"
                      name="capacity"
                      value={capacity}
                      checked={capacity === details.capacity}
                      onChange={() => changeVariant(capacity, details.color)}
                      className={styles.visuallyHidden}
                    />

                    <span
                      className={cn(styles.capacityOption, {
                        [styles.active]: capacity === details.capacity,
                      })}
                    >
                      {capacity}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}

          <div className={styles.divider} />

          <div className={styles.prices}>
            <span className={styles.price}>${details.priceDiscount}</span>
            {details.priceRegular > details.priceDiscount && (
              <span className={styles.fullPrice}>${details.priceRegular}</span>
            )}
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              disabled={!product}
              className={cn(styles.addButton, { [styles.added]: inCart })}
              onClick={() => product && addToCart(product)}
            >
              {inCart ? 'Added to cart' : 'Add to cart'}
            </button>

            <button
              type="button"
              disabled={!product}
              className={cn(styles.favButton, { [styles.active]: favorite })}
              aria-label={
                favorite ? 'Remove from favorites' : 'Add to favorites'
              }
              onClick={() => product && toggleFavorite(product)}
            >
              <Icon name={favorite ? 'heart-filled' : 'heart'} />
            </button>
          </div>

          <dl className={styles.shortSpecs}>
            <div>
              <dt>Screen</dt>
              <dd>{details.screen}</dd>
            </div>
            <div>
              <dt>Resolution</dt>
              <dd>{details.resolution}</dd>
            </div>
            <div>
              <dt>Processor</dt>
              <dd>{details.processor}</dd>
            </div>
            <div>
              <dt>RAM</dt>
              <dd>{details.ram}</dd>
            </div>
          </dl>
        </div>
      </div>

      <section className={styles.about}>
        <h2 className={styles.aboutTitle}>About</h2>
        {details.description.map(block => (
          <div className={styles.aboutSection} key={block.title}>
            <h3 className={styles.aboutSubheader}>{block.title}</h3>
            {block.text.map(paragraph => (
              <p className={styles.aboutText} key={paragraph.slice(0, 24)}>
                {paragraph}
              </p>
            ))}
          </div>
        ))}
      </section>

      <section className={styles.techSpecs}>
        <h2 className={styles.aboutTitle}>Tech specs</h2>
        <dl className={styles.techSpecsList}>
          <div className={styles.techSpecRow}>
            <dt>Screen</dt>
            <dd>{details.screen}</dd>
          </div>
          <div className={styles.techSpecRow}>
            <dt>Resolution</dt>
            <dd>{details.resolution}</dd>
          </div>
          <div className={styles.techSpecRow}>
            <dt>Processor</dt>
            <dd>{details.processor}</dd>
          </div>
          <div className={styles.techSpecRow}>
            <dt>RAM</dt>
            <dd>{details.ram}</dd>
          </div>
          {details.camera && (
            <div className={styles.techSpecRow}>
              <dt>Camera</dt>
              <dd>{details.camera}</dd>
            </div>
          )}
          {details.zoom && (
            <div className={styles.techSpecRow}>
              <dt>Zoom</dt>
              <dd>{details.zoom}</dd>
            </div>
          )}
          {details.cell && (
            <div className={styles.techSpecRow}>
              <dt>Cell</dt>
              <dd>{details.cell.join(', ')}</dd>
            </div>
          )}
        </dl>
      </section>

      <ProductsSlider title="You may also like" products={suggested} />
    </div>
  );
};
