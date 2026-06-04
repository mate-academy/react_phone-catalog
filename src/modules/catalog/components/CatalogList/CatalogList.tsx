import React, { useMemo, useState } from 'react';
import { Accessorie } from '../../../../types/accessorie';
import { Phone } from '../../../../types/phone';
import { Tablet } from '../../../../types/tablet';
import { ProductCard } from '../../../shared/components/ProductCard';
import styles from './CatalogList.module.scss';
import { Product } from '../../../../types/product';

type AnyProduct = Phone | Tablet | Accessorie;

type Props = {
  products: AnyProduct[];
  title: string;
};

const mapToProduct = (item: AnyProduct): Product => {
  return {
    id: 0,
    category: item.category,
    itemId: item.id,
    name: item.name,
    fullPrice: item.priceRegular,
    price: item.priceDiscount,
    screen: item.screen,
    capacity: item.capacity,
    color: item.color,
    ram: item.ram,
    year: 'year' in item ? item.year : 0,
    image: item.images[0] || '',
  };
};

export const CatalogList: React.FC<Props> = ({ products, title }) => {
  const [sortBy, setSortBy] = useState('age');
  const [perPage, setPerPage] = useState('all');

  const sortedProducts = useMemo(() => {
    const copy = [...products];

    switch (sortBy) {
      case 'age':
        return copy.sort((a, b) => {
          const yearA = 'year' in a ? a.year : 0;
          const yearB = 'year' in b ? b.year : 0;

          return yearB - yearA;
        });
      case 'title':
        return copy.sort((a, b) => a.name.localeCompare(b.name));
      case 'price':
        return copy.sort((a, b) => a.priceDiscount - b.priceDiscount);
      default:
        return copy;
    }
  }, [products, sortBy]);

  const visibleProducts = useMemo(() => {
    if (perPage === 'all') {
      return sortedProducts;
    }

    const limit = +perPage;

    return sortedProducts?.slice(0, limit);
  }, [sortedProducts, perPage]);

  const currentProductsQuantity = products.length;

  return (
    <div className={styles.listWrapper}>
      <div className={styles.topBar}>
        <h1 className={styles.title}>{title.toUpperCase()} PAGE</h1>

        <div className={styles.quantity}>{currentProductsQuantity} models</div>

        <label htmlFor="sort-select">
          <p>Sort by</p>

          <select
            id="sort-select"
            value={sortBy}
            onChange={event => setSortBy(event.target.value)}
          >
            <option value="age">Newest</option>
            <option value="title">Alphabetically</option>
            <option value="price">Cheapest</option>
          </select>
        </label>

        <label htmlFor="per-page-select">
          <p>Items on page</p>

          <select
            id="per-page-select"
            value={perPage}
            onChange={event => setPerPage(event.target.value)}
          >
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="16">16</option>
            <option value="all">All</option>
          </select>
        </label>
      </div>

      <div className={styles.listWindow}>
        <section className={styles.productList}>
          {visibleProducts.map(product => {
            return (
              <div key={product.id} className={styles.cardWrapper} data-card>
                <ProductCard product={mapToProduct(product)} />
              </div>
            );
          })}
        </section>
      </div>
    </div>
  );
};
