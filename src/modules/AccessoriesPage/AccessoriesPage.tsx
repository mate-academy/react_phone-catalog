import { useEffect, useState } from 'react';
import { Main } from '../../components/Main/Main';
import { PageTop } from '../../components/PageTop';
import { ProductsList } from '../../components/ProductsList';
import { Product } from '../shared/types/Product';
import { getProducts } from '../shared/utils/fetchClient';
import { ErrorContent } from '../../components/ErrorContent/ErrorContent';

export const AccessoriesPage = () => {
  const [accessoriesProduct, setAccessoriesProduct] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(0);

  useEffect(() => {
    setLoading(true);
    setError(false);
    getProducts<Product[]>('/api/products.json')
      .then(productsFromServer => {
        setProducts(productsFromServer);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [reload]);

  useEffect(() => {
    setAccessoriesProduct(
      products.filter(product => product.category === 'accessories'),
    );
  }, [products]);

  return error || loading ? (
    <ErrorContent
      loading={loading}
      error={error}
      onClick={() => {
        setReload(prev => prev + 1);
      }}
      products={accessoriesProduct.length}
      category="accessories"
    />
  ) : (
    <Main className="main__products">
      {accessoriesProduct.length > 0 && (
        <>
          <PageTop
            titleText="Accessories"
            titleLevel={1}
            modelsAmount={accessoriesProduct.length}
          />
          <ProductsList products={accessoriesProduct} />
        </>
      )}
    </Main>
  );
};
