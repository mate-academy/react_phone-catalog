import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product } from '../../types/Product';
import { Pagination } from '../Pagination';
import { ProductItems } from './ProductItems';
import { ProductFilters } from './ProductFilters';

interface Props {
  products: Product[];
}

export const ProductsList: React.FC<Props> = ({ products }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortValue = searchParams.get('sort');
  const perPageValue = searchParams.get('perPage') || '4';
  const currentPageValue = searchParams.get('page') || '1';

  useEffect(() => {
    if (perPageValue === 'all') {
      const params = new URLSearchParams(searchParams);

      params.delete('page');
      setSearchParams(params);
    }
  }, [perPageValue]);

  const filteredProducts = useMemo(() => {
    let arr = [...products].sort((a, b) => b.year - a.year);

    if (sortValue) {
      switch (sortValue) {
        case 'name':
          arr = arr.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'price':
          arr = arr.sort((a, b) => b.price - a.price);
          break;
        default:
          arr = arr.sort((a, b) => b.year - a.year);
      }
    }

    if (currentPageValue && perPageValue !== 'all') {
      const currentPage = +currentPageValue;
      const perPage = +perPageValue;
      const startItemNumber = currentPage * perPage - perPage;
      const endItemNumber = currentPage * perPage;

      arr = arr.slice(startItemNumber, endItemNumber);
    }

    return arr;
  }, [products, sortValue, perPageValue, currentPageValue]);

  const pagesCount = useMemo(() => {
    const perPage = +perPageValue;
    const isRemainderExist = products.length % perPage > 0;

    return isRemainderExist
      ? Math.ceil(products.length / perPage)
      : products.length / perPage;
  }, [products, perPageValue]);

  return (
    <section className="section products-list">
      <div className="section__container">
        <ProductFilters
          sortValue={sortValue}
          perPageValue={perPageValue}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />

        <ProductItems items={filteredProducts} />

        <Pagination
          total={pagesCount}
          perPage={perPageValue}
          currentPage={+currentPageValue}
          productsLength={products.length}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
      </div>
    </section>
  );
};
