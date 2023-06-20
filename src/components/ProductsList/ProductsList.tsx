/* eslint-disable no-plusplus */
/* eslint-disable react/jsx-one-expression-per-line */
import classNames from 'classnames';
import {
  useState, useEffect, Fragment, useMemo,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductCard } from '../ProductCard';
import { Dropdown } from '../Dropdown';
import { getProductsFromServer } from '../../helpers/fuctions/fetchProduct';
import { SortBy, sortProducts } from '../../helpers/fuctions/sortProducts';
import { Product } from '../../helpers/types/Product';
import { SelectedItem } from '../../helpers/types/SelectedItem';
import { getSearchWith } from '../../helpers/fuctions/searchHelper';
import useDebounce from '../../helpers/fuctions/useDebonce';
import { filterProduct } from '../../helpers/fuctions/filterProduct';
import { Loader } from '../Loader';
import { goTop } from '../../helpers/fuctions/goTop';
import { NoResults } from '../NoResults';
import { Error } from '../Error';

type Props = {
  title: string;
  category: string;
};

export const ProductsList: React.FC<Props> = ({ title, category }) => {
  const [productsList, setProductsList] = useState<Product[] | []>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);

  const sortBy = [
    { title: 'Default', value: 'Default', query: '' },
    { title: SortBy.Age, value: 'age', query: 'age' },
    { title: SortBy.Name, value: 'name', query: 'name' },
    { title: SortBy.Cheapest, value: 'price', query: 'price' },
  ];

  const pages = [
    { title: '4', value: 4, query: '4' },
    { title: '8', value: 8, query: '8' },
    { title: '16', value: 16, query: '16' },
    { title: 'all', value: totalProducts, query: 'all' },
  ];
  const [searchParams, setSearchParams] = useSearchParams();
  const [productsPerPage, setProductsPerPage] = useState(pages[2].value);
  const [selectedSorting, setSelectedSorting]
= useState<SelectedItem>(sortBy[0]);

  const [pagesArr, setPagesArr] = useState([1]);
  const [currPage, setCurrPage] = useState(
    +(searchParams.get('page') || 1),
  );
  const firstItemPerPage = (currPage - 1) * (productsPerPage);
  const lastItemPerPage = (
    currPage * (productsPerPage) > totalProducts
      ? totalProducts
      : currPage * (productsPerPage)
  );

  const query = searchParams.get('query') || '';
  const appliedQury = useDebounce(query, 500);

  async function getProducts() {
    setLoading(true);

    try {
      const products = await getProductsFromServer();

      setProductsList(products.filter(pr => pr.category === category));
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  const handleFilterSelect = (selectedItem: SelectedItem) => {
    setSelectedSorting(selectedItem);
  };

  const handlePageSelect = (selectedItem: SelectedItem) => {
    setProductsPerPage(+selectedItem.value);
  };

  const changePageBy = (changeBy: number) => {
    const newSearchParams = getSearchWith(
      searchParams, { page: `${changeBy}`, perPage: `${productsPerPage}` },
    );

    setSearchParams(newSearchParams);
    setCurrPage(changeBy);
    goTop();
  };

  const sortedProductsList = useMemo(() => {
    let filteredArray = [...productsList];

    if (selectedSorting.title === 'Default' && !appliedQury) {
      setTotalProducts(productsList.length);

      return productsList;
    }

    filteredArray = filterProduct(filteredArray, appliedQury);

    setTotalProducts(filteredArray.length);

    if (selectedSorting.title) {
      return sortProducts(filteredArray, selectedSorting.title);
    }

    return filteredArray;
  }, [selectedSorting.title, productsList.length, appliedQury]) || [];

  useEffect(() => {
    const totalPages = Math.ceil(totalProducts / +productsPerPage);
    const arr = [];

    for (let i = 1; i <= totalPages; i++) {
      arr.push(i);
    }

    setPagesArr(arr);
    setProductsPerPage(pages.find(
      item => item.title === searchParams.get('perPage'),
    )?.value || 16);
  }, [totalProducts, productsPerPage]);

  useEffect(() => {
    getProducts();
    setSelectedSorting(sortBy.find(
      item => item.query === searchParams.get('sort'),
    ) || sortBy[0]);
  }, [category]);

  if (isLoading) {
    return <Loader />;
  }

  if (!isLoading && sortedProductsList?.length === 0 && appliedQury === '') {
    return <NoResults category={category} />;
  }

  if (!isLoading && isError) {
    return (
      <Error />
    );
  }

  return (
    <article className="products-list">
      {appliedQury === '' ? (
        <>
          <h1 className="products-list__title">
            {title}
          </h1>
          {totalProducts !== 0 && (
            <p className="products-list__amount total">
              {totalProducts} model{totalProducts > 1 ? 's' : ''}
            </p>
          )}

          <div className="products-list__dropdowns-container">
            <div className="products-list__dropdown">
              <p className="products-list__dropdown-title">Sort by</p>
              <Dropdown
                itemsList={sortBy}
                value={selectedSorting.title}
                filteredBy="sort"
                callback={handleFilterSelect}
              />
            </div>

            <div className="products-list__dropdown">
              <p className="products-list__dropdown-title">Items on page</p>
              <Dropdown
                itemsList={pages}
                value={pages.find(
                  item => item.title === searchParams.get('perPage'),
                )?.title || 16}
                filteredBy="perPage"
                callback={handlePageSelect}
              />
            </div>
          </div>
        </>
      ) : (
        <p className="products-list__serch-result total">
          {totalProducts} result{totalProducts > 1 ? 's' : ''}
        </p>
      )}

      <div
        className="products-list__producst-container products-grid"
        data-cy="productList"
      >
        {sortedProductsList?.slice(firstItemPerPage, lastItemPerPage)
          .map(phone => (
            <Fragment key={phone.id}>
              <ProductCard product={phone} />
            </Fragment>
          ))}
      </div>

      {(sortedProductsList?.length > productsPerPage) && (
        <div className="products-list__pagination-container">
          <button
            type="button"
            aria-label="Mute volume"
            className="
              products-list__button
              icon-button
              icon-button--left"
            onClick={() => changePageBy(currPage - 1)}
            disabled={currPage === 1}
            data-cy="paginationLeft"
          />

          <div className="products-list__pages-container">
            {pagesArr.map(page => (
              <button
                type="button"
                key={page}
                className={classNames(
                  'products-list__pagination-button',
                  'icon-button',
                  {
                    'products-list__pagination-button--is-active':
                  page === currPage,
                  },
                )}
                onClick={() => changePageBy(page)}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            type="button"
            aria-label="Mute volume"
            className="
              products-list__button
              icon-button
              icon-button--right"
            onClick={() => changePageBy(currPage + 1)}
            disabled={currPage === pagesArr[pagesArr.length - 1]}
            data-cy="paginationRight"
          />
        </div>
      )}
    </article>
  );
};
