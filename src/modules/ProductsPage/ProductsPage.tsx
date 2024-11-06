import {
  Outlet,
  useLocation,
  useParams,
  useSearchParams,
} from 'react-router-dom';

import styles from './ProductsPage.module.scss';
import { ProductCard } from '../../components/ProductCard';
import { Pagination } from '../../components/Pagination';
import { SortProduct } from '../../components/SortProducts';
import { useEffect, useMemo } from 'react';
import { SortBy } from '../../types/SortBy';
import { Path } from '../../components/Path';
import { filterProducts } from '../../utils/filterProducts';
import { ProductType } from '../../types/ProductType';
import phones from '../../../public/api/phones.json';
import tablets from '../../../public/api/tablets.json';
import accessories from '../../../public/api/accessories.json';
import { Product } from '../../types/Product';
import { ProductListContext } from '../../ContextProvider';

export const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const { pathname } = useLocation();
  const { productId } = useParams();

  const productType = pathname.split('/').filter(location => !!location)[0];
  const itemsPerPage = searchParams.get('perPage') || '4';
  const sortBy = (searchParams.get('sortBy') || SortBy.newest).toLowerCase();
  const currentPage = +(searchParams.get('page') || 1);

  const [productList, title] = useMemo(() => {
    let list: Product[] = [];
    let productTitle = '';

    if (productType === ProductType.phones) {
      list = [...phones];
      productTitle = 'Mobile phones';
    } else if (productType === ProductType.tablets) {
      list = [...tablets];
      productTitle = 'Tablets';
    } else if (productType === ProductType.accessories) {
      list = [...accessories];
      productTitle = 'Accessories';
    }

    return [list, productTitle];
  }, [productType]);

  const filteredProductList = useMemo(
    () => filterProducts(sortBy, productList, itemsPerPage, currentPage),
    [sortBy, itemsPerPage, currentPage, productType],
  );

  useEffect(() => {
    window.scroll(0, 0);
  }, [currentPage]);

  return (
    <section className={styles.phonePageContainer}>
      <Path productList={productList} />
      {productId ? (
        <ProductListContext.Provider value={{ productList }}>
          <Outlet />
        </ProductListContext.Provider>
      ) : (
        <>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.categoryNumModels}>
            {productList.length} models
          </p>
          <SortProduct />
          <div className={styles.productsContainer}>
            {filteredProductList.map(product => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>

          <Pagination
            totalCount={productList.length}
            currentPage={currentPage}
          />
        </>
      )}
    </section>
  );
};
