/* eslint-disable max-len */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useSearchParams } from 'react-router-dom';
import './Accessories.scss';
import { Product } from '../../types/productType';
import { Pagination } from '../../components/Pagination/Pagination';
import { getNumbers } from '../../utils/getNumbers';
import { Sort } from '../../components/Sort/Sort';
import { ProductList } from '../../components/ProductList/ProductList';
import { Breadcrumbs } from '../../components/BreadCrumbs/BreadCrumbs';
import { getSortedProducts } from '../../utils/filteredProducts';
import { CartItem } from '../../types/cartType';

type Props = {
  accessories: Product[],
  setFavorites: React.Dispatch<React.SetStateAction<Product[]>>,
  favorites: Product[],
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>
};

export const Accessories: React.FC<Props> = ({
  accessories,
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

  const totalItems = getSortedProducts(accessories, sort, query).length;
  const startItem = +perPage * currentPage - +perPage + 1;
  const endItem
    = startItem + +perPage - 1 > totalItems
      ? totalItems
      : startItem + +perPage - 1;

  const visibleItems = getSortedProducts(accessories, sort, query).slice(startItem - 1, endItem);
  const pageCount = getNumbers(1, Math.ceil(totalItems / +perPage)).map(n => n);

  return (
    accessories.length
      ? (
        <div className="accessories">

          <div className="breadcrumbs-container" data-cy="breadCrumbs">
            <Breadcrumbs />
          </div>

          <div className="accessories__description">
            <h1 className="accessories__description-title title">
              Accessories
            </h1>
            <p className="accessories__description-count items-count">{`${accessories.length} models`}</p>
          </div>

          <div className="sort-container">
            <Sort
              products={accessories}
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
      : <h1 className="title">Accessories not found</h1>
  );
};
