import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { Product } from '../../shared/types/Product';
import { ProductCard } from '../ProductCard/ProductCard';
import './ProductList.scss';
import DropdownBySort from '../Dropdowns/DropdownBySort/DropdownBySort';
import DropdownOnpage from '../Dropdowns/DropdownOnpage/DropdownOnpage';
import { useEffect, useState } from 'react';
import { getFilteredProducts } from '../../shared/servises/getFilteredProducts';
import { ItemsOnPage } from '../../shared/types/ItemsOnPage';
import { SortBy } from '../../shared/types/SortBy';
import Pagination from '../Pagination/Pagination';
import { Loader } from '../Loader/Loader';

type Props = {
  title?: string;
  products: Product[];
  isloading: boolean;
  error: string;
};

export const ProductsList: React.FC<Props> = ({
  title,
  products,
  isloading,
  error,
}) => {
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);

  const sortBy = searchParams.get('sort') || 'age';
  const itemsOnPage = searchParams.get('perPage') || '8';
  const query = searchParams.get('query') || '';

  const [filteredProducts, count] = getFilteredProducts(
    products,
    query,
    sortBy as keyof typeof SortBy,
    itemsOnPage as ItemsOnPage,
    +page,
  );

  useEffect(() => {
    setPage(1);
    searchParams.set('page', '1');
    setSearchParams(searchParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsOnPage]);

  const navigationPath = pathname.slice(1);
  const paginationCounter = Math.ceil(count / +itemsOnPage) || 1;
  const reload = () => {
    window.location.reload();
  };

  return (
    <div className="productsList" data-cy="productList">
      <div className="productsList__navigation">
        <Link to="/">
          <div className="icon icon--home"></div>
        </Link>
        <div className="icon icon--arrow-right"></div>
        <p className="productsList__navigation-title">{navigationPath}</p>
      </div>
      <div className="productsList__descriprion">
        <h1 className="productsList__descriprion-title">{title}</h1>
        {error && (
          <>
            <p className="productsList__error">{error}</p>
            <button
              type="button"
              className="productsList__reload"
              onClick={reload}
            >
              Reload
            </button>
          </>
        )}
        <p className="productsList__descriprion-amount">
          {!error ? `${products.length} models` : ''}
        </p>
      </div>

      {isloading && <Loader />}
      {!error && !isloading && (
        <>
          <div className="productsList__sort">
            <DropdownBySort />
            <DropdownOnpage />
          </div>

          <div className="productsList__items">
            {filteredProducts.map(product => (
              <div key={product.id} className="productsList__items-wrap">
                <ProductCard
                  key={product.name}
                  product={product}
                  searchParams={searchParams}
                />
              </div>
            ))}
          </div>
        </>
      )}

      {paginationCounter > 1 && (
        <Pagination total={paginationCounter} page={page} setPage={setPage} />
      )}

      {!error && !isloading && !filteredProducts.length && (
        <h1 className="items__message">{`There are no ${navigationPath} products matching the query`}</h1>
      )}
    </div>
  );
};
