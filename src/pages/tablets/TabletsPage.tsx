import {
  FC,
  useEffect,
  useState,
} from 'react';
import { Link, useLocation } from 'react-router-dom';
import Select from 'react-select';
import { HomeIcon } from '../../assets/icons/home-icon';
import { ArrowRight } from '../../assets/icons/ArrowRight';
import styles from './TabletsPage.module.scss';
import { getProducts } from '../../api/api';
import { Product } from '../../types/Product';
import { ProductList } from '../../components/ProductList/ProductList';
// import { Pagination } from '../../components/Pagination/Pagination';
import { perpage, sorting } from '../../helpers/constants';
import { select } from '../../helpers/SelectStiles';
import { NoResults } from '../../components/NoResults/NoResults';

export const TabletsPage: FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const location = useLocation();

  const tablets = products.filter(product => product.category === 'tablets');

  const getProductsFromServer = async () => {
    try {
      const response: Product[] = await getProducts();

      setProducts(response);
    } catch (error) {
      <h1>There is some error!</h1>;
    }
  };

  useEffect(() => {
    getProductsFromServer();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      {tablets.length > 0 ? (
        <section className={styles.tablets}>
          <div className={styles.tablets__nav}>
            <Link
              to="/"
              className={styles.navicon}
            >
              <HomeIcon />
            </Link>
            <ArrowRight />
            <div className={styles.tablets__navtext}>
              Tablets
            </div>
          </div>

          <h1 className={styles.tablets__title}>
            Tablets
          </h1>
          <h2 className={styles.tablets__subtitle}>
            {`${tablets.length} models`}
          </h2>

          <div className={styles.phones__sorters}>
            <div className={styles.phones__sorters__sorter}>
              <div className={styles.phones__sorters__title}>
                Sort by
              </div>
              <div className={styles.sorting}>
                <Select
                  options={sorting}
                  isSearchable={false}
                  unstyled
                  styles={select}
                />
              </div>
            </div>

            <div className={styles.phones__sorters__sorter}>
              <div className={styles.phones__sorters__title}>
                Items on page
              </div>
              <div className={styles.perpage}>
                <Select
                  options={perpage}
                  isSearchable={false}
                  unstyled
                  styles={select}
                />
              </div>
            </div>
          </div>
          <div
            className="productslist"
            data-cy="productList"
          >
            <ProductList
              styles={styles.tablets__products}
              products={tablets}
            />
          </div>
        </section>
      ) : (
        <NoResults title="Tablets" />
      )}
    </>
  );
};
