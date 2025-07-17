import { NavLink, useSearchParams } from 'react-router-dom';
import styles from './ProductPage.module.scss';
import { CustomDropdown } from '../CustomDropdown/CustomDropdown';
import { useEffect, useState } from 'react';
import { Category } from '../../types/Category';
import { getProducts } from '../../utils/fetchClient';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';

const sortOptions = [
  { value: 'age', label: 'Newest' },
  { value: 'title', label: 'Alphabetically' },
  { value: 'price', label: 'Cheapest' },
];

const countOptions = [
  { value: '4', label: '4' },
  { value: '8', label: '8' },
  { value: '16', label: '16' },
  { value: 'all', label: 'All' },
];

type CategoryType = {
  name: Category;
  title: 'Mobile phones' | 'Tablets' | 'Accessories';
  pathTitle: 'Phones' | 'Tablets' | 'Accessories';
};

type Props = {
  category: CategoryType;
};

export const ProductPage = ({ category }: Props) => {
  const [searchParams] = useSearchParams();
  const sortFromParams = searchParams.get('sort') || 'age';
  const pageFromParams = searchParams.get('page') || '1';
  const perPageFromParams = searchParams.get('perPage') || 'all';
  const [products, setProducts] = useState<Product[]>([]);
  const [sortField, setSortField] = useState(sortFromParams);
  const [page] = useState(pageFromParams);
  const [perPage, setPerPage] = useState(perPageFromParams);

  useEffect(() => {
    getProducts().then(productsFromServer =>
      setProducts(productsFromServer.filter(p => p.category === category.name)),
    );
  }, [category]);

  const prepareProducts = () => {
    const sortedProducts = [...products];

    if (sortField === 'title') {
      sortedProducts.sort((p1, p2) => p1.name.localeCompare(p2.name));
    }

    if (sortField === 'price') {
      sortedProducts.sort((p1, p2) => p1.price - p2.price);
    }

    if (sortField === 'age') {
      sortedProducts.sort((p1, p2) => p1.year - p2.year);
    }

    const itemsPerPage = +perPage || sortedProducts.length;
    const currentPage = +page;

    return sortedProducts.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage,
    );
  };

  return (
    <main className={styles.page}>
      <div className={styles.pageContent}>
        <div className={styles.pathHome}>
          <NavLink to="/">
            <img src="/img/icons/home.svg" alt="home" />
          </NavLink>
          <span className={styles.pathHome_title}>&gt;</span>
          <span className={styles.pathHome_title}>{category.pathTitle}</span>
        </div>
        <div className={styles.pageInfo}>
          <h1 className={styles.pageInfo_title}> {category.title}</h1>
          <span
            className={styles.pageInfo_counter}
          >{`${products.length} models`}</span>
        </div>
        <div className={styles.pageItems}>
          <div className={styles.dropdowns}>
            <div className={styles.dropdown}>
              <label className={styles.dropdown_label} htmlFor="sortSelect">
                Sort by
              </label>
              <CustomDropdown
                options={sortOptions}
                selectedOption={
                  sortOptions.find(o => o.value === sortField) || {
                    value: 'age',
                    label: 'Newest',
                  }
                }
                onChange={setSortField}
              />
            </div>
            <div className={styles.dropdown}>
              <label className={styles.dropdown_label} htmlFor="countSelect">
                Items on page
              </label>
              <CustomDropdown
                options={countOptions}
                selectedOption={
                  countOptions.find(o => o.value === perPage) || {
                    value: 'all',
                    label: 'All',
                  }
                }
                onChange={setPerPage}
              />
            </div>
          </div>
          <div className={styles.productList}>
            {prepareProducts().map(p => (
              <ProductCard key={p.itemId} product={p} />
            ))}
          </div>

          {/* <Pagination
  total={products.length}
  perPage={perPage}
  currentPage={page}
  onPageChange={(page) => { ... }}
/> */}
        </div>
      </div>
    </main>
  );
};
