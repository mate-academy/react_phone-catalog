import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ProdactCard } from '../ProdactCard';
import { Product } from '../../shared/types/Product';
import { CustomSelect } from '../CustomSelect';
import ArrowRight from '../../assets/icons/catalogIcons/arrowRightDisabled.svg';
import Home from '../../assets/icons/catalogIcons/Home.svg';
import styles from './Catalog.module.scss';
import { Pagination } from './components/Pagination/Pagination';

type CatalogProps = {
  smallTitle: string;
  largeTitle: string;
  sorting?: boolean;
  products: Product[];
};

export const Catalog: React.FC<CatalogProps> = ({
  smallTitle,
  largeTitle,
  sorting,
  products,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get('page')) || 1,
  );
  const [sortBy, setSortBy] = useState<string>(
    searchParams.get('sort') || 'Newest',
  );
  const [countItemsOnPage, setCountItemsOnPage] = useState<string>(
    searchParams.get('limit') || 'all',
  );
  const [items, setItems] = useState<Product[]>([]);

  const itemsPerPageNumber =
    countItemsOnPage === 'all' ? items.length : Number(countItemsOnPage);
  const startIndex = (currentPage - 1) * itemsPerPageNumber;
  const endIndex =
    itemsPerPageNumber === items.length
      ? items.length
      : startIndex + itemsPerPageNumber;
  const paginatedItems = items.slice(startIndex, endIndex);

  useEffect(() => {
    const sortedProducts = [...products];

    switch (sortBy) {
      case 'Newest':
        sortedProducts.sort((a, b) => b.year - a.year);
        break;
      case 'Cheapest':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'Expensive':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case 'Alphabetically':
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    setItems(sortedProducts);
  }, [products, sortBy, countItemsOnPage]);

  useEffect(() => {
    setSearchParams({
      sort: sortBy,
      limit: countItemsOnPage,
      page: String(currentPage),
    });
  }, [sortBy, countItemsOnPage, currentPage, setSearchParams]);

  return (
    <div className={styles.Catalog}>
      <div className={styles.Catalog__header}>
        <Link to={'/'} className={styles.header__icon_home}>
          <img src={Home} alt="Home" />
        </Link>
        <div className={styles.header__icon_arrow}>
          <img src={ArrowRight} alt="Arrow Right" />
        </div>
        <h3 className={styles.header__title_page}>{smallTitle}</h3>
      </div>

      <div className={styles.Catalog__title}>
        <h1 className={styles.Catalog__title_text}>{largeTitle}</h1>
        <h3 className={styles.Catalog__title_subtext}>
          {products.length} models
        </h3>
      </div>

      {sorting && (
        <div className={styles.Catalog__filters}>
          <div className={styles.filters__items}>
            <h3 className={styles.filters__title}>Sort by</h3>
            <div className={styles.filters__sortBy}>
              <CustomSelect
                value={sortBy}
                onChange={value => {
                  setSortBy(value);
                  setCurrentPage(1);
                }}
                options={[
                  { value: 'Newest', label: 'Newest' },
                  { value: 'Cheapest', label: 'Cheapest' },
                  { value: 'Expensive', label: 'Expensive' },
                  { value: 'Alphabetically', label: 'Alphabetically' },
                ]}
              />
            </div>
          </div>

          <div className={styles.filters__items}>
            <h3 className={styles.filters__title}>Items on page</h3>
            <div className={styles.filters__counterItems}>
              <CustomSelect
                value={countItemsOnPage}
                onChange={value => {
                  setCountItemsOnPage(value);
                  setCurrentPage(1);
                }}
                options={[
                  { value: 'all', label: 'All' },
                  { value: '4', label: '4' },
                  { value: '8', label: '8' },
                  { value: '16', label: '16' },
                ]}
              />
            </div>
          </div>
        </div>
      )}

      <div className={styles.Catalog__items}>
        {paginatedItems.map(product => (
          <div className={styles.items__item} key={product.id}>
            <ProdactCard card={product} />
          </div>
        ))}
        {sorting && (
          <Pagination
            itemsPerPage={itemsPerPageNumber}
            totalItems={items.length}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};
