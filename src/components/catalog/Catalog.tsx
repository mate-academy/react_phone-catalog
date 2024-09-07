import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiHome } from 'react-icons/fi';

import styles from './catalog.module.scss';

import { ProductList } from '@components/products/products-list/ProductList';
import { Arrows } from '@components/home/banner/slider/arrows/Arrows';

import { Dropdown } from '@ui/dropdown/Dropdown';
import { ArrowRightIcon } from '@ui/icon/ArrowRightIcon';
import { ArrowLeftIcon } from '@ui/icon/ArrowLeftIcon';
import { Pagination } from '@ui/pagination/Pagination';

import { ROUTES } from '@utils/constants/routes';
import { getMostExpensiveProduct } from '@utils/helpers/sortedByPrice';
import { ITEMS_ON_PAGE, SORT_BY } from '@utils/constants/optionsForSort';
import { TProduct } from '@utils/types/product.type';

type TProps = {
  title: string;
  text: string;
  loading: boolean;
  products: TProduct[];
};

export const Catalog: FC<TProps> = ({ title, text, loading, products }) => {
  const [items, setItems] = useState<TProduct[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(10);

  useEffect(() => {
    const updatedItems = getMostExpensiveProduct(products);

    setItems(updatedItems);
  }, [products, currentPage]);

  // #region constant
  const indexOfLastPost = currentPage * itemPerPage;
  const indexOfFirstPost = indexOfLastPost - itemPerPage;
  const currentItems = items.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(items.length / itemPerPage);

  const isPrevDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages;
  // #endregion

  // #region foo
  const handleNextPage = () => {
    if (!isNextDisabled) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (!isPrevDisabled) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  const handlePagination = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };
  // #endregion

  return (
    <section className={styles.catalog}>
      <div className={styles.links}>
        <Link to={ROUTES.HOME}>
          <FiHome />
          <ArrowRightIcon />
        </Link>
        <span>{text}</span>
      </div>

      <div className={styles.title}>
        <h1>{title}</h1>
        <span>{items.length} models</span>
      </div>

      <div className={styles.wrapper}>
        <div className={styles.dropdowns}>
          <Dropdown text="Sort by" options={SORT_BY} />
          <Dropdown
            text="Items on page"
            options={ITEMS_ON_PAGE}
            setItemPerPage={setItemPerPage}
          />
        </div>

        {!loading && (
          <div className={styles.list}>
            {currentItems.map(product => (
              <ProductList key={product.id} product={product} discount={true} />
            ))}
          </div>
        )}
      </div>

      <div className={styles.paginations}>
        <Arrows
          slider={handlePrevPage}
          label={'Previous page'}
          disabled={isPrevDisabled}
        >
          <ArrowLeftIcon />
        </Arrows>

        <Pagination
          length={items.length}
          itemPerPage={itemPerPage}
          currentPage={currentPage}
          handlePagination={handlePagination}
        />

        <Arrows
          slider={handleNextPage}
          label={'Next page'}
          disabled={isNextDisabled}
        >
          <ArrowRightIcon />
        </Arrows>
      </div>
    </section>
  );
};
