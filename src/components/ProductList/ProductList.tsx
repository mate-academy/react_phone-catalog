import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { fetchProducts, selectAllProducts } from '../../features/products';
import { ProductCard } from '../ProductCard/ProductCard';
import { RootState } from '../../app/store';
import { FilterStatus } from '../../features/filter';
import './ProductList.scss';

export const ProductList: React.FC<{ category: string }> = ({ category }) => {
  const dispatch = useDispatch<AppDispatch>();

  const products = useSelector(selectAllProducts);
  const filterStatus = useSelector(
    (state: RootState) => state.filter.filterStatus as FilterStatus,
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const sortedProducts = products
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

  return (
    <div className="cards__container">
      {sortedProducts.length > 0 ? (
        sortedProducts.map(product => (
          <div className="one__card" key={product.id}>
            <ProductCard {...product} />
          </div>
        ))
      ) : (
        <p>No products found in this category.</p>
      )}
    </div>
  );
};
