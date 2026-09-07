/* eslint-disable max-len */
import s from './ProductDetailsPage.module.scss';
import { Breadcrumbs } from '../shared/Breadcrumbs/Breadcrumbs';
import { BackButton } from '../shared/BackButton';
import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';
import { Categories } from '../../utils/types/Categories';
import { ProductDetailsCard } from './components/ProductDetailsCard/ProductDetailsCard';
import { ProductDetails } from '../../utils/types/ProductDetails';
import { ProductsSlider } from '../shared/ProductsSlider';
import { ProductNotFoundPage } from '../ProductNotFoundPage';
import { ProductDesc } from './components/ProductDesc';
import { useProducts } from '../../context/products/useProducts';
/* eslint-enable max-len */

export const ProductDetailsPage = () => {
  const location = useLocation();

  const {
    phones,
    tablets,
    accessories,
    products: productsData,
  } = useProducts();

  const [, categoryRaw, productId] = location.pathname.split('/');
  const category = categoryRaw as Categories;

  const dataMap = {
    phones,
    tablets,
    accessories,
  } as {
    phones: ProductDetails[];
    tablets: ProductDetails[];
    accessories: ProductDetails[];
  };

  const product = useMemo(() => {
    const products = dataMap[category];

    if (!products) {
      return null;
    }

    return products.find(p => p.id === productId);
  }, [category, productId]);

  if (!product) {
    return <ProductNotFoundPage />;
  }

  return (
    <section className={s.page}>
      <Breadcrumbs />

      <BackButton />

      <ProductDetailsCard product={product} />

      <ProductDesc product={product} />

      <ProductsSlider products={productsData} title="You may also like" />
    </section>
  );
};
