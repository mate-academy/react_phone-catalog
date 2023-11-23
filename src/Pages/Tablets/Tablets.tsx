/* eslint-disable max-len */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useSearchParams } from 'react-router-dom';
import './Tablets.scss';
import { Product } from '../../types/productType';
import { Pagination } from '../../components/Pagination/Pagination';
import { getNumbers } from '../../utils/getNumbers';
import { Sort } from '../../components/Sort/Sort';
import { ProductList } from '../../components/ProductList/ProductList';
import { Breadcrumbs } from '../../components/BreadCrumbs/BreadCrumbs';
import { getSortedProducts } from '../../utils/filteredProducts';
import { CartItem } from '../../types/cartType';

type Props = {
  tablets: Product[],
  setFavorites: React.Dispatch<React.SetStateAction<Product[]>>,
  favorites: Product[],
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>
};

export const Tablets: React.FC<Props> = ({
  tablets,
  setFavorites,
  favorites,
  cartItems,
  setCartItems,
}) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const perPage = searchParams.get('perPage') || 16;
  const query = searchParams.get('query');

  const currentPage = Number(searchParams.get('page') || '1');

  const totalItems = getSortedProducts(tablets, sort, query).length;
  const startItem = +perPage * currentPage - +perPage + 1;
  const endItem
    = startItem + +perPage - 1 > totalItems
      ? totalItems
      : startItem + +perPage - 1;

  const visibleItems = getSortedProducts(tablets, sort, query).slice(startItem - 1, endItem);
  const pageCount = getNumbers(1, Math.ceil(totalItems / +perPage)).map(n => n);

  return (
    tablets.length
      ? (
        <div className="tablets">

          <div className="breadcrumbs-container" data-cy="breadCrumbs">
            <Breadcrumbs />
          </div>

          <div className="tablets__description">
            <h1 className="tablets__description-title title">
              Tablets
            </h1>
            <p className="tablets__description-count items-count">{`${tablets.length} models`}</p>
          </div>

          <div className="sort-container">
            <Sort
              products={tablets}
            />
          </div>

          {totalItems > 0
            ? (
              <div className="product-list-container">
                <ProductList
                  products={visibleItems}
                  setFavorites={setFavorites}
                  favorites={favorites}
                  cartItems={cartItems}
                  setCartItems={setCartItems}
                />
              </div>
            )
            : <h1 className="title" style={{ marginTop: '40px' }}>There is no results for this search</h1>}
          {totalItems / +perPage > 1 && (
            <div className="pagination-container">
              <Pagination
                total={totalItems}
                perPage={+perPage}
                arrOfPages={pageCount}
              />
            </div>
          )}
        </div>
      )
      : <h1 className="title">Tablets not found</h1>
  );
};
