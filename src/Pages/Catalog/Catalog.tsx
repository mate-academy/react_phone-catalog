import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Product } from '../../Types/Product';
import { getProducts } from '../../api/apiProducts';
import { Products } from '../../Components/Products';
import { Map } from '../../Components/Map';
import './Catalog.scss';
import { Loader } from '../../Components/Loader';
import { ErrorMessage } from '../../Components/ErrorMessage';
import { Errors } from '../../Types/Errors';
import { Selector } from '../../Components/Selector';
import { ItemsOnPage, SortMethod } from '../../Types/SortMethod';
import { Pagination } from '../../Components/Pagination';

export const Catalog = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [pages, setPages] = useState(1);
  const [visibleProducts, setVisibleProducts] = useState<Product[]>(products);
  const [filteredByQuery, setFilteredByQuery] = useState<Product[]>(products);

  const { category } = useParams();
  const [searchParams] = useSearchParams();

  const currentPage = searchParams.get('page') || '1';
  const query = searchParams.get('query') || '';
  const itemsOnPage = searchParams.get('itemsOnPage') || ItemsOnPage.eight;
  const sortMethod = searchParams.get('sort')
    ? SortMethod[searchParams.get('sort') as keyof typeof SortMethod]
    : SortMethod.age;

  const title = category
    ? category?.charAt(0).toUpperCase() + category?.slice(1)
    : '';

  const splitProducts = (items: Product[]) => {
    const productsCopy = [...items];
    const pagesItems = [];

    if (itemsOnPage === ItemsOnPage.all) {
      return [productsCopy];
    }

    while (productsCopy.length) {
      pagesItems.push(productsCopy.splice(0, +itemsOnPage));
    }

    return pagesItems;
  };

  const filterByQuery = (productsFilter: Product[]) => {
    if (!query.trim()) {
      return productsFilter;
    }

    const isMatch = (value: string) => {
      return value.toLowerCase().includes(query.toLowerCase());
    };

    const filteredProducts = productsFilter.filter(
      ({ name, capacity, ram, screen }) =>
        isMatch(name) || isMatch(capacity) || isMatch(ram) || isMatch(screen),
    );

    return filteredProducts;
  };

  useEffect(() => {
    setIsLoading(true);
    getProducts()
      .then(data => {
        setProducts(data.filter(product => product.category === category));
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, [category]);

  useEffect(() => {
    const filtered = filterByQuery(products);

    setFilteredByQuery(filtered);
  }, [query, products]);

  useEffect(() => {
    if (!filteredByQuery.length) {
      setVisibleProducts([]);
      setPages(0);

      return;
    }

    const productsCopy = [...filteredByQuery];
    const sortProducts = productsCopy.sort((a, b) => {
      switch (sortMethod) {
        case SortMethod.age:
          return b.year - a.year;

        case SortMethod.name:
          return a.name.localeCompare(b.name);

        case SortMethod.price:
          return a.price - b.price;

        default:
          return 0;
      }
    });

    const pageItems = splitProducts(sortProducts);

    setPages(pageItems.length);
    setVisibleProducts(pageItems[+currentPage - 1]);
  }, [sortMethod, itemsOnPage, currentPage, filteredByQuery]);

  return (
    <div className="catalog">
      <div className="container">
        <Map />

        <h1 className="catalog__title">{title}</h1>
        <p className="catalog__models-count">
          {products.length === 1 ? '1 model' : `${products.length} models`}
        </p>

        {isLoading && !isError && <Loader />}

        {!!filteredByQuery.length && !!products.length && (
          <div className="catalog__content">
            <div className="catalog__filters">
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

            <Products products={visibleProducts} catalog />
          </div>
        )}

        {!filteredByQuery.length && !!products.length && (
          <ErrorMessage message={Errors.SearchError} />
        )}

        {!isLoading && isError && <ErrorMessage message={Errors.Unexpected} />}

        {!products.length && !isLoading && (
          <ErrorMessage message={Errors.EmptyPage} />
        )}

        {pages > 1 && !!products.length && (
          <Pagination total={filteredByQuery.length} />
        )}
      </div>
    </div>
  );
};
