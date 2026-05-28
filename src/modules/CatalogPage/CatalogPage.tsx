/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { Product } from '../HomePage/HomePage';
import styles from './CatalogPage.module.scss';
import home from '../../api/icons/Home.svg';
import vector from '../../api/icons/Vector.svg';
import productsData from '../../data/products.json';
import { ProductCard } from '../../components/ProduuctCard/ProductCard';
import { Pagination } from '../../components/Pagination/Pagination'; // Импортируем пагинацию

export const CatalogPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);

  const sortBy = searchParams.get('sort') || 'newest';
  const perPage = searchParams.get('perPage') || 'all';

  // Достаем текущую страницу из URL, по дефолту 1
  const currentPage = Number(searchParams.get('page')) || 1;

  const displayTitle =
    category === 'phones'
      ? 'Mobile phones'
      : category
        ? category.charAt(0).toUpperCase() + category.slice(1)
        : '';

  useEffect(() => {
    const filtered = (productsData as Product[]).filter(
      p => p.category === category,
    );

    setProducts(filtered);
  }, [category]);

  // 1. Сортируем все продукты категории
  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === 'alphabetically') {
      return a.name.localeCompare(b.name);
    }

    if (sortBy === 'cheapest') {
      return a.price - b.price;
    }

    return b.year - a.year;
  });

  // 2. Считаем лимиты для пагинации
  const itemsPerPage =
    perPage === 'all' ? sortedProducts.length : Number(perPage);

  // Вычисляем индексы для обрезки массива
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Из всех отсортированных берем только карточки для ТЕКУЩЕЙ страницы
  const visibleProducts = sortedProducts.slice(startIndex, endIndex);

  // Сброс страницы на первую при смене сортировки
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams({ sort: e.target.value, perPage, page: '1' });
  };

  // Сброс страницы на первую при изменении количества карточек на странице
  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams({ sort: sortBy, perPage: e.target.value, page: '1' });
  };

  // Функция переключения страницы
  const handlePageChange = (page: number) => {
    setSearchParams({ sort: sortBy, perPage, page: page.toString() });
    window.scrollTo({ top: 0, behavior: 'smooth' }); // При переключении плавно скроллим вверх
  };

  return (
    <main className={styles.catalogPage}>
      <div className={styles.container}>
        <nav className={styles.breadcrumbs}>
          <Link to="/" className={styles.crumbLink}>
            <img src={home} alt="home" />
          </Link>
          <div className={styles.arrowIcon}>
            <img src={vector} alt="arrow" />
          </div>
          <span className={styles.currentCrumb}>
            {category === 'phones' ? 'Phones' : category}
          </span>
        </nav>

        <h1 className={styles.title}>{displayTitle}</h1>

        <p className={styles.count}>{products.length} models</p>

        <div className={styles.controls}>
          <div className={styles.controlGroup}>
            <label className={styles.label}>Sort by</label>
            <select
              value={sortBy}
              onChange={handleSortChange}
              className={styles.select}
            >
              <option value="newest">Newest</option>
              <option value="alphabetically">Alphabetically</option>
              <option value="cheapest">Cheapest</option>
            </select>
          </div>

          <div className={styles.controlGroup}>
            <label className={styles.label}>Items per page</label>
            <select
              value={perPage}
              onChange={handlePerPageChange}
              className={styles.select}
            >
              <option value="4">4</option>
              <option value="8">8</option>
              <option value="16">16</option>
              <option value="all">All</option>
            </select>
          </div>
        </div>

        {/* Сетка с отфильтрованными карточками */}
        <div className={styles.grid}>
          {visibleProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Наш новый компонент пагинации */}
        <Pagination
          totalItems={sortedProducts.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </main>
  );
};
