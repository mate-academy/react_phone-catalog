import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import './ProductPage.scss';
import { useLocation, useSearchParams } from 'react-router-dom';
import { ProductCard } from '../ProductCard/ProductCard';
import { CatalogContext } from '../../../context/CatalogContext';
import { NavigationPath } from '../NavigationPath/NavigationPath';
import { CustomSelect } from '../CustomSelect';
import { Pagination } from '../Pagination';
import { getProducts } from '../../../api/api';
import { Loader } from '../../Loader';
import * as Types from '../../../types';
import * as Service from '../../../utils/service';

type Props = {
  category?: Types.Category;
  title: Types.PageName;
};

export const ProductPage: React.FC<Props> = ({ category, title }) => {
  const { favourites, addProductToFavoutites } = useContext(CatalogContext);
  const [products, setProducts] = useState<Types.Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    if (!category) {
      setProducts(favourites);
    }
  }, [category, favourites]);

  useEffect(() => {
    if (category) {
      setIsLoading(true);
      getProducts()
        .then(productsData => {
          setProducts(Service.getProductsByCategory(productsData, category));
        })
        .finally(() => setIsLoading(false));
    }
  }, [category]);

  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [translate, setTranslate] = useState(0);
  const itemWidth = 32;
  const sortBy = useMemo(
    () =>
      ({
        label: searchParams.get('sortBy') || Types.SortType.None,
        value: searchParams.get('sortBy') || Types.SortType.None,
      }) as Types.SortValue,
    [searchParams],
  );
  const query = searchParams.get('query') || '';
  const filteredProducts = useMemo(
    () => Service.getFilteredProducts(products, query),
    [products, query],
  );
  const sortedProducts = useMemo(
    () => Service.getSortedProducts(filteredProducts, sortBy.value),
    [filteredProducts, sortBy.value],
  );
  const itemsCount = useMemo(
    () => sortedProducts.length,
    [sortedProducts.length],
  );
  const perPage = useMemo(
    () =>
      ({
        label: searchParams.get('perPage') || Types.PerPage.All,
        value: searchParams.get('perPage') || itemsCount,
      }) as Types.PerPageValue,
    [itemsCount, searchParams],
  );
  const currentPage = useMemo(
    () => +(searchParams.get('page') || 1),
    [searchParams],
  );
  const start = useMemo(
    () => (currentPage - 1) * perPage.value,
    [currentPage, perPage.value],
  );
  const end = useMemo(
    () => Math.min(currentPage * perPage.value, itemsCount),
    [currentPage, perPage, itemsCount],
  );
  const pagesCount = useMemo(
    () => Math.ceil(itemsCount / perPage.value),
    [itemsCount, perPage.value],
  );
  const pages = useMemo(() => Service.getNumbers(pagesCount), [pagesCount]);

  const handlePageClick = useCallback(
    (newPage: number) => {
      const targetPage = Math.min(Math.max(newPage, 3), pagesCount - 2);

      setTranslate(pagesCount < 5 ? 0 : (targetPage - 3) * -(itemWidth + 8));
    },
    [pagesCount],
  );

  useEffect(() => handlePageClick(currentPage), [currentPage, handlePageClick]);

  const handlePageChange = useCallback(
    (page: number) => {
      if (page !== currentPage && page >= 1 && page <= pagesCount) {
        return Service.getSearchWith({ page: `${page}` }, searchParams);
      } else {
        return searchParams.toString();
      }
    },
    [currentPage, pagesCount, searchParams],
  );

  const handlePrevClick = useCallback(() => {
    if (currentPage <= pagesCount - 2 && currentPage > 3) {
      setTranslate(currentTranslate => currentTranslate + itemWidth + 8);
    }
  }, [currentPage, pagesCount]);

  const handleNextClick = useCallback(() => {
    if (currentPage >= 3 && currentPage < pagesCount - 2) {
      setTranslate(currentTranslate => currentTranslate - itemWidth - 8);
    }
  }, [currentPage, pagesCount]);

  const getProductsForPage = useCallback(
    () => sortedProducts.slice(start, end),
    [end, sortedProducts, start],
  );

  const setSearchWith = useCallback(
    (params: Types.SearchParams) => {
      const search = Service.getSearchWith(params, searchParams);

      setSearchParams(search);
    },
    [searchParams, setSearchParams],
  );

  const addToFavorites = useCallback(
    (product: Types.Product) => {
      addProductToFavoutites(product);
      const newItemsCount =
        title === Types.PageName.Favourites ? itemsCount - 1 : itemsCount;
      const totalPages = Math.ceil(newItemsCount / perPage.value);

      if (
        (itemsCount <= perPage.value && currentPage !== 1) ||
        totalPages < 2
      ) {
        setSearchWith({ page: null, perPage: null });
      } else {
        const prevPage = Math.min(currentPage, totalPages);

        setSearchWith({
          perPage: `${perPage.value}`,
          page: `${prevPage}`,
        });
      }
    },
    [
      addProductToFavoutites,
      currentPage,
      itemsCount,
      perPage.value,
      setSearchWith,
      title,
    ],
  );

  const handleSortChange = useCallback(
    (sortType: Types.DropDownValue) => {
      setSearchWith({
        page: perPage.value === itemsCount ? null : '1',
        sortBy: sortType.label === Types.SortType.None ? null : sortType.label,
      });
    },
    [itemsCount, perPage.value, setSearchWith],
  );

  const handlePerPageChange = useCallback(
    (perPageValue: Types.DropDownValue) => {
      setSearchWith({
        perPage:
          perPageValue.label === Types.PerPage.All
            ? null
            : `${perPageValue.value}`,
        page: perPageValue.label === Types.PerPage.All ? null : '1',
      });
    },
    [setSearchWith],
  );

  useEffect(() => {
    if (!!itemsCount && itemsCount <= perPage.value) {
      const perValues = Object.values(Types.PerPage);
      const newPerPageIndex = [0, 1].includes(perValues.indexOf(perPage.label))
        ? 0
        : perValues.indexOf(perPage.label) - 1;
      const newPerPage = perValues[newPerPageIndex];

      setSearchWith({
        perPage: newPerPage === Types.PerPage.All ? null : newPerPage,
        page: newPerPage === Types.PerPage.All ? null : '1',
      });
    }
  }, [itemsCount, perPage.label, perPage.value, setSearchWith]);

  return (
    <section className="container productpage">
      <NavigationPath />

      {!isLoading && !products.length ? (
        <h1 className="productpage__top">{`${title} is empty`}</h1>
      ) : (
        <>
          <article className="productpage__top">
            <h1>{title}</h1>

            <p className="body-text productpage__body-small-text ">
              {`${itemsCount} ${title === Types.PageName.Favourites ? 'items' : 'models'}`}
            </p>
          </article>

          {!isLoading && !filteredProducts.length ? (
            <h3 className="productpage__center">
              {`There are no ${Service.isProductsPage(pathname, true)} matching the query`}
            </h3>
          ) : (
            <>
              <article className="productpage__center">
                <CustomSelect
                  startParams={sortBy}
                  type={Types.DropDown.Sort}
                  onChange={handleSortChange}
                />

                <CustomSelect
                  startParams={perPage}
                  type={Types.DropDown.PerPage}
                  itemsCount={itemsCount}
                  onChange={handlePerPageChange}
                />
              </article>

              {isLoading && <Loader selectedProduct={false} />}

              <article className="productpage__bottom">
                <ul className="productpage__list">
                  {getProductsForPage().map(product => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      translate={null}
                      addToFavorites={addToFavorites}
                    />
                  ))}
                </ul>
              </article>

              {perPage.value < itemsCount && (
                <Pagination
                  data={{ pages, currentPage, pagesCount, translate }}
                  functions={{
                    handlePageChange,
                    handlePrevClick,
                    handleNextClick,
                  }}
                />
              )}
            </>
          )}
        </>
      )}
    </section>
  );
};
