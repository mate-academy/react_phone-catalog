import { useEffect, useState } from 'react';
import { Product } from '../../types/Product';
import products from '../../../public/api/products.json';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import styles from './ProductList.module.scss';
import arrowLeft from './../../img/icons/Chevron Arrow Left.svg';
import arrowLeftDisabled from './../../img/icons/Chevron Arrow Left dis.svg';
import arrowRight from './../../img/icons/Chevron Arrow Right.svg';
import arrowRightDisabled from './../../img/icons/Chevron Arrow Right dis.svg';
import homeImg from './../../img/icons/Home.svg';
import { Link } from 'react-router-dom';

type Props = {
  category: Product['category'];
  itemsPerPage?: number;
  title: string;
  pageName: string;
};

type SortType = 'newest' | 'alphabetical' | 'cheapest';

export const ProductList: React.FC<Props> = ({
  category,
  title = '',
  pageName = '',
}) => {
  const items = products.filter(product => product.category === category);

  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortType>('newest');
  const [itemsPerPageState, setItemsPerPageState] = useState<number | 'all'>(
    16,
  );

  const sortedItems = [...items].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return (b.year || 0) - (a.year || 0);
      case 'alphabetical':
        return a.name.localeCompare(b.name);
      case 'cheapest':
        return a.price - b.price;
      default:
        return 0;
    }
  });

  const itemsPerPageValue =
    itemsPerPageState === 'all' ? sortedItems.length : itemsPerPageState;

  const totalPages =
    itemsPerPageState === 'all'
      ? 1
      : Math.ceil(sortedItems.length / itemsPerPageValue);

  const start = (currentPage - 1) * itemsPerPageValue;
  const visibleItems = sortedItems.slice(start, start + itemsPerPageValue);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handleNext = () => {
    setCurrentPage(prev => (prev < totalPages ? prev + 1 : prev));
  };

  const handlePrev = () => {
    setCurrentPage(prev => (prev > 1 ? prev - 1 : prev));
  };

  const toggleFavorite = (itemId: string) => {
    setFavorites(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId],
    );
  };

  return (
    <section>
      <div className="container">
        <div className={styles.titleWrapper}>
          <Link to="/">
            <img src={homeImg} alt="home img" />
          </Link>
          <img
            src={arrowRightDisabled}
            alt="arrow"
            className={styles.arrowWrapper}
          />
          <span className={styles.pageName}>{pageName}</span>
        </div>

        <h1 className={styles.title}>{title}</h1>

        <span className={styles.modelsCount}>
          {items.length} {items.length === 1 ? 'model' : 'models'}
        </span>

        <div className={styles.sortRow}>
          <div className={styles.sort}>
            <h2>Sort by</h2>
            <select
              value={sortBy}
              onChange={e => {
                setSortBy(e.target.value as SortType);
                setCurrentPage(1);
              }}
              className={styles.sortBy}
            >
              <option value="newest">Newest</option>
              <option value="alphabetical">Alphabetically</option>
              <option value="cheapest">Cheapest</option>
            </select>
          </div>

          <div className={styles.sort}>
            <h2>Items on page</h2>
            <select
              value={itemsPerPageState}
              className={styles.sortItems}
              onChange={e => {
                const value =
                  e.target.value === 'all' ? 'all' : Number(e.target.value);

                setItemsPerPageState(value);
                setCurrentPage(1);
              }}
            >
              <option value="all">All</option>
              <option value={4}>4</option>
              <option value={8}>8</option>
              <option value={16}>16</option>
            </select>
          </div>
        </div>

        <div className={styles.grid}>
          {visibleItems.map(product => (
            <ProductCard
              key={product.id}
              id={product.id.toString()}
              itemId={product.itemId}
              name={product.name}
              fullPrice={product.fullPrice}
              price={product.price}
              screen={product.screen}
              capacity={product.capacity}
              ram={product.ram}
              image={product.image}
              isFavorite={favorites.includes(product.itemId)}
              onToggleFavorite={() => toggleFavorite(product.itemId)}
              category={product.category}
            />
          ))}
        </div>

        {itemsPerPageState !== 'all' && (
          <div className={styles.buttons}>
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className={`${styles.btn} ${styles.arrowBtn}`}
            >
              <img
                src={currentPage === 1 ? arrowLeftDisabled : arrowLeft}
                alt=""
                className={styles.arrow}
              />
            </button>

            {Array.from({ length: totalPages }, (_, i) => {
              const page = i + 1;
              const isActive = currentPage === page;

              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`${styles.btn} ${isActive ? styles.active : ''}`}
                  disabled={isActive}
                >
                  {page}
                </button>
              );
            })}

            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`${styles.btn} ${styles.arrowBtn}`}
            >
              <img
                src={
                  currentPage === totalPages ? arrowRightDisabled : arrowRight
                }
                alt=""
                className={styles.arrow}
              />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
