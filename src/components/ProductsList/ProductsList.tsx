import { useMemo } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Product } from '../../Types/Product';
import BreadCrumbs from '../BreadCrumbs/BreadCrumbs';
import DropDownMenu from '../DropDownMenu/DropDownMenu';
import ProductCard from '../ProductCard/ProductCard';
import './ProductsList.scss';
import { Filter } from '../../Types/Filter';
import { useAppSelector } from '../../features/hooks';
import { getDiscountPrice } from '../../helpers/getDiscountPrice';
import { getNumbersOfPages } from '../../helpers/getNumbersOfPages';
import Pagination from '../Pagination/Pagination';

type Props = {
  products: Product[];
  title: string;
};

enum SortValue {
  Age = 'age',
  Name = 'name',
  Price = 'price',
}

const sortOptions = [
  {
    name: 'newest',
    value: 'age',
  },
  {
    name: 'alphabetically',
    value: 'name',
  },
  {
    name: 'cheapest',
    value: 'price',
  },
];

const findFiltersName = (filterName: string, filtersArray:Filter[]) => {
  if (filterName === 'all') {
    return 'all';
  }

  const findFilter = filtersArray.find(item => item.value === filterName);

  return findFilter ? findFilter.name : '';
};

const ProductsList:React.FC<Props> = ({ products, title }) => {
  const quantity = products.length.toString();
  const itemsPerPage = [
    {
      name: '4',
      value: '4',
    },
    {
      name: '8',
      value: '8',
    },
    {
      name: '16',
      value: '16',
    },
    {
      name: 'all',
      value: quantity,
    },
  ];
  const query = useAppSelector(state => state.search.searchValue);
  const pagesNames = ['phones', 'tablets', 'accessories'];
  const pathName = useLocation().pathname;
  const pageName = pathName.split('/').pop();

  const showFilters = pagesNames.includes(pageName || '');

  const [searchParams] = useSearchParams();
  const sortBy = searchParams.get('sort') || sortOptions[0].value;

  const perPage = searchParams.get('perPage') || itemsPerPage[2].value;

  const currentPage = searchParams.get('page') || '1';

  const filterByQueryProducts = useMemo(() => {
    return products.filter(product => {
      const normalizeQuery = query.toLowerCase();
      const normalizeProduct = product.name.toLowerCase();

      return normalizeProduct.includes(normalizeQuery);
    });
  }, [query, products]);

  const sortedProduct = useMemo(() => {
    const copy = [...filterByQueryProducts];

    switch (sortBy) {
      case SortValue.Age:
        return copy.sort((a, b) => a.age - b.age);

      case SortValue.Name:
        return copy.sort((a, b) => a.name.localeCompare(b.name));

      case SortValue.Price:
        return copy.sort((a, b) => getDiscountPrice(a) - getDiscountPrice(b));

      default:
        return filterByQueryProducts;
    }
  }, [sortBy, filterByQueryProducts]);

  const quantityPages = useMemo(() => {
    if (perPage === 'all') {
      return Math.ceil(+quantity / +quantity);
    }

    return Math.ceil(+quantity / +perPage);
  }, [quantity, perPage]);

  const pages = useMemo(() => {
    return getNumbersOfPages(1, quantityPages);
  }, [quantityPages]);

  const productsFrom = useMemo(() => {
    if (perPage === 'all') {
      return 0;
    }

    return ((+perPage * +currentPage) - +perPage);
  }, [currentPage, perPage]);

  const productsTo = useMemo(() => {
    if (perPage === 'all') {
      return +quantity;
    }

    return (+perPage * +currentPage);
  }, [perPage, currentPage]);

  const visibleItems = sortedProduct.slice(productsFrom, productsTo);

  return (
    <section className=" main__section listProducts__container">
      <BreadCrumbs />
      <div className="listProducts__top">
        <h1 className="listProducts__title">{title}</h1>
        <span className="listProducts__quantity">{`${visibleItems.length} models`}</span>
      </div>
      <div className="listProducts__dropDownMenus-container">

        {showFilters && visibleItems.length > 0 && (
          <>
            <DropDownMenu
              title="Sort by"
              options={sortOptions}
              initialValue={
                findFiltersName(sortBy, sortOptions) || 'newest'
              }
              searchParamsKey="sort"
            />
            <DropDownMenu
              title="Items on page"
              options={itemsPerPage}
              initialValue={
                findFiltersName(perPage, itemsPerPage)
                || '16'
              }
              searchParamsKey="perPage"
            />
          </>
        )}
      </div>
      {sortedProduct.length > 0 ? (
        <ul className="listProducts__list">
          {visibleItems.map((product) => {
            return (
              <ProductCard product={product} key={product.id} />
            );
          })}
        </ul>
      ) : (
        <div className="noSearch-result">
          <p className="noSearch-result__message">
            No results for
          </p>
          <span className="noSearch-result__query">{query}</span>
        </div>
      )}

      {pages.length > 1 && (
        <Pagination page={+currentPage} pages={pages} />
      )}
    </section>
  );
};

export default ProductsList;
