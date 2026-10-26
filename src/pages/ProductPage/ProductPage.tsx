/* eslint-disable max-len */
import { useParams } from 'react-router-dom';
import { Category, ProductDetails, ProductSliderTitles } from 'src/types/Types';
import { ProductImages } from 'src/components/ProductImages/ProductImages';
import { BreadCrumbs } from 'src/components/ui/BreadCrumbs/BreadCrumbs';
import { BackButton } from 'src/components/ui/BackButton/BackButton';
import { ProductPurchase } from 'src/components/ProductPurchase/ProductPurchase';
import styles from './ProductPage.module.scss';
import { ProductInfo } from 'src/components/ProductInfo/ProductInfo';
import { ProductSlider } from 'src/components/ProductSlider/ProductSlider';
import { getSuggestedProducts } from 'src/utils/utils';
import { useStoreContext } from 'src/context/StoreContext';
import { EmptyState } from 'src/components/EmptyState/EmptyState';
import { Loader } from 'src/components/ui/Loader/Loader';

export const ProductPage = () => {
  const { category, itemId } = useParams<{
    category: Category;
    itemId: string;
  }>();

  const { productByCategory, products, isLoading, hasError, reload } =
    useStoreContext();

  if (isLoading) {
    return <Loader />;
  }

  if (hasError) {
    return (
      <EmptyState
        type="error"
        text="Something went wrong"
        buttonText="Reload"
        onButtonClick={reload}
      />
    );
  }

  if (!category || !(category in productByCategory)) {
    return <div>Product not found</div>;
  }

  const product: ProductDetails | undefined = productByCategory[category].find(
    prod => prod.id === itemId,
  );

  if (!product) {
    return <EmptyState type="product" />;
  }

  const recomendedProduct = getSuggestedProducts(products, product.category);

  return (
    <div className={styles.productPage}>
      <div className={styles.productOverview}>
        <BreadCrumbs className={styles.breadcrumbs} />
        <BackButton className={styles.backButton} />
        <h2 className={styles.title}>{product.name}</h2>
        <div className={styles.productMain}>
          <ProductImages
            key={product.id}
            images={product.images}
            className={styles.productImages}
          />

          <ProductPurchase
            product={product}
            className={styles.productPurchase}
          />
        </div>
      </div>
      <ProductInfo product={product} />

      <ProductSlider
        products={recomendedProduct}
        title={ProductSliderTitles.alsoLike}
        showFullPrice={true}
        sliderTitle={'you-may-also-like'}
      />
    </div>
  );
};
