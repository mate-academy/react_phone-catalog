import { FC, useEffect, useState } from 'react';

import { ProductList } from '@components/products/products-list/ProductList';
import { Arrows } from '@components/home/banner/slider/arrows/Arrows';

import { Dropdown } from '@ui/dropdown/Dropdown';
import { ArrowRightIcon } from '@ui/icon/ArrowRightIcon';
import { ArrowLeftIcon } from '@ui/icon/ArrowLeftIcon';
import { Pagination } from '@ui/pagination/Pagination';

import { ITEMS_ON_PAGE, SORT_BY } from '@utils/constants/optionsForSort';
import { getMostExpensiveProduct } from '@utils/helpers/sortedByPrice';
import { TProduct } from '@utils/types/product.type';

import styles from './catalog.module.scss';
import { Breadcrumbs } from '@ui/links/Breadcrumbs';

type TProps = {
  title: string;
  text: string;
  products: TProduct[];
  dropdown?: boolean;
  pagination?: boolean;
};

export const Catalog: FC<TProps> = ({
  title,
  text,
  products,
  dropdown = false,
  pagination = false,
}) => {
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
  const plural = !items.length ? 'item' : 'items';

  const isPagination = pagination && items.length;

  return (
    <section className={styles.catalog}>
      <Breadcrumbs text={text} />

      <div className={styles.title}>
        <h1>{title}</h1>

        {!dropdown && !pagination ? (
          <span>
            {items.length} {plural}
          </span>
        ) : (
          <span>{items.length} models</span>
        )}
      </div>

      <div className={styles.wrapper}>
        {dropdown && (
          <div className={styles.dropdowns}>
            {/* TODO:Changes Dropdown */}
            <Dropdown text="Sort by" options={SORT_BY} />
            <Dropdown
              text="Items on page"
              options={ITEMS_ON_PAGE}
              setItemPerPage={setItemPerPage}
            />
          </div>
        )}

        {/* TODO:Add loading */}
        <div className={styles.list}>
          {currentItems.map(product => (
            <ProductList key={product.id} product={product} discount={true} />
          ))}
        </div>
      </div>

      {isPagination && (
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
      )}
    </section>
  );
};
