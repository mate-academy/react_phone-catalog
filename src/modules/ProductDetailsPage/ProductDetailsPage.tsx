import style from './ProductDetailsPage.module.scss';
import { Breadcrumbs } from '../../shared/ui/Breadcrumbs';
import { ButtonBack } from '../../shared/ui/ButtonBack';
import { ProductsSlider } from '../../components/ProductsSlider';
import { ProductGallery } from './components/ProductGallery';
import { ProductConfigurator } from './components/ProductConfigurator';
import { ProductInfo } from './components/ProductInfo';
import React, { useContext } from 'react';
import { ProductContext } from '../../store/ProductContext';
import { useDetails } from '../../store/ProductDetailsContext';
import { useSuggestedProducts } from './hooks/useSuggestedProducts';
import { Loader } from '../../shared/ui/Loader';
import { ProductNotFound } from './components/ProductNotFound';

export const ProductDetailsPage = React.memo(() => {
  const { isDataReady } = useContext(ProductContext);
  const details = useDetails();
  const suggestedProducts = useSuggestedProducts();

  if (!details.isInitialized || details.isLoadingId || !isDataReady) {
    return <Loader />;
  }

  if (details.hasError) {
    return <ProductNotFound />;
  }

  if (!details.productDetails) {
    return null;
  }

  return (
    <div className={style.wrapper}>
      <Breadcrumbs productDetails={details.productDetails} />

      <ButtonBack />
      <h2 className={style.productTitile}>{details.productDetails.name}</h2>
      <div className={style.productInfo}>
        <section className={style.productSpecs}>
          <ProductGallery productDetails={details.productDetails} />
          <ProductConfigurator
            productDetails={details.productDetails}
            productSpec={details.productSpec}
          />
        </section>

        <ProductInfo
          productDetails={details.productDetails}
          productSpec={details.productSpec}
        />
        <ProductsSlider
          title="You may also like"
          products={suggestedProducts}
        />
      </div>
    </div>
  );
});

ProductDetailsPage.displayName = 'ProductDetailsPage';
