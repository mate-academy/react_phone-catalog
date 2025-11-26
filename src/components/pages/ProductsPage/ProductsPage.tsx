import { useEffect, useRef, useState } from 'react';
import { Loader } from '../../shared/Loader';
import { ProductsList } from '../../shared/ProductsList';
import { Pagination } from '../../shared/Pagination';
import { Product } from '../../../types/Product';
import { TopNav } from '../../shared/TopNav';
import { Categories } from '../../../types/Categories';
import { getProductsByCategory } from '../../../server/products';
import { useHotPrice } from '../../../providers/HotPriceProvider';
import styles from './ProductsPage.module.scss';

type SortBy = 'Newest' | 'Low to High' | 'High to Low';
type ItemsOnPage = 16 | 20 | 24;

type Props = {
  category: Categories;
};

export const ProductsPage: React.FC<Props> = ({ category }) => {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [perPageOption, setPerPageOption] = useState<ItemsOnPage>(16);
  const [sortOption, setSortOption] = useState<SortBy>('Newest');

  const [isPerPageOpen, setIsPerPageOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const { setIsHotPrice } = useHotPrice();

  const perPageRef = useRef<HTMLDivElement | null>(null);
  const sortRef = useRef<HTMLDivElement | null>(null);

  const perPageOptions: ItemsOnPage[] = [16, 20, 24];
  const sortOptions: SortBy[] = ['Newest', 'Low to High', 'High to Low'];

  // Закриття дропдаунів при кліку поза ними
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (perPageRef.current?.contains(target)) {
        return;
      }

      if (sortRef.current?.contains(target)) {
        return;
      }

      setIsPerPageOpen(false);
      setIsSortOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Завантаження продуктів за категорією
  useEffect(() => {
    setLoading(true);
    setError('');

    getProductsByCategory(category)
      .then(data => {
        const filtered = data.filter(
          item => item.priceDiscount < item.priceRegular,
        );

        setItems(filtered);
        setIsHotPrice(true);
      })
      .catch(() => setError('Failed to load products'))
      .finally(() => setLoading(false));

    setCurrentPage(1);
  }, [category]);

  // Сортування
  const sortedItems = [...items].sort((a, b) => {
    switch (sortOption) {
      case 'Newest':
        return Number(b.id) - Number(a.id);
      case 'Low to High':
        return a.priceDiscount - b.priceDiscount;
      case 'High to Low':
        return b.priceDiscount - a.priceDiscount;
      default:
        return 0;
    }
  });

  // Пагінація
  const lastIndex = perPageOption * currentPage;
  const firstIndex = lastIndex - perPageOption;
  const currentItems = sortedItems.slice(firstIndex, lastIndex);

  const onPageChange = (page: number) => setCurrentPage(page);
  const nextPage = () => setCurrentPage(prev => prev + 1);
  const prevPage = () => setCurrentPage(prev => prev - 1);

  // Рендер
  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className={styles.products}>
      <TopNav category={category} />

      <h1 className={styles.products__title}>
        {category === 'phones'
          ? 'Mobile phones'
          : category.charAt(0).toUpperCase() + category.slice(1)}
      </h1>

      <p className={styles.products__length}>
        {items.length} model{items.length !== 1 ? 's' : ''}
      </p>

      <div className={styles.products__dropDownMenu}>
        {/* Сортування */}
        <div className={styles.dropdown} ref={sortRef}>
          <p className={styles.dropdown__title}>Sort by</p>
          <button
            type="button"
            className={`${styles.dropdown__button} ${isSortOpen ? styles['dropdown__button--active'] : ''}`}
            onClick={() => setIsSortOpen(prev => !prev)}
          >
            {sortOption}
          </button>

          {isSortOpen && (
            <ul className={`${styles.dropdown__content} ${styles.content}`}>
              {sortOptions.map(option => (
                <li
                  key={option}
                  className={styles.content__item}
                  onClick={() => {
                    setSortOption(option);
                    setCurrentPage(1);
                    setIsSortOpen(false);
                  }}
                >
                  {option}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={styles.dropdown} ref={perPageRef}>
          <p className={styles.dropdown__title}>Items on page</p>
          <button
            type="button"
            className={`${styles.dropdown__button} ${isPerPageOpen ? styles['dropdown__button--active'] : ''}`}
            onClick={() => setIsPerPageOpen(prev => !prev)}
          >
            {perPageOption}
          </button>

          {isPerPageOpen && (
            <ul className={`${styles.dropdown__content} ${styles.content}`}>
              {perPageOptions.map(option => (
                <li
                  key={option}
                  className={styles.content__item}
                  onClick={() => {
                    setPerPageOption(option);
                    setCurrentPage(1);
                    setIsPerPageOpen(false);
                  }}
                >
                  {option}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className={styles.products__container}>
        <ProductsList products={currentItems} category={category} />
      </div>

      <Pagination
        total={items.length}
        currentPage={currentPage}
        perPage={perPageOption}
        onPageChange={onPageChange}
        nextPage={nextPage}
        prevPage={prevPage}
      />
    </section>
  );
};
