import { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  fetchProductByItemId,
  fetchProductDetails,
  fetchProductVariants,
  getSuggestedProducts,
} from '../../api';
import { BackButton } from '../../components/BackButton';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Container } from '../../components/Container';
import { ErrorMessage } from '../../components/ErrorMessage';
import { Loader } from '../../components/Loader';
import { ProductsSlider } from '../../components/ProductsSlider';
import { useRequest } from '../../hooks';
import { getColorCode, normalizeColor } from '../../utils';
import { StatusMessage } from '../shared';
import { About } from './components/About';
import { Gallery } from './components/Gallery';
import { OptionPicker } from './components/OptionPicker';
import { PurchaseActions } from './components/PurchaseActions';
import { TechSpecs } from './components/TechSpecs';
import { findVariant } from './findVariant';
import styles from './ProductDetailsPage.module.scss';

const CATEGORY_NAMES = {
  phones: 'Phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

export const ProductDetailsPage = () => {
  const { productId = '' } = useParams();
  const navigate = useNavigate();

  const loadProduct = useCallback(async () => {
    const details = await fetchProductDetails(productId);

    if (!details) {
      return null;
    }

    const [variants, product] = await Promise.all([
      fetchProductVariants(details.namespaceId),
      fetchProductByItemId(details.id),
    ]);

    return { details, variants, product };
  }, [productId]);

  const loadSuggested = useCallback(
    () => getSuggestedProducts(productId),
    [productId],
  );

  const { data, isLoading, hasError, reload } = useRequest(loadProduct);
  const { data: suggestedProducts } = useRequest(loadSuggested);

  if (isLoading) {
    return (
      <Container>
        <Loader />
      </Container>
    );
  }

  if (hasError) {
    return (
      <Container>
        <ErrorMessage onReload={reload} />
      </Container>
    );
  }

  if (!data) {
    return (
      <Container>
        <StatusMessage
          text="Product was not found"
          image="img/product-not-found.png"
        />
      </Container>
    );
  }

  const { details, variants, product } = data;

  const selectVariant = (change: Parameters<typeof findVariant>[2]) => {
    const variant = findVariant(variants, details, change);

    if (variant && variant.id !== details.id) {
      navigate(`/product/${variant.id}`, { replace: true });
    }
  };

  const colorOptions = details.colorsAvailable.map(color => ({
    value: color,
    label: color,
    swatch: getColorCode(color),
    isSelected: normalizeColor(color) === normalizeColor(details.color),
  }));
  const capacityOptions = details.capacityAvailable.map(capacity => ({
    value: capacity,
    label: capacity,
    isSelected: capacity === details.capacity,
  }));

  return (
    <Container>
      <Breadcrumbs
        items={[
          {
            label: CATEGORY_NAMES[details.category],
            to: `/${details.category}`,
          },
          { label: details.name },
        ]}
      />

      <div className={styles['product-details-page__back']}>
        <BackButton />
      </div>

      <h1 className={styles['product-details-page__title']}>{details.name}</h1>

      <div className={styles['product-details-page__main']}>
        <Gallery key={details.id} images={details.images} name={details.name} />

        <div className={styles['product-details-page__options']}>
          <OptionPicker
            title="Available colors"
            options={colorOptions}
            onSelect={color => selectVariant({ color })}
          />
          <OptionPicker
            title="Select capacity"
            options={capacityOptions}
            onSelect={capacity => selectVariant({ capacity })}
          />
          <PurchaseActions details={details} product={product} />
          <TechSpecs details={details} isShort />
        </div>
      </div>

      <div className={styles['product-details-page__info']}>
        <About description={details.description} />
        <TechSpecs details={details} />
      </div>

      {suggestedProducts && (
        <div className={styles['product-details-page__suggested']}>
          <ProductsSlider
            title="You may also like"
            products={suggestedProducts}
          />
        </div>
      )}
    </Container>
  );
};
