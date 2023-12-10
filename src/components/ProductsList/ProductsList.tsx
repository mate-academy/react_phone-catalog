import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product } from '../../types/Product';
import { sortByOptions, perPageOptions } from '../../variables/selectOptions';
import { ProductCard } from '../ProductCard';
import { Select } from '../Select';
import { Pagination } from '../Pagination';

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

  const getSortOption = useMemo(() => {
    return sortByOptions.filter((option) => option.value === sortValue)[0];
  }, [sortValue]);

  const getPerPageOption = useMemo(() => {
    return perPageOptions.filter((option) => {
      return option.value === perPageValue;
    })[0];
  }, [perPageValue]);

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
        <div className="products-list__filters">
          <div className="products-list__filter">
            <div className="products-list__label">Sort by</div>
            <Select
              paramsKey="sort"
              options={sortByOptions}
              selectedOption={getSortOption}
              searchParams={searchParams}
              setSearchParams={setSearchParams}
            />
          </div>

          <div className="products-list__filter">
            <div className="products-list__label">Items on page</div>
            <Select
              paramsKey="perPage"
              options={perPageOptions}
              selectedOption={getPerPageOption}
              searchParams={searchParams}
              setSearchParams={setSearchParams}
            />
          </div>
        </div>

        <div className="products-list__items" data-cy="productList">
          {filteredProducts.map((product) => (
            <ProductCard item={product} key={product.id} />
          ))}
        </div>

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
