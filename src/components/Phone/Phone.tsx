import { useState } from 'react';
import { Footer } from '../Footer/Footer';
import { Navigation } from '../Navigation/Navigation';
import { Link } from 'react-router-dom';
import { ProductCard } from '../Card/ProductCard';
import styles from './Phone.module.scss';
import arrowLeft from '../../items/arrow_left.png';
import arrowRight from '../../items/arrow_right.png';
import homeImage from '../../items/Home.png';
import phonesData from '../../../public/api/phones.json';
import { Select } from '../Select/Select';
import { SortOption, SORT_OPTIONS } from '../../types/SortOption';

const ITEMS_PER_PAGE = 16;

const getModelNumber = (id: string): number => {
  const match = id.match(/iphone-(\d+)/);

  return match ? parseInt(match[1]) : 0;
};

const sortPhones = (phones: typeof phonesData, sortBy: SortOption) => {
  const arr = [...phones];

  switch (sortBy) {
    case SortOption.Newest:
      return arr.sort(
        (a, b) => getModelNumber(b.namespaceId) - getModelNumber(a.namespaceId),
      );
    case SortOption.Oldest:
      return arr.sort(
        (a, b) => getModelNumber(a.namespaceId) - getModelNumber(b.namespaceId),
      );
    case SortOption.PriceLow:
      return arr.sort((a, b) => a.priceDiscount - b.priceDiscount);
    case SortOption.PriceHigh:
      return arr.sort((a, b) => b.priceDiscount - a.priceDiscount);
    default:
      return arr;
  }
};

export const Phone = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortOption>(SortOption.Newest);
  const [itemsOnPage, setItemsOnPage] = useState('16');

  const perPage = Number(itemsOnPage) || ITEMS_PER_PAGE;
  const sorted = sortPhones(phonesData, sortBy);
  const totalPages = Math.ceil(sorted.length / perPage);
  const startIndex = (currentPage - 1) * perPage;
  const currentPhones = sorted.slice(startIndex, startIndex + perPage);

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
            <span>Phones</span>
          </div>

          <h1 className={styles.title}>Mobile phones</h1>
          <p className={styles.count}>{phonesData.length} models</p>

          <div className={styles.filters}>
            <Select
              label="Sort by"
              options={SORT_OPTIONS}
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
            {currentPhones.map(phone => (
              <Link
                key={phone.id}
                to={`/product/${phone.id}`}
                className={styles.card_link}
              >
                <ProductCard
                  id={phone.id}
                  image={phone.images[0]}
                  name={phone.name}
                  price={phone.priceDiscount}
                  fullPrice={phone.priceRegular}
                  screen={phone.screen}
                  capacity={phone.capacity}
                  ram={phone.ram}
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
