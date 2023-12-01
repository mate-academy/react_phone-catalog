import { useEffect, useState } from 'react';
import './PhonesPage.scss';
import { useSearchParams } from 'react-router-dom';
import { Product } from '../../Types/Product';
import home from '../../images/home.svg';
import arrowright from '../../images/arrowright.svg';
import { ProductList } from '../../components/ProductList/ProductList';
import { Loader } from '../../components/Loader/Loader';
import { getItems } from '../../services/fetch';
import { Pagination } from '../../components/Pagination/Pagination';

export const PhonesPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(4);
  const [filterBy, setFilterby] = useState('price');
  const [errorMessage, setErrorMessage] = useState('');
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      getItems()
        .then((productsFormServer) => {
          setProducts(
            productsFormServer.filter(
              (product: Product) => product.category === 'phones',
            ),
          );
        })
        .catch(() => setErrorMessage('Something went wrong'))
        .finally(() => setLoading(false));
    }, 1000);
  }, []);

  const filteredByQuery = products
    .filter((product) => product.name
      .toLowerCase().includes(query.toLowerCase()));

  const selectedPerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(+event.target.value);

    setCurrentPage(1);
  };

  const filteredPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value === 'newest') {
      setFilterby(event.target.value);
      setPerPage(perPage);
      setProducts(
        [...products].sort((a: Product, b: Product) => b.price - a.price),
      );
    }

    if (event.target.value === 'name') {
      setFilterby(event.target.value);
      setPerPage(perPage);
      setProducts(
        [...products]
          .sort((a: Product, b: Product) => a.name.localeCompare(b.name)),
      );
    }

    if (event.target.value === 'price') {
      setFilterby(event.target.value);
      setPerPage(perPage);
      setProducts(
        [...products].sort((a: Product, b: Product) => a.price - b.price),
      );
    }
  };

  const total = filteredByQuery.length;
  const startItem = (currentPage - 1) * perPage;
  const endItem = currentPage * perPage < total ? currentPage * perPage : total;
  const visibleItems = filteredByQuery.slice(startItem, endItem);

  return (
    <div className="phones">
      <div className="phones__top">
        <img src={home} alt="home" />
        <img src={arrowright} alt="arrow" />
        <p className="phones__top--name">Phones</p>
      </div>
      <h1 className="phones__title">Mobile phones</h1>
      <p className="phones__count">{`${products.length} models`}</p>

      <div className="phones__filter">
        <div className="phones__filter--item">
          <p className="phones__filter--name">Filter by</p>
          <select
            data-cy="paginationLeft"
            id="filterBySelector"
            className="phones__select"
            value={filterBy}
            onChange={(event) => filteredPage(event)}
          >
            <option value="newest">Newest</option>
            <option value="name">Alphabetically</option>
            <option value="price">Cheapest</option>
          </select>
        </div>
        <div className="phones__filter--item">
          <p className="phones__filter--name">Items on page</p>
          <select
            data-cy="paginationRight"
            id="perPageSelector"
            className="phones__select"
            value={perPage}
            onChange={(event) => selectedPerPage(event)}
          >
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="16">16</option>
            <option value="71">all</option>
          </select>
        </div>
      </div>
      {loading && <Loader />}

      <div>
        {!loading && visibleItems.length > 0 && (
          <ProductList products={visibleItems} data-cy="productList" />
        )}
      </div>

      {!loading && products.length === 0 && (
        <p className="phones__error">{errorMessage}</p>
      )}
      <div data-cy="pagination" style={{ margin: '0 auto' }}>
        <Pagination
          total={total}
          perPage={perPage}
          currentPage={1}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};
