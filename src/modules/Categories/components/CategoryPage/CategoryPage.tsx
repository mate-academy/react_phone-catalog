import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Product } from '../../../shared/types/Product';
import { ProductCard } from '../../../shared/body/ProductCard';
// eslint-disable-next-line max-len
import styles from '../../../Categories/components/CategoryPage/CategoryPage.module.scss';

type Props = {
  category: string;
};

export const CategoryPage: React.FC<Props> = ({ category }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort') || 'age';
  const page = Number(searchParams.get('page')) || 1;
  const perPage = searchParams.get('perPage') || 'all';

  useEffect(() => {
    fetch('/api/products.json')
      .then(res => res.json())
      .then(setProducts);
  }, []);

  let filtered = products.filter(p => p.category === category);

  if (sort === 'age') {
    filtered = [...filtered].sort((a, b) => b.year - a.year);
  }

  if (sort === 'title') {
    filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
  }

  if (sort === 'price') {
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  }

  const perPageNum = perPage === 'all' ? filtered.length : Number(perPage);

  const start = (page - 1) * perPageNum;
  const visible = filtered.slice(start, start + perPageNum);

  const totalPages = Math.ceil(filtered.length / perPageNum);

  const getPages = () => {
    const pages = [];

    let startPage = Math.max(1, page - 1);
    let endPage = Math.min(totalPages, startPage + 3);

    if (endPage - startPage < 3) {
      startPage = Math.max(1, endPage - 3);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);

    params.set('page', String(newPage));

    setSearchParams(params);
  };

  return (
    <div className={`pageGrid ${styles.page}`}>
      <div className={styles.fullWidth}>
        <div>Home / {category}</div>

        <h1 className={styles.title}>{category}</h1>

        <p>{filtered.length} models</p>
      </div>

      <div className={`${styles.fullWidth} ${styles.controls}`}>
        <select
          value={sort}
          onChange={e => {
            setSearchParams({ sort: e.target.value });
          }}
        >
          <option value="age">Newest</option>
          <option value="title">Alphabetically</option>
          <option value="price">Cheapest</option>
        </select>

        <select
          value={perPage}
          onChange={e => {
            setSearchParams({ perPage: e.target.value });
          }}
        >
          <option value="4">4</option>
          <option value="8">8</option>
          <option value="16">16</option>
          <option value="all">All</option>
        </select>
      </div>

      <div className={styles.grid}>
        {visible.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className={styles.pagination}>
        <button
          disabled={page === 1}
          onClick={() => handlePageChange(page - 1)}
        >
          ←
        </button>

        {getPages().map(p => (
          <button
            key={p}
            className={p === page ? styles.active : ''}
            onClick={() => handlePageChange(p)}
          >
            {p}
          </button>
        ))}

        <button
          disabled={page === totalPages}
          onClick={() => handlePageChange(page + 1)}
        >
          →
        </button>
      </div>
    </div>
  );
};
