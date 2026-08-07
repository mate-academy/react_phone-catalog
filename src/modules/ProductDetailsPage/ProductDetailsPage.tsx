// #regionImport
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import styles from './ProductDetailsPage.module.scss';
import { getFullSpecs } from '@shared/utils/getFullSpecs';
import { getKeySpecs } from '@shared/utils/getKeySpecs';

import { PageHeader } from '@shared/ui/PageHeader';
import { Typography } from '@shared/ui/Typography';
import { DetailsSkeleton } from '@shared/ui/Skeletons/DetailsSkeleton';
import { FadeIn } from '@shared/ui/FadeIn';
import { Divider } from '@shared/ui/Divider';

import { ProductsSlider } from '@modules/HomePage/components/ProductsSlider';
import { Container } from '@shared/components/Container';
import { ImageGallery } from './components/ImageGallery';
import { ProductAbout } from './components/ProductAbout';
import { TechSpecs } from './components/TechSpecs';
import { ProductSpecs } from './components/ProductSpecs';
import { ColorPicker } from './components/ColorPicker';
import { CapacityPicker } from './components/CapacityPicker';

import { PriceActions } from './components/PriceActions';
import { useAppDispatch, useAppSelector } from '@src/app/hooks';
import {
  selectProductById,
  selectVariants,
} from '@src/features/productDetails/selector';
import { fetchCategoryDetails } from '@src/features/productDetails';
import { useProductParams } from './hooks/useProductParams';
import { CATEGORY_CONFIG } from '@shared/constants/categoryConfig';
import { selectSuggestedProducts } from '@src/features/products/selectors';
import { ProductDetails } from '@src/types/ProductDetails';
// #endregion

export const ProductDetailsPage: React.FC = () => {
  const { category, productId } = useProductParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { items, isLoading, hasError } = useAppSelector(
    state => state.productDetails,
  );

  useEffect(() => {
    if (!category) {
      return;
    }

    if (!items[category]) {
      dispatch(fetchCategoryDetails(category));
    }
  }, [dispatch, category, items]);

  const product = useAppSelector(state =>
    selectProductById(state, category, productId),
  );

  const suggested = useAppSelector(state =>
    selectSuggestedProducts(state, category),
  );

  const EMPTY_VARIANTS: ProductDetails[] = [];

  const variants = useAppSelector(state => {
    if (!product) {
      return EMPTY_VARIANTS;
    }

    return selectVariants(state, category, product.namespaceId);
  });

  if (isLoading || !items[category]) {
    return (
      <Container>
        <DetailsSkeleton />
      </Container>
    );
  }

  if (hasError || !product) {
    return (
      <Container>
        <Typography variant="h3" className={styles.productNotFound}>
          {t('product.notFound')}
        </Typography>
      </Container>
    );
  }

  const handleColorChange = (selectedColor: string) => {
    const variant = variants.find(
      item =>
        item.color === selectedColor && item.capacity === product.capacity,
    );

    if (variant) {
      navigate(`/product/${variant.category}/${variant.id}`);
    }
  };

  const handleCapacityChange = (selectedCapacity: string) => {
    const variant = variants.find(
      item =>
        item.capacity === selectedCapacity && item.color === product.color,
    );

    if (variant) {
      navigate(`/product/${variant.category}/${variant.id}`);
    }
  };

  const fullSpecs = getFullSpecs(product);
  const keySpecs = getKeySpecs(product);

  const currentCategory = CATEGORY_CONFIG[category];

  return (
    <>
      <Container>
        <FadeIn>
          <PageHeader
            title={product.name}
            breadcrumbs={[
              {
                label: t(currentCategory.breadcrumb),
                href: currentCategory.href,
              },
              { label: product.name },
            ]}
            showBack
          />

          <div className={styles.details}>
            <ImageGallery images={product.images} />

            <div className={styles.detailsInfoProduct}>
              <ColorPicker
                colors={product.colorsAvailable}
                activeColor={product.color}
                onChange={handleColorChange}
              />

              <div className={styles.detailsProductId}>ID: 802390</div>

              <Divider />

              <CapacityPicker
                capacities={product.capacityAvailable}
                activeCapacity={product.capacity}
                onChange={handleCapacityChange}
              />

              <Divider />

              <PriceActions product={product} />

              <ProductSpecs keySpecs={keySpecs} />
            </div>

            <ProductAbout description={product.description} />

            <TechSpecs fullSpecs={fullSpecs} />
          </div>
        </FadeIn>
      </Container>

      {suggested.length > 0 && (
        <FadeIn>
          <ProductsSlider
            title={t('product.youMayAlsoLike')}
            products={suggested}
          />
        </FadeIn>
      )}
    </>
  );
};
