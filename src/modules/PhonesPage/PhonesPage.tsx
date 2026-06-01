import { FC, useEffect, useState, useMemo } from 'react';
import cn from 'classnames';
import { Container } from '../../components/Container';
import { getAllProducts, Product } from '../../services/api';
import { ProductCard } from '../shared/components/ProductCard';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import { HomeIcon } from '../../components/HomeIcon';
import style from './PhonesPage.module.scss';
import { CustomDropdown } from '../../components/CustomDropdown';

export const PhonesPage: FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Фильтры и пагинация
  const [sortBy, setSortBy] = useState('newest');
  const [perPage, setPerPage] = useState('16');
  const [currentPage, setCurrentPage] = useState(1);

  // пагинация окно
  const [startPage, setStartPage] = useState(1);
  const pagesPerGroup = 4;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllProducts();
        const phones = data.filter(p => p.category === 'phones');

        setProducts(phones);
      } catch (err) {
        setError('Something went wrong. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Сбрасываем страницу на первую, если поменяли фильтр или кол-во элементов
  useEffect(() => {
    setCurrentPage(1);
    setStartPage(1);
  }, [sortBy, perPage]);

  // 1. Сортировка всего списка
  const sortedProducts = useMemo(() => {
    const list = [...products];

    switch (sortBy) {
      case 'newest':
        return list.sort((a, b) => b.year - a.year);
      case 'alphabetically':
        return list.sort((a, b) => a.name.localeCompare(b.name));
      case 'cheapest':
        return list.sort((a, b) => a.price - b.price);
      default:
        return list;
    }
  }, [products, sortBy]);

  // 2. Определение товаров для текущей страницы
  const visibleProducts = useMemo(() => {
    if (perPage === 'all') {
      return sortedProducts;
    }

    const limit = Number(perPage);
    const startIndex = (currentPage - 1) * limit;

    return sortedProducts.slice(startIndex, startIndex + limit);
  }, [sortedProducts, perPage, currentPage]);

  // 3. Расчет страниц
  const totalPages =
    perPage === 'all' ? 1 : Math.ceil(products.length / Number(perPage));

  // видимые страницы (скользящее окно)
  const visiblePages = useMemo(() => {
    return Array.from(
      { length: pagesPerGroup },
      (_, i) => startPage + i,
    ).filter(page => page <= totalPages);
  }, [startPage, totalPages]);

  // кнопки
  const handleNext = () => {
    if (startPage + pagesPerGroup - 1 < totalPages) {
      setStartPage(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (startPage > 1) {
      setStartPage(prev => prev - 1);
    }
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);

    // синхронизация окна
    if (page < startPage) {
      setStartPage(page);
    }

    if (page > startPage + pagesPerGroup - 1) {
      setStartPage(page - pagesPerGroup + 1);
    }
  };

  if (loading) {
    return (
      <Container>
        <h1 className={style.status}>Loading...</h1>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <h1 className={style.status}>{error}</h1>
      </Container>
    );
  }

  // const getPages = (total: number, current: number) => {
  //   const pages: (number | string)[] = [];
  //   const delta = 1; // Сколько страниц показывать по бокам от текущей

  //   for (let i = 1; i <= total; i++) {
  //     // Всегда показываем первую, последнюю и соседние с текущей страницы
  //     if (
  //       i === 1 ||
  //       i === total ||
  //       (i >= current - delta && i <= current + delta)
  //     ) {
  //       pages.push(i);
  //     } else if (pages[pages.length - 1] !== '...') {
  //       // Если пропустили номера, ставим многоточие (только один раз подряд)
  //       pages.push('...');
  //     }
  //   }

  //   return pages;
  // };

  return (
    <main className={style.PhonesPage}>
      <Container>
        <Breadcrumbs
          items={[{ link: '/', icon: <HomeIcon /> }, { label: 'Phones' }]}
        />

        <h1 className={style.title}>Mobile phones</h1>
        <p className={style.count}>{products.length} models</p>

        {/* Секция фильтров */}
        <div className={style.filters}>
          <div className={style.filterGroup}>
            <CustomDropdown
              value={sortBy}
              onChange={setSortBy}
              options={[
                { value: 'newest', label: 'Newest' },
                { value: 'alphabetically', label: 'Alphabetically' },
                { value: 'cheapest', label: 'Cheapest' },
              ]}
              title="Sort by"
            />

            {/* <label className={style.label} htmlFor="sort-select">
              Sort by
            </label>
            <select
              id="sort-select"
              className={style.select}
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
            >
              <option value="newest">Newest</option>
              <option value="alphabetically">Alphabetically</option>
              <option value="cheapest">Cheapest</option>
            </select> */}
          </div>

          <div className={style.filterGroup}>
            <CustomDropdown
              value={perPage}
              onChange={setPerPage}
              options={[
                { value: '4', label: '4' },
                { value: '8', label: '8' },
                { value: '16', label: '16' },
              ]}
              title="Items on page"
            />
            {/* <label className={style.label} htmlFor="per-page-select">
              Items on page
            </label>
            <select
              id="per-page-select"
              className={style.select}
              value={perPage}
              onChange={e => setPerPage(e.target.value)}
            >
              <option value="4">4</option>
              <option value="8">8</option>
              <option value="16">16</option>
              <option value="all">All</option>
            </select> */}
          </div>
        </div>

        {/* Сетка товаров */}
        {visibleProducts.length > 0 ? (
          <div className={style.grid}>
            {visibleProducts.map(product => (
              <ProductCard
                key={product.itemId}
                className={style.phoneCard}
                product={{
                  id: product.itemId,
                  name: product.name,
                  price: product.price,
                  discount: product.fullPrice - product.price,
                  image: product.image,
                  rating: 5,
                  reviewCount: 10,
                  isFavorite: false,
                  screen: product.screen,
                  capacity: product.capacity,
                  ram: product.ram,
                }}
              />
            ))}
          </div>
        ) : (
          <h2 className={style.empty}>There are no phones yet</h2>
        )}

        {/* Пагинация (показывается только если не выбрано "all") */}
        {perPage !== 'all' && totalPages > 1 && (
          <div className={style.pagination}>
            {/* Кнопка Назад */}
            <button
              className={cn(style.pageBtn, style.arrow)}
              disabled={startPage === 1}
              onClick={handlePrev}
            >
              {'<'}
            </button>

            <div className={style.pageNumbers}>
              {visiblePages.map(page => (
                <button
                  key={page}
                  className={cn(style.pageBtn, {
                    [style.pageActive]: currentPage === page,
                  })}
                  onClick={() => handlePageClick(page)}
                >
                  {page}
                </button>
              ))}
            </div>

            {/* Кнопка Вперед */}
            <button
              className={cn(style.pageBtn, style.arrow)}
              disabled={startPage + pagesPerGroup - 1 >= totalPages}
              onClick={handleNext}
            >
              {'>'}
            </button>
          </div>
        )}
      </Container>
    </main>
  );
};
