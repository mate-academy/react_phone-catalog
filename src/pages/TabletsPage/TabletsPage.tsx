import { NavLink, useSearchParams } from 'react-router-dom';
import styles from './TabletsPage.module.scss';
import { SortDropdown } from '../../components/SortDropdown';
import { Card } from '../../components/Card';
import { Pagination } from '../../components/Pagination';
import products from '../../../public/api/products.json';

import arrowRight from '../../imgs/svg/arrow-right-icon.svg';
import homeIcon from '../../imgs/svg/home-icon.svg';

const tabletSortOptions = [
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

export const TabletsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const limit = Number(searchParams.get('limit')) || 16;
  const page = Number(searchParams.get('page')) || 1;
  const sortKey = searchParams.get('sortTablets') || 'newest';

  const tablets = products.filter(product => product.category === 'tablets');

  const sortedTablets = [...tablets].sort((a, b) => {
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

  const totalPages = Math.ceil(sortedTablets.length / limit);
  const startIndex = (page - 1) * limit;
  const displayedTablets = sortedTablets.slice(startIndex, startIndex + limit);

  const handlePageChange = (newPage: number) => {
    setSearchParams(prevParams => {
      const newParams = new URLSearchParams(prevParams);

      newParams.set('page', newPage.toString());

      return newParams;
    });
  };

  return (
    <div className={styles.tablets}>
      <div className={styles.tablets__navigate_icons}>
        <NavLink to="/">
          <img
            src={homeIcon}
            alt="home"
            className={styles.tablets__navigate_icon}
          />
        </NavLink>
        <img
          src={arrowRight}
          alt="arrow"
          className={styles.tablets__navigate_icon}
        />
        <p className={styles.tablets__navigate_icon_text}>Tablets</p>
      </div>

      <h1 className={styles.tablets__title}>Tablets</h1>
      <p className={styles.tablets__count}>{tablets.length} models</p>

      <div className={styles.tablets__sorts_page}>
        <div className={styles.tablets__sorts_sortBy}>
          <p className={styles.tablets__sorts_sortBy_text}>Sort by</p>
          <SortDropdown sortOptions={tabletSortOptions} sortKey="sortTablets" />
        </div>
        <div className={styles.tablets__sorts_sortItems}>
          <p className={styles.tablets__sorts_sortItems_text}>Items on page</p>
          <SortDropdown sortOptions={itemsPerPageOptions} sortKey="limit" />
        </div>
      </div>

      <div className={styles.tablets__list}>
        {displayedTablets.map(tablet => (
          <Card
            key={tablet.id}
            card={{
              id: Number(tablet.id),
              category: tablet.category,
              itemId: tablet.itemId,
              name: tablet.name,
              fullPrice: tablet.fullPrice,
              price: tablet.price,
              screen: tablet.screen,
              capacity: tablet.capacity,
              color: tablet.color,
              ram: tablet.ram,
              year: tablet.year,
              image: `/${tablet.image}`,
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
