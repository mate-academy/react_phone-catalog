/* eslint-disable max-len */
import style from './ProductDetailsPage.module.scss';
import { Back } from '../../components/Back';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { ProductSwiper } from '../../components/ProductSwiper';
import { Loader } from '../../components/Loader';
import { useProductDetails } from '../../utils/hooks/useProductDetails';
import { useSuggestedProducts } from '../../utils/hooks/suggestedProducts';
import { ProductNotFound } from '../../components/ProductNotFound/ProductNotFound';
import { ProductInfo } from '../../components/ProductInfo';
import { ProductTechSpecs } from '../../components/ProductTechSpecs';
import { Breadcrumbs } from '../../components/Breadcrumbs';

export const ProductDetailsPage = () => {
  const { product, hasError, loader } = useProductDetails();
  const { suggestedProducts, isLoading } = useSuggestedProducts();

  return (
    <div className={style.productDetails}>
      <Breadcrumbs />
      <Back />

      {loader && <Loader />}

      {!loader && hasError && <ProductNotFound />}

      {!loader && !hasError && product && (
        <div className={style.productDetails__container}>
          <ProductCard product={product} />
          <div className={style.productDetails__containerInformaiton}>
            <ProductInfo product={product} />
            <ProductTechSpecs product={product} />
          </div>
          <ProductSwiper
            products={suggestedProducts}
            isLoading={isLoading}
            title={'You may also like'}
            fullPrice={true}
          />
        </div>
      )}
    </div>
  );
};
