import React, { useEffect, useState, useMemo } from 'react';
import { Products } from '../../type/Products';
import styles from './FilterProducts.module.scss';
import { CradList } from '../Cards/CardList';
import { Pagination } from '../Pagination';
import { topScroll } from '../../Functions/ScrolTop/topScrol';

type Props = {
  products: Products[];
};

export const FilterProducts: React.FC<Props> = ({ products }) => {
  const [count, setCount] = useState(4);
  const [visibleProducts, setVisibleProducts] = useState<Products[]>(products);
  const [sortType, setSortType] = useState<string>('id');
  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * count;
    const lastPageIndex = firstPageIndex + count;

    return visibleProducts.slice(firstPageIndex, lastPageIndex);
  }, [count, currentPage, visibleProducts]);

  useEffect(() => {
    // Sort the products based on the selected sort type
    const sortedProducts = [...products].sort((a, b) => {
      switch (sortType) {
        case 'price':
          return a.price - b.price;
        case 'year':
          return b.year - a.year;
        default:
          return a.id - b.id;
      }
    });

    // Update the visible products based on the sorted products
    setVisibleProducts(sortedProducts);
  }, [products, sortType]);

  useEffect(() => {
    // Scroll to the top of the page when currentPage changes
    topScroll();
  }, [currentPage]);

  const handleCountChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value === 'all') {
      setCount(products.length);
    } else {
      setCount(+event.target.value);
    }

    setCurrentPage(1);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortType(event.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <div className={styles.filterParams}>
          <span>Sort by</span>
          <select className={styles.select} onChange={handleSortChange}>
            <option value="id">Alphabetically</option>
            <option value="price">Cheapest</option>
            <option value="year">Newest</option>
          </select>
        </div>

        <div className={styles.filterParams}>
          <span>Items on page</span>
          <select className={styles.select} onChange={handleCountChange}>
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="16">16</option>
            <option value="all">All</option>
          </select>
        </div>
      </div>
      <div className={styles.outlet}>
        <CradList products={currentTableData} />
        <Pagination
          className="pagiantion-bar"
          currentPage={currentPage}
          totalCount={products.length}
          pageSize={count}
          onPageChange={page => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};
