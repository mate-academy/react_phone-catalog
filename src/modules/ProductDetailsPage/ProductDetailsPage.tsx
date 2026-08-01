import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useNavigationType, useParams } from 'react-router-dom';
import cn from 'classnames';
import { Product, ProductWithVariants } from '@shared/types';
import { getProductDetails, getSuggestedProducts } from '@shared/api';
import { useCart, useFavourites, useTranslation } from '@shared/context';
import {
  chevronRightGrayIcon,
  favouritesFilledIcon,
  favouritesIcon,
} from '@shared/assets/icons';
import { Breadcrumbs } from '@shared/components/Breadcrumbs';
import { ProductsSlider } from '@shared/components/ProductsSlider';
import { ProductDetailsSkeleton } from './components/ProductDetailsSkeleton';
import { CapacityPicker } from './components/CapacityPicker';
import { ColorPicker } from './components/ColorPicker';
import { ProductGallery } from './components/ProductGallery';
import { TechSpecs } from './components/TechSpecs';
import { CATEGORY_BREADCRUMBS } from './constants';
import { findVariantId, getFullSpecs, getShortSpecs } from './utils';
import styles from './ProductDetailsPage.module.scss';

export const ProductDetailsPage = () => {
  const { productId = '' } = useParams();
  const navigate = useNavigate();
  const navigationType = useNavigationType();
  const { t } = useTranslation();

  const [product, setProduct] = useState<ProductWithVariants | null>(null);
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const { isFavourite, toggleFavourite } = useFavourites();
  const { isInCart, addToCart, removeFromCart } = useCart();

  const loadProduct = useCallback(() => {
    setIsLoading(true);
    setHasError(false);

    getProductDetails(productId)
      .then(setProduct)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, [productId]);

  useEffect(loadProduct, [loadProduct]);

  useEffect(() => {
    getSuggestedProducts(productId)
      .then(setSuggestedProducts)
      .catch(() => {});
  }, [productId]);

  useEffect(() => {
    // Picking another color or capacity replaces the URL — the reader stays
    // where they are. Opening a different product starts at the top.
    if (navigationType !== 'REPLACE') {
      window.scrollTo({ top: 0 });
    }
  }, [productId, navigationType]);

  if (isLoading) {
    return (
      <div className={styles.page}>
        <ProductDetailsSkeleton />
      </div>
    );
  }

  if (hasError) {
    return (
      <div className={styles.page}>
        <div className={styles.message}>
          <p>{t('common.somethingWentWrong')}</p>

          <button
            type="button"
            className={styles.reloadButton}
            onClick={loadProduct}
          >
            {t('common.reload')}
          </button>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className={styles.page}>
        <div className={styles.message}>
          <p>{t('details.notFound')}</p>

          <img
            src="img/product-not-found.png"
            alt=""
            className={styles.messageImage}
          />
        </div>
      </div>
    );
  }

  const { details, variants, itemId, card } = product;
  const isAddedToFavourites = isFavourite(itemId);
  const isAddedToCart = isInCart(itemId);
  const {
    name,
    images,
    category,
    colorsAvailable,
    color,
    capacityAvailable,
    capacity,
    priceRegular,
    priceDiscount,
    description,
  } = details;

  const goToVariant = (change: { color?: string; capacity?: string }) => {
    const variantId = findVariantId(variants, details, change);

    if (variantId) {
      navigate(`/product/${variantId}`, { replace: true });
    }
  };

  const isColorAvailable = (value: string) =>
    Boolean(findVariantId(variants, details, { color: value }));

  const isCapacityAvailable = (value: string) =>
    Boolean(findVariantId(variants, details, { capacity: value }));

  return (
    <div className={styles.page}>
      <Breadcrumbs
        crumbs={[
          {
            title: t(CATEGORY_BREADCRUMBS[category].titleKey),
            path: CATEGORY_BREADCRUMBS[category].path,
          },
          { title: name },
        ]}
      />

      <button
        type="button"
        className={styles.back}
        onClick={() => navigate(-1)}
      >
        <img
          src={chevronRightGrayIcon}
          alt=""
          className={cn('icon-muted', styles.backIcon)}
        />
        {t('common.back')}
      </button>

      <h1 className={styles.title}>{name}</h1>

      <div className={styles.top}>
        <ProductGallery images={images} name={name} />

        <div className={styles.controls}>
          <ColorPicker
            colors={colorsAvailable}
            selectedColor={color}
            isColorAvailable={isColorAvailable}
            onSelect={value => goToVariant({ color: value })}
          />

          <span className={styles.divider} />

          <CapacityPicker
            capacities={capacityAvailable}
            selectedCapacity={capacity}
            isCapacityAvailable={isCapacityAvailable}
            onSelect={value => goToVariant({ capacity: value })}
          />

          <span className={styles.divider} />

          <p className={styles.price}>
            <span className={styles.currentPrice}>{`$${priceDiscount}`}</span>

            {priceRegular > priceDiscount && (
              <span className={styles.fullPrice}>{`$${priceRegular}`}</span>
            )}
          </p>

          <div className={styles.buttons}>
            <button
              type="button"
              className={cn(styles.addToCart, {
                [styles.addToCartActive]: isAddedToCart,
              })}
              disabled={!card}
              aria-pressed={isAddedToCart}
              onClick={() =>
                isAddedToCart ? removeFromCart(itemId) : card && addToCart(card)
              }
            >
              {isAddedToCart ? t('common.addedToCart') : t('common.addToCart')}
            </button>

            <button
              type="button"
              className={styles.favourite}
              aria-label={
                isAddedToFavourites
                  ? t('common.removeFromFavourites')
                  : t('common.addToFavourites')
              }
              aria-pressed={isAddedToFavourites}
              onClick={() => toggleFavourite(itemId)}
            >
              <img
                src={
                  isAddedToFavourites ? favouritesFilledIcon : favouritesIcon
                }
                alt=""
                className={cn({ icon: !isAddedToFavourites })}
              />
            </button>
          </div>

          <TechSpecs specs={getShortSpecs(details)} isCompact />
        </div>
      </div>

      <div className={styles.details}>
        <section className={styles.about}>
          <h2 className={styles.sectionTitle}>{t('details.about')}</h2>

          {description.map(({ title, text }) => (
            <article key={title} className={styles.aboutBlock}>
              <h3 className={styles.aboutTitle}>{title}</h3>

              {text.map(paragraph => (
                <p key={paragraph} className={styles.aboutText}>
                  {paragraph}
                </p>
              ))}
            </article>
          ))}
        </section>

        <section className={styles.specs}>
          <h2 className={styles.sectionTitle}>{t('details.techSpecs')}</h2>

          <TechSpecs specs={getFullSpecs(details)} />
        </section>
      </div>

      {!!suggestedProducts.length && (
        <div className={styles.suggested}>
          <ProductsSlider
            title={t('details.youMayAlsoLike')}
            products={suggestedProducts}
            showDiscount
          />
        </div>
      )}
    </div>
  );
};
