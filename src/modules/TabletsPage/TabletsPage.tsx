import { useEffect, useState } from 'react';
import { Main } from '../../components/Main/Main';
import { PageTop } from '../../components/PageTop';
import { ProductsList } from '../../components/ProductsList';
import { Product } from '../shared/types/Product';
import { getProducts } from '../shared/utils/fetchClient';
import { ErrorContent } from '../../components/ErrorContent/ErrorContent';

export const TabletsPage = () => {
  const [tabletsFromProduct, setTabletsFromProduct] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(0);

  useEffect(() => {
    setLoading(true);
    setError(false);
    getProducts<Product[]>('api/products.json')
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
    setTabletsFromProduct(
      products.filter(product => product.category === 'tablets'),
    );
  }, [products]);

  return error || loading ? (
    <ErrorContent
      loading={loading}
      error={error}
      onClick={() => {
        setReload(prev => prev + 1);
      }}
      category="tablets"
      products={tabletsFromProduct.length}
    />
  ) : (
    <Main className="main__products">
      <PageTop
        titleText="Tablets"
        titleLevel={1}
        modelsAmount={tabletsFromProduct.length}
      />
      <ProductsList products={tabletsFromProduct} />
    </Main>
  );
};
