import React from 'react';

import { BackLink } from '../../components/BackLink';
import { BreadCrumbs } from '../../components/BreadCrumbs';
import { Loader } from '../../components/Loader';
import { SuggestedProducts } from '../../components/SuggestedProducts';
import {
  ProductAbout,
  ProductGallery,
  ProductNotFound,
  ProductOptions,
  ProductSpecs,
  ProductSummary,
} from './components';
import { block, cx, styles } from './components/styles';
import { useProductDetailsPage } from './useProductDetailsPage';

export const ProductDetailsPage: React.FC = () => {
  const { content, gallery, navigation, options, state, suggestions, summary } =
    useProductDetailsPage();
  const { detailsLoading, display, isLoading, product, productId } = state;
  const { navigateBack } = navigation;

  if ((isLoading || detailsLoading) && !display) {
    return <Loader />;
  }

  if (!product && !isLoading) {
    return <ProductNotFound productId={productId} onBack={navigateBack} />;
  }

  if (!display) {
    return null;
  }

  if (!summary.priceValue) {
    return null;
  }

  return (
    <div className={styles[block]}>
      <div className={cx('container')}>
        <BreadCrumbs product={display} />

        <BackLink onClick={navigateBack} />

        <h1 className={cx('title')}>{display.name}</h1>

        <div className={cx('top')}>
          <ProductGallery
            productName={display.name}
            images={gallery.images}
            mainImage={gallery.mainImage}
            onSelectImage={gallery.setMainImage}
          />

          <div className={cx('info')}>
            <ProductOptions
              displayId={options.displayId}
              colors={options.colors}
              capacities={options.capacities}
              selectedColorValue={options.selectedColorValue}
              selectedCapacityValue={options.selectedCapacityValue}
              findVariant={options.findVariant}
              onSelectVariant={options.goToVariant}
            />

            <ProductSummary
              price={summary.priceValue}
              fullPrice={summary.fullPriceValue}
              isInCart={summary.isInCart}
              isFavorited={summary.isFavorited}
              specs={summary.shortSpecs}
              onCartClick={summary.handleCartClick}
              onFavoriteClick={summary.handleFavoriteClick}
            />
          </div>
        </div>

        <div className={cx('details')}>
          <ProductAbout sections={content.descriptionSections} />
          <ProductSpecs specs={content.techSpecs} />
        </div>

        <SuggestedProducts products={suggestions.products} currentId={suggestions.currentItemId} />
      </div>
    </div>
  );
};

export default ProductDetailsPage;
