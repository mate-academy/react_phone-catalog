import React, {
  useEffect,
  useState,
  useRef,
  useContext,
  useMemo,
} from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Product } from '../../types/Product';
import { getProducts } from '../../api/api';
import { filteredPhones } from '../../utils/filteredPhones';
import { Pagination } from '../../components/Pagination/Pagination';
import { PhoneCatalogContext } from '../../PhoneCatalogContext';
import { SmallLoader } from '../../components/SmallLoader/SmallLoader';

type Props = {
  title: string;
  navTitle: string;
  type: string;
};

export const ProductsPage: React.FC<Props> = ({ title, navTitle, type }) => {
  const {
    sort,
    setSort,
    itemsPerPage,
    setItemsPerPage,
    currentPage,
    setCurrentPage,
    query,
    setQuery,
    error,
    setError,
  } = useContext(PhoneCatalogContext);

  const [isLoaded, setIsLoaded] = useState(true);

  const [products, setProducts] = useState<Product[]>([]);
  const [queriedProducts, setQueriedProducts] = useState<Product[]>([]);

  const [quantity, setQuantity] = useState<number>(products.length);

  const firstIndex = currentPage === 1 ? 0 : itemsPerPage * (currentPage - 1);
  const lastIndex = itemsPerPage * currentPage;

  const firstLoad = useRef(true);
  const path = useLocation();
  const currentURL = window.location.href.split('#')[0];

  const [
    updateTimeout,
    setUpdateTimeout,
  ] = useState<NodeJS.Timeout | null>(null);

  // const newPhones = useMemo(
  //   () => filteredPhones(products, sort), [sort, itemsPerPage, products, query],
  // );

  useEffect(() => {
    setQueriedProducts(filteredPhones(products, sort));
  }, [products]);

  useEffect(() => {
    if (updateTimeout) {
      clearTimeout(updateTimeout);
    }

    const timeoutId = setTimeout(() => {
      // Update the queried products based on the new query
      setQueriedProducts(
        filteredPhones(products, sort)
          .filter(phone => phone.name.toLowerCase()
            .includes(query.toLowerCase())),
      );
      setCurrentPage(1);
    }, 500);

    setUpdateTimeout(timeoutId);

    return () => {
      if (updateTimeout) {
        clearTimeout(updateTimeout);
      }
    };
  }, [query, sort, itemsPerPage, products]);

  const pages = useMemo(() => Math
    .ceil(queriedProducts.length / itemsPerPage), [
    itemsPerPage,
    queriedProducts,
    query,
  ]);

  const productsPerPage = useMemo(() => queriedProducts
    .slice(firstIndex, lastIndex), [
    firstIndex,
    queriedProducts,
    sort,
    itemsPerPage,
    query,
  ]);

  useEffect(() => {
    setIsLoaded(true);

    getProducts()
      .then((productsFromServer) => {
        setIsLoaded(false);
        const newProducts = productsFromServer.filter(
          (product) => product.category === type,
        );

        setQuantity(newProducts.length);

        if (newProducts.length === 0) {
          setError(`No ${type} products available.`);
        } else {
          setProducts(newProducts);
          setError('');
        }
      })
      .catch(() => {
        setError('There is no connection to the server.');
      });
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(path.search);

    const urlItemsPerPage = parseInt(urlParams.get('itemsPerPage') || '0', 10);
    const urlSort = urlParams.get('sort') || 'Alphabetical';
    const urlCurrentPage = parseInt(urlParams.get('currentPage') || '1', 10);
    const urlQuery = urlParams.get('query') || '';

    setItemsPerPage(urlItemsPerPage || itemsPerPage);
    setSort(urlSort || sort);
    setCurrentPage(urlCurrentPage || currentPage);
    setQuery(urlQuery || query);
  }, []);

  useEffect(() => {
    if (!firstLoad.current) {
      const queryParams = new URLSearchParams();

      queryParams.set('itemsPerPage', String(itemsPerPage));
      queryParams.set('sort', sort);
      queryParams.set('currentPage', String(currentPage));
      queryParams.set('query', query);

      const newUrl = `${currentURL}#${path.pathname}?${queryParams.toString()}`;

      window.history.replaceState(null, '', newUrl);
    }

    firstLoad.current = false;
  }, [itemsPerPage, sort, currentPage, query]);

  return (
    <div className="productsPage">
      <div className="productsPage__nav">
        <Link to="/" className="productsPage__nav__home" />
        <div className="arrow arrow-right" />
        <div className="productsPage__nav__title">{navTitle}</div>
      </div>
      <div className="productsPage__title bold">{title}</div>
      <div className="productsPage__subtitle body-text">
        {isLoaded ? <SmallLoader /> : `${quantity} ${quantity === 1 ? 'model' : 'models'}`}
      </div>
      <Pagination
        setSort={setSort}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        productsPerPage={productsPerPage}
        products={products}
        pages={Math.ceil(pages)}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        sort={sort}
        error={error}
        isLoaded={isLoaded}
      />
    </div>
  );
};
