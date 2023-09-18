import {
  FC,
  useEffect,
  useState,
} from 'react';
import { Link, useLocation } from 'react-router-dom';
import Select from 'react-select';
import { HomeIcon } from '../../assets/icons/home-icon';
import { ArrowRight } from '../../assets/icons/ArrowRight';
import styles from './AccessoriesPage.module.scss';
import { ProductList } from '../../components/ProductList/ProductList';
import { getProducts } from '../../api/api';
import { Product } from '../../types/Product';
import { perpage, sorting } from '../../helpers/constants';
import { select } from '../../helpers/SelectStiles';
import { NoResults } from '../../components/NoResults/NoResults';
// import { Pagination } from '../../components/Pagination/Pagination';

export const AccessoriesPage: FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const location = useLocation();

  const accessories = products
    .filter(product => product.category === 'accessories');

  const getProductsFromServer = async () => {
    try {
      const response: Product[] = await getProducts();

      setProducts(response);
    } catch (error) {
      (<h1>There is some error!</h1>);
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
      {accessories.length > 0 ? (
        <section className={styles.accessories}>
          <div className={styles.accessories__nav}>
            <Link
              to="/"
              className={styles.navicon}
            >
              <HomeIcon />
            </Link>
            <ArrowRight />
            <h1 className={styles.accessories__navtext}>
              Accessories
            </h1>
          </div>

          <h1 className={styles.accessories__title}>
            Accessories
          </h1>

          {accessories.length > 0 && (
            <h2 className={styles.accessories__subtitle}>
              {`${accessories.length} models`}
            </h2>
          )}

          {(!accessories.length)
            ? (
              <div className={styles.accessories__massage}>
                Sorry, accessories are out of stock!
              </div>
            ) : (
              <>
                <div className={styles.accessories__sorters}>
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
                    styles={styles.accessories__products}
                    products={accessories}
                  />
                </div>
                {/* <Pagination /> */}
              </>
            )}
        </section>
      ) : (
        <NoResults title="Accessories" />
      )}
    </>
  );
};
