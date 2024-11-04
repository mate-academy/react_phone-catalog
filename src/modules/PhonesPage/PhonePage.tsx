import { Link, NavLink, useSearchParams } from 'react-router-dom';

import styles from './PhonePage.module.scss';
import { ProductCard } from '../../components/ProductCard';
import phones from '../../../public/api/phones.json';
import { Pagination } from '../../components/Pagination';
import { SortProduct } from '../../components/SortProducts';
import { useEffect, useMemo } from 'react';
import { SortBy } from '../../types/SortBy';

export const PhonePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const itemsPerPage = searchParams.get('perPage') || '4';
  const sortBy = (searchParams.get('sortBy') || SortBy.newest).toLowerCase();
  const currentPage = +(searchParams.get('page') || 1);
  const productList = [...phones];

  const filteredProductList = useMemo(() => {
    if (
      sortBy === SortBy.cheapest.toLowerCase() ||
      sortBy === SortBy.expensive.toLowerCase()
    ) {
      let direction = 1;

      if (sortBy === SortBy.expensive.toLowerCase()) {
        direction = -1;
      }

      productList.sort((a, b) => direction * (a.priceRegular - b.priceRegular));
    }

    if (
      sortBy === SortBy.newest.toLowerCase() ||
      sortBy === SortBy.oldest.toLowerCase()
    ) {
      let direction = -1;

      if (sortBy === SortBy.oldest.toLowerCase()) {
        direction = 1;
      }

      productList.sort((a, b) => {
        const processorA = a.processor.split(' ');
        const processorB = b.processor.split(' ');

        return direction * (+processorA[1].slice(1) - +processorB[1].slice(1));
      });
    }

    if (!+itemsPerPage) {
      return productList;
    }

    const toDisplay = +itemsPerPage || 0;

    return productList.slice(
      (currentPage - 1) * toDisplay,
      (currentPage - 1) * toDisplay + toDisplay,
    );
  }, [sortBy, itemsPerPage, currentPage]);

  useEffect(() => {
    searchParams.set('page', '1');
    setSearchParams(searchParams);
  }, [sortBy, itemsPerPage]);

  return (
    <section className={styles.phonePageContainer}>
      <div className={styles.pathContainer}>
        <Link to="/" className={styles.toHome}></Link>
        <span className={styles.arrowRight}></span>
        <NavLink to="/phones" className={styles.currPlace}>
          Phones
        </NavLink>
      </div>

      <h1 className={styles.title}>Mobile phones</h1>
      <p className={styles.categoryNumModels}>{productList.length} models</p>
      <SortProduct />
      <div className={styles.productsContainer}>
        {filteredProductList.map(product => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>

      <Pagination totalCount={productList.length} currentPage={currentPage} />
    </section>
  );
};
