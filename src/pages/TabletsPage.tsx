import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPreparedProducts, getTablets } from '../helper/fetchProducts';
import { Product } from '../types/Product';
import { ProductList } from '../components/ProductList';
import { NoResults } from '../components/NoResults';

export const TabletsPage = () => {
  const [tablets, setTablets] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const [perPage, setPerPage] = useState<number>(
    parseInt(searchParams.get('perPage') || '4'),
  );
  const [page, setPage] = useState<number>(
    parseInt(searchParams.get('page') || '1'),
  );
  const [sort, setSort] = useState<string>(searchParams.get('sort') || 'price');

  useEffect(() => {
    setProductsLoading(true);
    getTablets()
      .then(fetchedProduct => setTablets(fetchedProduct))
      .catch(() => {})
      .finally(() => {
        setProductsLoading(false);
      });
  }, []);

  const updateSearchParams = () => {
    const updatedParams = new URLSearchParams();

    updatedParams.set('perPage', perPage.toString());
    updatedParams.set('page', page.toString());
    updatedParams.set('sort', sort);

    if (searchParams.toString() !== updatedParams.toString()) {
      setSearchParams(updatedParams);
    }
  };

  useEffect(() => {
    updateSearchParams();
  }, [perPage, page, sort]);

  useEffect(() => {
    setPerPage(parseInt(searchParams.get('perPage') || '4'));
    setPage(parseInt(searchParams.get('page') || '1'));
    setSort(searchParams.get('sort') || 'price');
  }, [searchParams]);

  const visibleTablets = getPreparedProducts(tablets, {
    perPage,
    page,
    sort,
  });

  return (
    <>
      {tablets.length === 0 ? (
        <NoResults category="Tablets" />
      ) : (
        <ProductList
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          visibleProducts={visibleTablets}
          productsFromServer={tablets}
          productsLoading={productsLoading}
          pageName="Tablets"
        />
      )}
    </>
  );
};
