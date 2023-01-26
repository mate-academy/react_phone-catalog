import {
  FC, useEffect, useState,
} from 'react';
import { useAsyncValue, useParams, useSearchParams } from 'react-router-dom';
import { NavMap } from '../../components/NavMap';
import { ProductsList } from '../../components/ProductsList';
import { Pagination } from '../../components/Pagination';
import { Product } from '../../types/Product';
import { ItemsOnPage } from '../../types/ItemsOnPage';
import { SortMethod } from '../../types/SortMethod';
import { Selector } from '../../components/Selector';
import { Styles } from '../../types/Styles';
import { PageTitle } from '../../components/PageTitle';
import { ErrorMessage } from '../../components/ErrorMessage';
import { ErrorText } from '../../types/ErrorText';
import { UpperFirst } from '../../types/UpperFirst';

const upperFirst: UpperFirst = require(
  '../../../node_modules/lodash/upperFirst',
);

const styles: Styles = require('./CatalogPage.module.scss');

const {
  CatalogPage: page,
  CatalogPage__title: title,
  CatalogPage__NavMap: navMap,
  CatalogPage__filters: filters,
  CatalogPage__ProductsList: productsList,
  CatalogPage__Pagination: pagination,
  CatalogPage__ErrorMessage: error,
} = styles;

export const CatalogPage: FC = () => {
  const data = useAsyncValue() as Product[];
  const { category } = useParams();

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setProducts(data);

    return () => {
      setProducts([]);
    };
  }, []);

  const pageTitle = upperFirst(category || '');

  const [visibleProducts, setVisibleProducts] = useState<Product[]>(products);
  const [filteredByQuery, setFilteredByQuery] = useState<Product[]>(products);
  const [pagesCount, setPagesCount] = useState(1);

  const [searchParams] = useSearchParams();

  const currentPage = searchParams.get('page') || '1';
  const sortMethod = searchParams.get('sort')
    ? SortMethod[searchParams.get('sort') as keyof typeof SortMethod]
    : SortMethod.age;
  const itemsOnPage = searchParams.get('itemsOnPage') || ItemsOnPage.four;
  const query = searchParams.get('query') || '';

  const splitItems = (items: Product[]) => {
    const productsCopy = [...items];

    if (itemsOnPage === ItemsOnPage.all) {
      return [productsCopy];
    }

    const pagesWithItems = [];

    while (productsCopy.length) {
      pagesWithItems.push(productsCopy.splice(0, +itemsOnPage));
    }

    return pagesWithItems;
  };

  const filterProductsByQuery = (productsForFilter: Product[]) => {
    if (!query.trim()) {
      return productsForFilter;
    }

    const isMatch = (value: string) => {
      return value.toLowerCase().includes(query.toLowerCase());
    };

    const filteredProducts = productsForFilter.filter(
      ({
        name, capacity, ram, screen,
      }) => (
        isMatch(name) || isMatch(capacity) || isMatch(ram) || isMatch(screen)
      ),
    );

    return filteredProducts;
  };

  useEffect(() => {
    const filtered = filterProductsByQuery(products);

    setFilteredByQuery(filtered);
  }, [query, products]);

  useEffect(() => {
    if (!filteredByQuery.length) {
      setVisibleProducts([]);
      setPagesCount(0);

      return;
    }

    const productsCopy = [...filteredByQuery];
    const sortedProducts = productsCopy.sort((a, b) => {
      switch (sortMethod) {
        case SortMethod.age:
          return b.year - a.year;
        case SortMethod.name:
          return a.name.localeCompare(b.name);
        case SortMethod.price:
          return a.discountPrice - b.discountPrice;
        default:
          return 0;
      }
    });

    const pagesWithItems = splitItems(sortedProducts);

    setPagesCount(pagesWithItems.length);
    setVisibleProducts(pagesWithItems[+currentPage - 1]);
  }, [sortMethod, itemsOnPage, currentPage, filteredByQuery]);

  return (
    <main className={page}>
      <NavMap
        className={navMap}
        navItems={[pageTitle]}
      />

      <PageTitle
        itemsCount={products.length}
        className={title}
      >
        {pageTitle}
      </PageTitle>

      {!!filteredByQuery.length && !!products.length && (
        <>
          <div className={filters}>
            <Selector
              selectItems={Object.values(SortMethod)}
              searchParam="sort"
            >
              Sort by
            </Selector>

            <Selector
              selectItems={Object.values(ItemsOnPage)}
              searchParam="itemsOnPage"
            >
              Items on page
            </Selector>
          </div>

          <ProductsList
            products={visibleProducts}
            className={productsList}
          />
        </>
      )}

      {!filteredByQuery.length && !!products.length && (
        <ErrorMessage
          className={error}
          message={ErrorText.SearchError}
          isBig
        />
      )}

      {!products.length && (
        <ErrorMessage
          className={error}
          message={ErrorText.EmptyPage}
          isBig
        />
      )}

      {pagesCount > 1 && !!products.length && (
        <Pagination
          className={pagination}
          total={filteredByQuery.length}
        />
      )}
    </main>
  );
};
