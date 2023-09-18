import {
  FC,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  Link,
  useLocation,
  useSearchParams,
} from 'react-router-dom';
import Select from 'react-select';
import { TailSpin } from 'react-loader-spinner';

import styles from './PhonesPage.module.scss';

import { getProducts } from '../../api/api';
import { Product } from '../../types/Product';
import { HomeIcon } from '../../assets/icons/home-icon';
import { ArrowRight } from '../../assets/icons/ArrowRight';
import { sorting, perpage } from '../../helpers/constants';
import { Pagination } from '../../components/Pagination/Pagination';
import { ProductList } from '../../components/ProductList/ProductList';
import { select } from '../../helpers/SelectStiles';
import { OptionType, SearchParam } from '../../types/SearchParams';
import { itemsToShow, pagesCount } from '../../helpers/Sorting';
import { useSearchContext } from '../../context/searchContext';
import { NoResults } from '../../components/NoResults/NoResults';

export const PhonesPage: FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const phones = products.filter(product => product.category === 'phones');
  const { query } = useSearchContext();

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get('page') || '1';
  const sortParam = searchParams.get('sort') || 'Newest';
  const perPageParam = searchParams.get('perPage') || 'All';
  const selectValueSort = { value: sortParam, label: sortParam };
  const selectValuePerPage = { value: perPageParam, label: perPageParam };

  const updateUrl = (param: SearchParam, value: string) => {
    searchParams.set(param, value);
    setSearchParams(searchParams);
  };

  const filteredProducts = useMemo(() => (
    phones.filter(item => (
      item.name
        .toLowerCase()
        .includes(query.toLowerCase())
    ))), [query, phones]);

  const total = filteredProducts.length;

  const visibleProducts = useMemo(() => {
    const result = itemsToShow(
      total,
      currentPage,
      perPageParam,
      sortParam,
      filteredProducts,
    );

    return result;
  }, [currentPage, perPageParam, sortParam, phones, query]);

  const pages = useMemo(() => (
    pagesCount(total, perPageParam)
  ), [total, perPageParam]);

  const getProductsFromServer = async () => {
    setIsLoading(true);
    try {
      setTimeout(async () => {
        const response: Product[] = await getProducts();

        setProducts(response);
      }, 1000);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProductsFromServer();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const handleSelectChange = (
    selectedOption: OptionType | null,
    param: SearchParam,
  ) => {
    if (!selectedOption) {
      return;
    }

    updateUrl(param, selectedOption.value);
  };

  if (query && !filteredProducts.length && !phones.length) {
    return <NoResults title="Phones" />;
  }

  return (
    <section className={styles.phones}>
      <div className={styles.phones__nav}>
        <Link to="/" className={styles.navicon}>
          <HomeIcon />
        </Link>
        <ArrowRight />
        <div className={styles.phones__navtext}>Phones</div>
      </div>

      <div
        className={styles.phones__title}
      >
        Mobile phones
      </div>
      {(phones.length > 0 && !isLoading) ? (
        <>
          <h2 className={styles.phones__subtitle}>
            {`${total} models`}
          </h2>

          {filteredProducts.length > 4
           && (
             <div className={styles.phones__sorters}>
               <div className={styles.phones__sorters__sorter}>
                 <div className={styles.phones__sorters__title}>
                   Sort by
                 </div>
                 <div className={styles.sorting}>
                   <Select
                     value={selectValueSort}
                     options={sorting}
                     isSearchable={false}
                     unstyled
                     styles={select}
                     onChange={
                       (newValue) => handleSelectChange(newValue, 'sort')
                     }
                   />
                 </div>
               </div>

               <div className={styles.phones__sorters__sorter}>
                 <div className={styles.phones__sorters__title}>
                   Items on page
                 </div>
                 <div className={styles.perpage}>
                   <Select
                     value={selectValuePerPage}
                     options={perpage}
                     isSearchable={false}
                     unstyled
                     styles={select}
                     onChange={
                       (newValue) => handleSelectChange(newValue, 'perPage')
                     }
                   />
                 </div>
               </div>
             </div>
           )}
          <div
            className="productslist"
            data-cy="productList"
          >
            <ProductList
              styles={styles.phones__products}
              products={visibleProducts}
            />
          </div>

          {filteredProducts.length > 4
           && (
             <Pagination
               data-cy="pagination"
               pagesCount={pages}
               currentPage={+currentPage}
               onPageChange={updateUrl}
             />
           )}
        </>
      ) : (
        <TailSpin
          height="80"
          width="80"
          color="#313237"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperClass="spincontainer"
          visible
        />
      )}
    </section>
  );
};
