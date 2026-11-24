import { useEffect, useState } from 'react';
import { Loader } from '../../components/Loader';
import { getProductDetails } from '../../api/productDetails';
import { useParams } from 'react-router-dom';
import { Product } from '../../types/Product';
import { ProductDetails } from '../../types/ProductDetails';
import { BackButton } from '../../components/BackButton';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { ProductGallery } from '../../components/ProductGallery';
import styles from './ProductDetailsPage.module.scss';
import { ProductInfo } from '../../components/ProductInfo';
import { ProductAbout } from '../../components/ProductAbout';
import { ProductTechSpecs } from '../../components/ProductTechSpecs';
import { SuggestedProducts } from '../../components/SuggestedProducts';
import { categoryTitles } from '../../constants/categoryTitles';
import { StatusMessage } from '../../components/StatusMessage';

interface ProductData {
  product: Product;
  details: ProductDetails;
}

export const ProductDetailsPage = () => {
  const { productId } = useParams();
  const [data, setData] = useState<ProductData | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!productId) {
      return;
    }

    setLoading(true);
    setError(false);

    getProductDetails(productId)
      .then(result => setData(result))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [productId]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <StatusMessage text="Something went wrong" />;
  }

  if (!data) {
    return <StatusMessage text="Product was not found" />;
  }

  return (
    <>
      <section className={styles.product}>
        <Breadcrumbs
          title={data.details.name}
          categoryTitle={categoryTitles[data.details.category]}
          categoryPath={`/${data.details.category}`}
        />
        <BackButton />
        <h1 className={styles.product__name}>{data.details.name}</h1>

        <div className={styles.product__top}>
          <ProductGallery
            key={data.details.id}
            images={data.details.images}
            name={data.details.name}
          />
          <ProductInfo product={data.product} details={data.details} />
        </div>

        <div className={styles.product__bottom}>
          <ProductAbout description={data.details.description} />
          <ProductTechSpecs details={data.details} />
        </div>
      </section>

      <SuggestedProducts />
    </>
  );
};
