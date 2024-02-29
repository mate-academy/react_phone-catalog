import React, {
  useEffect,
  useState,
  useRef,
  useContext,
} from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Product } from '../../types/Product';
import { getProducts } from '../../api/api';
import { filteredPhones } from '../../utils/filteredPhones';
import { Pagination } from '../../components/Pagination/Pagination';
import { Loader } from '../../components/Loader/Loader';
import { PhoneCatalogContext } from '../../PhoneCatalogContext';

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
  } = useContext(PhoneCatalogContext);

  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string>('');
  const [isLoaded, setIsLoaded] = useState(true);

  const [newPhones, setNewPhones] = useState<Product[]>([]);
  const [queriedPhones, setFilteredPhones] = useState<Product[]>([]);
  const [pages, setPages] = useState<number>(0);

  const firstIndex = currentPage === 1 ? 0 : itemsPerPage * (currentPage - 1);
  const lastIndex = itemsPerPage * currentPage;

  const firstLoad = useRef(true);
  const path = useLocation();

  useEffect(() => {
    const filteredPhonesList = filteredPhones(
      products,
      sort,
    );

    setNewPhones(filteredPhonesList);
  }, [sort, itemsPerPage, products]);

  useEffect(() => {
    const filteredResult = newPhones
      .filter((phone) => phone.name
        .toLowerCase()
        .includes(query.toLowerCase()));
    const filterTimeout = setTimeout(() => {
      const filteredResultPerPage = newPhones
        .filter((phone) => phone.name
          .toLowerCase()
          .includes(query.toLowerCase()))
        .slice(firstIndex, lastIndex);

      setFilteredPhones(filteredResultPerPage);

      if (query) {
        const updatedPages = filteredResult.length / itemsPerPage;

        setPages(updatedPages);
      } else {
        const updatedPages = newPhones.length / itemsPerPage;

        setPages(updatedPages);
      }
    }, 500);

    return () => clearTimeout(filterTimeout); // Cleanup on component unmount or when dependencies change
  }, [newPhones, query, firstIndex, lastIndex, itemsPerPage, products]);

  useEffect(() => {
    setIsLoaded(true);

    getProducts()
      .then((productsFromServer) => {
        setIsLoaded(false);
        const filteredProducts = productsFromServer
          .filter(product => product.category === type);

        if (filteredProducts.length === 0) {
          setError(`No ${type} products available.`);
        } else {
          setProducts(filteredProducts);
          setError('');
        }
      })
      .catch(() => {
        setError('There is no connection to the server.');
      });
  }, [type]);

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

      const newUrl = `http://localhost:3000/#/phones?${queryParams.toString()}`;

      window.history.replaceState(null, '', newUrl);
    }

    firstLoad.current = false;
  }, [itemsPerPage, sort, currentPage, query]);

  if (isLoaded) {
    return (
      <Loader />
    );
  }

  if (!error) {
    return (
      <div className="productsPage">
        <div className="productsPage__nav">
          <Link
            to="/"
            className="productsPage__nav__home"
          />
          <div className="arrow arrow-right" />
          <div className="productsPage__nav__title">{navTitle}</div>
        </div>
        <div className="productsPage__title bold">{title}</div>
        <div className="productsPage__subtitle body-text">
          {
            query
              ? `${newPhones.length} ${newPhones.length === 1 ? 'result' : 'results'}`
              : `${newPhones.length} ${newPhones.length === 1 ? 'model' : 'models'}`
          }
        </div>
        <Pagination
          setSort={setSort}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          newPhones={queriedPhones}
          pages={Math.ceil(pages)}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          products={products}
          sort={sort}
        />
      </div>
    );
  }

  return (
    <div className="productsPage">
      <div className="productsPage__error bold">{error}</div>
    </div>
  );
};
