/* eslint no-console: [,{ allow: ["warn", "log", "error"] }] */
import { FC } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useProductDetails } from './hooks/useProductDetails';
import { Loader } from '../shared/components/Loader';
import { Category } from '../../types/Product';
import productNotFound from '../../assets/images/product-not-found.png';
import { ProductImagesGallery } from './components/ProductImagesGallery';
import { ErrorNotification } from '../shared/components/ErrorNotification';
import s from './ProductDetailsPage.module.scss';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';

export const ProductDetailsPage: FC = () => {
  const { productId = '' } = useParams();
  const location = useLocation();

  const category =
    (location.state as { category?: Category } | null)?.category || null;

  const { product, isLoading, errorMessage } = useProductDetails(
    productId,
    category,
  );

  console.log(product, isLoading, errorMessage);

  if (isLoading && !product) {
    return <Loader />;
  }

  if (errorMessage) {
    return (
      <ErrorNotification
        message={errorMessage}
        onReload={() => window.location.reload()}
      />
    );
  }

  if (!product) {
    return (
      <div className={s.productNotFound}>
        <h1>Product was not found</h1>
        <img src={productNotFound} />
      </div>
    );
  }

  const paths = [
    { link: category, label: product.category },
    { link: null, label: product.name },
  ];

  return (
    <main>
      <section className={s.container}>
        <Breadcrumbs paths={paths} />
        <h2>{product.name}</h2>
        <ProductImagesGallery images={product.images} alt={product.name} />
      </section>
    </main>
  );
};
