import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { fetchProducts, selectAllProducts } from '../../features/products';
import { ProductCard } from '../ProductCard/ProductCard';
import { FilterStatus } from '../../features/filter';
import './ProductList.scss';
import { PaginationControls } from '../PaginationControls/PaginationControls';
import { setCurrentPage } from '../../features/pagination';
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';


export const ProductList: React.FC<{ category: string }> = ({ category }) => {
  const dispatch = useDispatch<AppDispatch>();
  //const { itemId } = useParams();
  const products = useSelector(selectAllProducts);
  const filterStatus = useSelector(
    (state: RootState) => state.filter.filterStatus as FilterStatus,
  );
  const { paginationStatus, currentPage } = useSelector(
    (state: RootState) => state.pagination,
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);


  const filteredSortedProducts = products
    .filter(
      product => product.category.toLowerCase() === category.toLowerCase(),
    )
    .sort((a, b) => {
      switch (filterStatus) {
        case 'alphabetically':
          return a.name.localeCompare(b.name);
        case 'price':
          return Number(a.price) - Number(b.price);
        case 'newest':
          return b.year - a.year;
        default:
          return 0;
      }
    });


  const paginatedProducts =
    paginationStatus === 'all'
      ? filteredSortedProducts
      : filteredSortedProducts.slice(
          (currentPage - 1) * paginationStatus,
          currentPage * paginationStatus,
        );
const itemsPerPage =
  paginationStatus === 'all' ? filteredSortedProducts.length : paginationStatus;

const totalPages = Math.ceil(filteredSortedProducts.length / itemsPerPage);

  return (
    <>
      <div className="cards__container">
        {paginatedProducts.length > 0 ? (
          paginatedProducts.map(product => (
            <NavLink to={product.itemId}  className="one__card" key={product.id}>
              <ProductCard {...product} />
            </NavLink>
          ))
        ) : (
          <p>No products found in this category.</p>
        )}
      </div>
      <div className="product-list__pagination">
        {paginationStatus !== 'all' && totalPages > 1 && (
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={page => dispatch(setCurrentPage(page))}
          />
        )}
      </div>
    </>
  );
};

export default ProductList;
