import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { ProductsSlider } from '../shared/ProductsSlider';
import { ProductDetails } from './components/ProductDetails';
import * as productsActions from '../../features/products/productsSlice';
import { getFilteredProducts } from '../../services/getFilteredProducts';
import { ProductCagetories } from '../../types/ProductCategories';
import { GoToBack } from '../shared/GoToBack';
import { Breadcrumbs } from '../shared/Breadcrumbs';

export const ProductDetailsPage = () => {
  const dispatch = useAppDispatch();
  const { productsPage, productId } = useParams();
  const { products } = useAppSelector(state => state.products);

  const sortedProducts = getFilteredProducts(
    products,
    productsPage as ProductCagetories,
  )
    .slice(0, 10)
    .filter(product => product.itemId !== productId);

  useEffect(() => {
    dispatch(productsActions.init());
  }, [productId]);

  return (
    <>
      <Breadcrumbs />
      <GoToBack />
      <ProductDetails />
      <ProductsSlider
        products={sortedProducts}
        title="You may also like"
        hasFullPrice={true}
      />
    </>
  );
};
