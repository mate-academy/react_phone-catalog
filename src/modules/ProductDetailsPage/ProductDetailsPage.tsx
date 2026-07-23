// #regionImport
import classNames from 'classnames';

import React from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import styles from './ProductDetailsPage.module.scss';
import { Category, CATEGORY_CONFIG } from '@shared/constants/categoryConfig';

import { useFavourites } from '@shared/context/FavouritesContext';
import { useCart } from '@shared/context/CartContext';

import { getFullSpecs } from '@shared/utils/getFullSpecs';
import { getKeySpecs } from '@shared/utils/getKeySpecs';

import { PageHeader } from '@shared/ui/PageHeader';
import { Typography } from '@shared/ui/Typography';
import { DetailsSkeleton } from '@shared/ui/Skeletons/DetailsSkeleton';
import { SliderSkeleton } from '@shared/ui/Skeletons/SliderSkeleton';
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

import { useProductDetails } from './hooks/useProductDetails';
import { useProductVariants } from './hooks/useProductVariants';
import { useSuggestedProducts } from './hooks/useSuggestedProducts';
import { useCurrentProduct } from './hooks/useCurrentProduct';
import { PriveActions } from './components/PriceActions';
import { useTranslation } from 'react-i18next';
// #endregion

export const ProductDetailsPage: React.FC = () => {
  const { productId = '' } = useParams();
  const navigate = useNavigate();
  const { toggle, isFavourite } = useFavourites();
  const { toggleCartItem: toggleCartItem, isInCart } = useCart();
  const { t } = useTranslation();

  const { product, isInitialLoading, isChangingVariant, hasError } =
    useProductDetails(productId);

  const { variants } = useProductVariants(product);

  const { suggested, isSuggestedLoading, hasSuggestedError } =
    useSuggestedProducts(product);

  const { currentProduct } = useCurrentProduct(product);

  if (isInitialLoading) {
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
          Product was not found
        </Typography>
      </Container>
    );
  }

  const category = CATEGORY_CONFIG[product.category as Category];

  const handleColorChange = (selectedColor: string) => {
    const variant = variants.find(
      item =>
        item.color === selectedColor && item.capacity === product.capacity,
    );

    if (variant) {
      navigate(`/product/${variant.id}`);
    }
  };

  const handleCapacityChange = (selectedCapacity: string) => {
    const variant = variants.find(
      item =>
        item.capacity === selectedCapacity && item.color === product.color,
    );

    if (variant) {
      navigate(`/product/${variant.id}`);
    }
  };

  const handleToggleFavourite = (e: React.MouseEvent<Element, MouseEvent>) => {
    e.preventDefault();

    if (currentProduct) {
      toggle(currentProduct);
    }
  };

  const handleAddToCart = (e: React.MouseEvent<Element, MouseEvent>) => {
    e.preventDefault();

    if (currentProduct) {
      toggleCartItem(currentProduct);
    }
  };

  const fullSpecs = getFullSpecs(product);
  const keySpecs = getKeySpecs(product);

  return (
    <>
      <Container>
        <FadeIn>
          <PageHeader
            title={product.name}
            breadcrumbs={[
              { label: t(category.breadcrumb), href: category.href },
              { label: product.name },
            ]}
            showBack
          />

          <div
            className={classNames(styles.details, {
              [styles.detailsLoading]: isChangingVariant,
            })}
          >
            <ImageGallery images={product.images} />

            <div className={styles.detailsInfoProduct}>
              <ColorPicker
                colors={product.colorsAvailable}
                activeColor={product.color}
                onChange={handleColorChange}
                disabled={isChangingVariant}
              />

              <div className={styles.detailsProductId}>ID: 802390</div>

              <Divider />

              <CapacityPicker
                capacities={product.capacityAvailable}
                activeCapacity={product.capacity}
                onChange={handleCapacityChange}
                disabled={isChangingVariant}
              />

              <Divider />

              <PriveActions
                priceRegular={product.priceRegular}
                priceDiscount={product.priceDiscount}
                isInCart={isInCart(product.id)}
                isFavourite={isFavourite(product.id)}
                onAddToCart={handleAddToCart}
                onToggleFavourite={handleToggleFavourite}
              />

              <ProductSpecs keySpecs={keySpecs} />
            </div>

            <ProductAbout description={product.description} />

            <TechSpecs fullSpecs={fullSpecs} />
          </div>
        </FadeIn>
      </Container>

      {isSuggestedLoading ? (
        <SliderSkeleton />
      ) : hasSuggestedError ? (
        <Container>
          <Typography variant="h3" className={styles.productNotFound}>
            Suggested products was not found
          </Typography>
        </Container>
      ) : (
        <FadeIn>
          <ProductsSlider title="You may also like" products={suggested} />
        </FadeIn>
      )}
    </>
  );
};
