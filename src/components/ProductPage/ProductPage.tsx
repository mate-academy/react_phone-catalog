import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs';
import { Loader } from '../Loader/Loader';
import { Notification } from '../Notification/Notification';
import { ProductsList } from '../ProductsList/ProductsList';
import { fetchProducts } from '../../features/productsSlice';

type Props = {
  productType: string;
};

export const ProductPage: React.FC<Props> = ({ productType }) => {
  const { products, loading, hasError } = useAppSelector(
    (state) => state.products,
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const selectedProducts = products.filter(
    (product) => product.type === productType,
  );

  return (
    <main className={`${productType}-page`}>
      <Breadcrumbs />
      {productType === 'phone' && <h1>Mobile phones</h1>}
      {productType === 'tablet' && <h1>Tablets</h1>}
      {productType === 'accessory' && <h1>Accessories</h1>}
      {selectedProducts.length > 0 && (
        <div
          className={`${productType}-page__count`}
        >
          {`${selectedProducts.length} models`}
        </div>
      )}
      {loading && <Loader />}
      {!loading && hasError && (
        <Notification message="Sorry, there is error on the server" />
      )}
      {!loading && !hasError && selectedProducts.length === 0 && (
        <Notification message="Sorry, there is no products on the page" />
      )}
      {!loading && !hasError && selectedProducts.length > 0 && (
        <ProductsList products={selectedProducts} />
      )}
    </main>
  );
};
