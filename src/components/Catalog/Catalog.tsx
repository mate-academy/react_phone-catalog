import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../ProductCard/ProductCard';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import CatalogFilters from '../CatalogFilters/CatalogFilters';
import './Catalog.scss';

// 1. Оновлений інтерфейс згідно з твоїм JSON
interface Product {
  id: string; // У тебе це рядок: "apple-iphone-11..."
  category: string;
  name: string;
  priceRegular: number;
  priceDiscount: number;
  images: string[];
  screen: string;
  capacity: string;
  ram: string;
  // Додай інші поля, якщо вони потрібні в ProductCard
}

interface CatalogProps {
  products: Product[];
}

const TITLES_MAP: Record<string, string> = {
  phones: 'Mobile phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

const Catalog: React.FC<CatalogProps> = ({ products }) => {
  const { category } = useParams<{ category: string }>();
  const title = category ? (TITLES_MAP[category] ?? 'Catalog') : 'Catalog';

  const [sort, setSort] = useState('newest');
  const [perPage, setPerPage] = useState<'all' | number>(8);
  const [currentPage, setCurrentPage] = useState(1);

  // Скидаємо сторінку при зміні категорії або фільтрів
  useEffect(() => {
    setCurrentPage(1);
  }, [category, sort, perPage]);

  // 2. Виправлена логіка сортування під твої поля
  const sortedProducts = useMemo(() => {
    const filtered = products.filter(p => p.category === category);

    return [...filtered].sort((a, b) => {
      switch (sort) {
        case 'alphabet':
          return a.name.localeCompare(b.name);

        case 'cheapest':
          // Використовуємо ціну зі знижкою (priceDiscount)
          return a.priceDiscount - b.priceDiscount;

        case 'expensive':
          return b.priceDiscount - a.priceDiscount;

        case 'newest':
          // Оскільки явного поля 'year' немає, сортуємо по ID у зворотному порядку
          // (зазвичай новіші моделі мають "вищий" алфавітний порядок або довші ID)
          return b.id.localeCompare(a.id);

        default:
          return 0;
      }
    });
  }, [products, category, sort]);

  const totalCount = sortedProducts.length;
  const isAllSelected = perPage === 'all';
  const itemsPerPage = isAllSelected ? totalCount : Number(perPage);
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const visibleProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedProducts.slice(start, start + itemsPerPage);
  }, [sortedProducts, currentPage, itemsPerPage]);

  const getVisiblePages = () => {
    const pages: number[] = [];
    const maxVisible = 4;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = start + maxVisible - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  if (!category) return <p>No category selected</p>;

  return (
    <section className="catalog">
      <Breadcrumbs />

      <h1 className="catalog-title">{title}</h1>
      <p className="catalog-count">
        {totalCount} {totalCount === 1 ? 'model' : 'models'}
      </p>

      <CatalogFilters
        sort={sort}
        perPage={perPage}
        onSortChange={setSort}
        onPerPageChange={setPerPage}
      />

      <div className="catalog-grid">
        {visibleProducts.length > 0 ? (
          visibleProducts.map((product) => (
            <ProductCard
              // Використовуємо id як унікальний ключ
              key={product.id}
              product={product as any}
              showDiscount
            />
          ))
        ) : (
          <p className="catalog-empty">No products found in this category</p>
        )}
      </div>

      {!isAllSelected && totalPages > 1 && (
        <div className="catalog-pagination">
          <button
            type="button"
            className="pagination-arrow"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
          >
            <img src="img/Arrow_Left.svg" alt="Prev" />
          </button>

          <div className="pagination-list">
            {getVisiblePages().map(page => (
              <button
                key={`page-${page}`}
                type="button"
                className={`pagination-button ${currentPage === page ? 'active' : ''}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            type="button"
            className="pagination-arrow"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => prev + 1)}
          >
            <img src="img/Arrow_Right.svg" alt="Next" />
          </button>
        </div>
      )}
    </section>
  );
};

export default Catalog;
