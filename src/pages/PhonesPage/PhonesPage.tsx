import { NavLink, useSearchParams } from 'react-router-dom';
import styles from './PhonesPage.module.scss';
import { SortDropdown } from '../../components/SortDropdown';
import { Card } from '../../components/Card';
import { Pagination } from '../../components/Pagination';
import products from '../../../public/api/products.json';

import arrowRight from '../../imgs/svg/arrow-right-icon.svg';
import homeIcon from '../../imgs/svg/home-icon.svg';

const phoneSortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'priceLow', label: 'Price:Ascending' },
  { value: 'priceHigh', label: 'Price:Descending' },
  { value: 'nameAsc', label: 'Name: A to Z' },
  { value: 'nameDesc', label: 'Name: Z to A' },
];

const itemsPerPageOptions = [
  { value: '16', label: '16' },
  { value: '32', label: '32' },
  { value: '64', label: '64' },
];

export const PhonesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const limit = Number(searchParams.get('limit')) || 16;
  const page = Number(searchParams.get('page')) || 1;
  const sortKey = searchParams.get('sortPhones') || 'newest';

  const phones = products.filter(product => product.category === 'phones');

  const sortedPhones = [...phones].sort((a, b) => {
    switch (sortKey) {
      case 'newest':
        return b.year - a.year;
      case 'priceLow':
        return a.price - b.price;
      case 'priceHigh':
        return b.price - a.price;
      case 'nameAsc':
        return a.name.localeCompare(b.name);
      case 'nameDesc':
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  const totalPages = Math.ceil(sortedPhones.length / limit);
  const startIndex = (page - 1) * limit;
  const displayedPhones = sortedPhones.slice(startIndex, startIndex + limit);

  const handlePageChange = (newPage: number) => {
    setSearchParams(prevParams => {
      const newParams = new URLSearchParams(prevParams);

      newParams.set('page', newPage.toString());

      return newParams;
    });
  };

  return (
    <div className={styles.phones}>
      <div className={styles.phones__navigate_icons}>
        <NavLink to="/">
          <img
            src={homeIcon}
            alt="home"
            className={styles.phones__navigate_icon}
          />
        </NavLink>
        <img
          src={arrowRight}
          alt="arrow"
          className={styles.phones__navigate_icon}
        />
        <p className={styles.phones__navigate_icon_text}>Phones</p>
      </div>

      <h1 className={styles.phones__title}>Mobile phones</h1>
      <p className={styles.phones__count}>{phones.length} models</p>

      <div className={styles.phones__sorts_page}>
        <div className={styles.phones__sorts_sortBy}>
          <p className={styles.phones__sorts_sortBy_text}>Sort by</p>
          <SortDropdown sortOptions={phoneSortOptions} sortKey="sortPhones" />
        </div>
        <div className={styles.phones__sorts_sortItems}>
          <p className={styles.phones__sorts_sortItems_text}>Items on page</p>
          <SortDropdown sortOptions={itemsPerPageOptions} sortKey="limit" />
        </div>
      </div>

      <div className={styles.phones__list}>
        {displayedPhones.map(phone => (
          <Card
            key={phone.id}
            card={{
              id: Number(phone.id),
              category: phone.category,
              itemId: phone.itemId,
              name: phone.name,
              fullPrice: phone.fullPrice,
              price: phone.price,
              screen: phone.screen,
              capacity: phone.capacity,
              color: phone.color,
              ram: phone.ram,
              year: phone.year,
              image: `/${phone.image}`,
            }}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={page}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};
