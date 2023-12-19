import { useContext } from "react";
import { Loader } from "../components/Loader";
import { ProductCard } from "../components/ProductCard/ProductCard";
import '../styles/PhonePage.scss';
import { StorContext } from "../context/StorContext";
import { Breadcrumbs } from "../components/Breadcrumbs/Breadcrumbs";
import { Droplist } from "../components/Droplist/Droplist";
import { useLocation } from "react-router-dom";
import { SearchWindow } from "../components/SearchWindow/SearchWindow";
import { Pagination } from "../components/Pagination/Pagination";

  const optionsSort = ['Newest', 'Alphabetically', 'Price'];
  const optionsItemsPage = ['4', '8', '16', 'all'];

export const PhonePage = () => {
  const {product, loading, error} = useContext(StorContext);
  const copyOfProduct = [...product];
  const count = copyOfProduct.length;


  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const query = searchParams.get('query') || '';
  const sortParams = searchParams.get('sortBy') || 'Newest';


  const currentPage = Number(searchParams.get('page')) || 1;
  const perPage = Number(searchParams.get('perPage')) || count;
  const lastPage = Math.ceil(count / perPage);
  const isPaginationShow = perPage !== count && lastPage > 1;

  const start = currentPage * perPage - perPage;
  const end = currentPage * perPage <= count
    ? currentPage * perPage
    : count;

  const filteredProducts = query === ''
  ? copyOfProduct
  : copyOfProduct.filter(product => (
    product.name.toLowerCase().includes(query.toLowerCase())));

    const sortProduct = () => {
      switch (sortParams) {
        case 'Newest':
          return copyOfProduct.sort((a, b) => {
            const year = b.year - a.year;
            const price = b.price - a.price;
  
            return year !== 0 ? year : price;
          });
  
        case 'Alphabetically':
          return copyOfProduct.sort((a, b) => a.name.localeCompare(b.name));
  
        case 'Price':
          return copyOfProduct.sort((a, b) => a.price - b.price);
  
        default:
          return copyOfProduct;
      }
    };

    const visibleProducts = sortProduct().slice(start, end);


  return (
    <>
      <div className="phones">
        {query && (
          <SearchWindow product={filteredProducts} />
        )}

        {!query && (
          <>
            <Breadcrumbs />

            <h1 className="phones__title">Mobile phones</h1>

            <p className="phones__count">{count} models</p>

            <div className="phones__sort-container">
              <Droplist
                options={optionsSort}
                startValue='Newest'
                label="Sort by"
                searchParamsKey="sortBy"
              />
              <Droplist
                options={optionsItemsPage}
                startValue="8"
                label="Items on page"
                searchParamsKey="perPage"
              />
            </div>

            <div className="phones__container">
              {loading && (
                <Loader />
              )}
              
              {!error && !loading && (
                visibleProducts.map((prod) => (
                  <ProductCard product={prod} key={prod.id} />
                ))
              )}
            </div>

            <div className="phones__pagination">
              {isPaginationShow && (
                <Pagination
                  total={count}
                  perPage={perPage}
                  currentPage={currentPage}
                />
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}
