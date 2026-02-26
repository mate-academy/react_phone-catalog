import { useState } from 'react';
import { Footer } from '../Footer/Footer';
import { Navigation } from '../Navigation/Navigation';
import { Link } from 'react-router-dom';
import { ProductCard } from '../Card/ProductCard';
import styles from '../Phone/Phone.module.scss';
import arrowLeft from '../../items/arrow_left.png';
import arrowRight from '../../items/arrow_right.png';
import homeImage from '../../items/Home.png';
import accessoriesData from '../../../public/api/accessories.json';
import { Select } from '../Select/Select';

const ITEMS_PER_PAGE = 16;

type SortOption =
  | 'Newest'
  | 'Oldest'
  | 'Price: Low to High'
  | 'Price: High to Low';

const sortAccessories = (
  accessories: typeof accessoriesData,
  sortBy: SortOption,
) => {
  const arr = [...accessories];

  switch (sortBy) {
    case 'Price: Low to High':
      return arr.sort((a, b) => a.priceDiscount - b.priceDiscount);
    case 'Price: High to Low':
      return arr.sort((a, b) => b.priceDiscount - a.priceDiscount);
    case 'Oldest':
      return arr.reverse();
    case 'Newest':
    default:
      return arr;
  }
};

export const Accessories = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortOption>('Newest');
  const [itemsOnPage, setItemsOnPage] = useState('16');

  const perPage = Number(itemsOnPage) || ITEMS_PER_PAGE;
  const sorted = sortAccessories(accessoriesData, sortBy);
  const totalPages = Math.ceil(sorted.length / perPage);
  const startIndex = (currentPage - 1) * perPage;
  const currentAccessories = sorted.slice(startIndex, startIndex + perPage);

  const handleSortChange = (value: string) => {
    setSortBy(value as SortOption);
    setCurrentPage(1);
  };

  const handleItemsChange = (value: string) => {
    setItemsOnPage(value);
    setCurrentPage(1);
  };

  return (
    <div>
      <Navigation />

      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.breadcrumb}>
            <Link className={styles.card_link} to="/">
              <img className={styles.homeImg} src={homeImage} alt="home" />
            </Link>
            <span> &gt; </span>
            <span>Accessories</span>
          </div>

          <h1 className={styles.title}>Accessories</h1>
          <p className={styles.count}>{accessoriesData.length} models</p>

          <div className={styles.filters}>
            <Select
              label="Sort by"
              options={[
                'Newest',
                'Oldest',
                'Price: Low to High',
                'Price: High to Low',
              ]}
              value={sortBy}
              onChange={handleSortChange}
            />
            <Select
              label="Items on page"
              options={['16', '32', '64']}
              value={itemsOnPage}
              onChange={handleItemsChange}
            />
          </div>

          <div className={styles.grid}>
            {currentAccessories.map(accessory => (
              <Link
                key={accessory.id}
                to={`/product/${accessory.id}`}
                className={styles.card_link}
              >
                <ProductCard
                  id={accessory.id}
                  image={accessory.images[0]}
                  name={accessory.name}
                  price={accessory.priceDiscount}
                  fullPrice={accessory.priceRegular}
                  screen={accessory.screen}
                  capacity={accessory.capacity}
                  ram={accessory.ram}
                />
              </Link>
            ))}
          </div>

          <div className={styles.pagination}>
            <button
              className={styles.pagination__arrow}
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <img src={arrowLeft} alt="prev" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                className={`${styles.pagination__page} ${currentPage === page ? styles.pagination__page_active : ''}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
            <button
              className={styles.pagination__arrow}
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              <img src={arrowRight} alt="next" />
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
