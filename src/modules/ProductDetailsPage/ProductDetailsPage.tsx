import { useEffect, useId } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProductPage } from '../../hooks/useProductPage';
import { useSuggestedProducts } from '../../hooks/useSuggestedProducts';
import { Category } from '../../types/Category';
import { ProductDetails } from '../../types/ProductDetails';
import { getVariantId } from '../../utils/client';
import { getColorLabel, getColorValue, isSameColor } from '../../utils/colors';
import { formatScreen, formatUnits } from '../../utils/format';
import { AddToCartButton } from '../shared/components/AddToCartButton';
import { BackButton } from '../shared/components/BackButton';
import { Breadcrumbs } from '../shared/components/Breadcrumbs/Breadcrumbs';
import { Container } from '../shared/components/Container';
import { FavoriteButton } from '../shared/components/FavoriteButton';
import { Loader } from '../shared/components/Loader';
import { ProductsSlider } from '../shared/components/ProductsSlider';
import { useActiveCategory } from '../shared/context/ActiveCategoryContext';
import { OptionSelector } from './components/OptionSelector';
import { ProductGallery } from './components/ProductGallery';
import { SpecsList } from './components/SpecsList';
import styles from './ProductDetailsPage.module.scss';

const CATEGORY_LABELS: Record<Category, string> = {
  phones: 'Phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

type Spec = [string, string | undefined];

const toSpecs = (specs: Spec[]) =>
  specs.filter((spec): spec is [string, string] => Boolean(spec[1]));

const getShortSpecs = (details: ProductDetails) =>
  toSpecs([
    ['Screen', formatScreen(details.screen)],
    ['Resolution', details.resolution],
    ['Processor', details.processor],
    ['RAM', formatUnits(details.ram)],
  ]);

const getTechSpecs = (details: ProductDetails) =>
  toSpecs([
    ...getShortSpecs(details),
    [
      details.category === 'accessories' ? 'Size' : 'Built in memory',
      formatUnits(details.capacity),
    ],
    ['Camera', details.camera],
    ['Zoom', details.zoom],
    ['Cell', details.cell.join(', ')],
  ]);

export const ProductDetailsPage = () => {
  const { productId = '' } = useParams();
  const navigate = useNavigate();
  const colorsLabelId = useId();
  const capacityLabelId = useId();
  const { setActiveCategory } = useActiveCategory();
  const { data, isLoading, hasError, reload } = useProductPage(productId);

  const category = data?.product.category;
  const suggestedProducts = useSuggestedProducts(
    category,
    data?.variants.map(getVariantId).join('|'),
  );

  // highlight the category in the header navigation
  useEffect(() => {
    setActiveCategory(category ?? null);

    return () => setActiveCategory(null);
  }, [category, setActiveCategory]);

  if (isLoading) {
    return (
      <Container className={styles.page}>
        <Loader />
      </Container>
    );
  }

  if (hasError) {
    return (
      <Container className={styles.page}>
        <BackButton />
        <div className={styles.message}>
          <p className={styles.messageText}>Something went wrong</p>
          <button type="button" className={styles.button} onClick={reload}>
            Reload
          </button>
        </div>
      </Container>
    );
  }

  if (!data) {
    return (
      <Container className={styles.page}>
        <BackButton />
        <div className={styles.message}>
          <h1 className={styles.notFoundTitle}>Product was not found</h1>
          <img
            src="img/product-not-found.png"
            alt=""
            className={styles.notFoundImage}
          />
        </div>
      </Container>
    );
  }

  const { product, details, variants } = data;
  const isAccessory = details.category === 'accessories';
  const hasDiscount = details.priceRegular > details.priceDiscount;

  // switch to another color / capacity of the same model
  const selectVariant = (changes: { color?: string; capacity?: string }) => {
    const color = changes.color ?? details.color;
    const capacity = changes.capacity ?? details.capacity;
    const matchesColor = (item: ProductDetails) =>
      isSameColor(item.color, color);
    const matchesCapacity = (item: ProductDetails) =>
      item.capacity === capacity;

    const target =
      variants.find(item => matchesColor(item) && matchesCapacity(item)) ??
      variants.find(changes.color ? matchesColor : matchesCapacity);

    if (target && target !== details) {
      // replace, so the Back button still leads to the previous page
      navigate(`/product/${getVariantId(target)}`, { replace: true });
    }
  };

  const colorOptions = details.colorsAvailable.map(color => ({
    value: color,
    label: getColorLabel(color),
    color: getColorValue(color),
    disabled: !variants.some(item => isSameColor(item.color, color)),
  }));
  const capacityOptions = details.capacityAvailable.map(capacity => ({
    value: capacity,
    label: formatUnits(capacity),
    disabled: !variants.some(item => item.capacity === capacity),
  }));
  const selectedColor =
    details.colorsAvailable.find(color => isSameColor(color, details.color)) ??
    details.color;

  return (
    <Container className={styles.page}>
      <Breadcrumbs
        items={[
          { label: CATEGORY_LABELS[category as Category], to: `/${category}` },
          { label: details.name },
        ]}
      />

      <div className={styles.back}>
        <BackButton />
      </div>

      <h1 className={styles.title}>{details.name}</h1>

      <div className={styles.top}>
        <ProductGallery
          key={details.id}
          images={details.images}
          name={details.name}
        />

        <div>
          <div className={styles.header}>
            <span id={colorsLabelId} className={styles.label}>
              Available colors
            </span>
            <span className={styles.id}>ID: {product.id}</span>
          </div>

          <div className={styles.controls}>
            <div className={styles.group}>
              <OptionSelector
                name="color"
                options={colorOptions}
                selected={selectedColor}
                labelId={colorsLabelId}
                onChange={color => selectVariant({ color })}
              />
            </div>

            <div className={styles.group}>
              <span id={capacityLabelId} className={styles.label}>
                {isAccessory ? 'Select size' : 'Select capacity'}
              </span>
              <OptionSelector
                name="capacity"
                options={capacityOptions}
                selected={details.capacity}
                labelId={capacityLabelId}
                onChange={capacity => selectVariant({ capacity })}
              />
            </div>

            <div className={styles.prices}>
              <span className={styles.price}>${details.priceDiscount}</span>
              {hasDiscount && (
                <span className={styles.fullPrice}>
                  ${details.priceRegular}
                </span>
              )}
            </div>

            <div className={styles.actions}>
              <AddToCartButton product={product} className={styles.cart} />
              <FavoriteButton product={product} className={styles.favorite} />
            </div>

            <SpecsList specs={getShortSpecs(details)} variant="compact" />
          </div>
        </div>
      </div>

      <div className={styles.details}>
        <section aria-labelledby="about-title">
          <h3 id="about-title" className={styles.sectionTitle}>
            About
          </h3>

          {details.description.map(({ title, text }) => (
            <article key={title} className={styles.about}>
              <h4 className={styles.aboutTitle}>{title}</h4>
              {text.map(paragraph => (
                <p key={paragraph} className={styles.paragraph}>
                  {paragraph}
                </p>
              ))}
            </article>
          ))}
        </section>

        <section aria-labelledby="specs-title">
          <h3 id="specs-title" className={styles.sectionTitle}>
            Tech specs
          </h3>
          <SpecsList specs={getTechSpecs(details)} />
        </section>
      </div>

      {suggestedProducts.length > 0 && (
        <div className={styles.suggested}>
          <ProductsSlider
            title="You may also like"
            products={suggestedProducts}
          />
        </div>
      )}
    </Container>
  );
};
