import styles from './CategoryPage.module.scss';
import { Dropdown } from '../../components/Dropdown/Dropdown';
import {
  OnPageOption,
  ParamKeys,
  Product,
  SortByOption,
} from '../../types/Types';
import { useSearchParams } from 'react-router-dom';
import React, { useEffect } from 'react';
import { Pagination } from '../../components/Pagination/Pagination';
import { BreadCrumbs } from 'src/components/ui/BreadCrumbs/BreadCrumbs';
import { ProductList } from 'src/components/ProductList/ProductList';
import { Loader } from 'src/components/ui/Loader/Loader';
import { EmptyState } from 'src/components/EmptyState/EmptyState';
import { useStoreContext } from 'src/context/StoreContext';

const sortByData = {
  options: [
    SortByOption.default,
    SortByOption.name,
    SortByOption.year,
    SortByOption.price,
  ],
  key: ParamKeys.sortBy,
};

const onPageData = {
  options: [
    OnPageOption.all,
    OnPageOption.eight,
    OnPageOption.sixteen,
    OnPageOption.thirtyTwo,
  ],
  key: ParamKeys.onPage,
};

type Props = { products: Product[]; title: string };

export const CategoryPage: React.FC<Props> = ({ products, title }) => {
  const { isLoading, hasError, reload } = useStoreContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get(ParamKeys.sortBy) || SortByOption.default;
  const onPage = searchParams.get(ParamKeys.onPage) || OnPageOption.all;
  const page = +(searchParams.get(ParamKeys.page) || 1);

  useEffect(() => {
    if (searchParams.has(ParamKeys.onPage)) {
      const params = new URLSearchParams(searchParams);

      params.set(ParamKeys.page, '1');
      setSearchParams(params);
    }
  }, [onPage]);

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case SortByOption.name:
        return a.name.localeCompare(b.name);
      case SortByOption.year:
        return b.year - a.year;
      case SortByOption.price:
        return b.price - a.price;
      default:
        return 0;
    }
  });

  const productOnPage = onPage ? +onPage : 0;
  const pageCount = productOnPage
    ? Math.ceil(products.length / productOnPage)
    : 1;
  const showPagination = onPage && onPage !== OnPageOption.all;

  const startIndex = (page - 1) * productOnPage;
  const endIndex = startIndex + productOnPage;
  const preparedData = !productOnPage
    ? sortedProducts
    : sortedProducts.slice(startIndex, endIndex);

  if (isLoading) {
    return <Loader className={styles.loader} />;
  }

  if (hasError) {
    return (
      <EmptyState
        type="error"
        text="Something went wrong"
        buttonText="Reload"
        onButtonClick={reload}
      />
    );
  }

  if (products.length === 0) {
    return (
      <EmptyState
        type="cart"
        text={`There are no ${title.toLowerCase()} yet`}
      />
    );
  }

  return (
    <section className={styles.productPage}>
      <BreadCrumbs />

      <div className={styles.info}>
        <h1 className={styles.title}>{title}</h1>
        <span className={styles.subtitle}>{`${products.length} models`}</span>
      </div>

      <div className={styles.productCatalog}>
        <div className={styles.catalogControls}>
          <Dropdown data={sortByData} current={sortBy}>
            Sort by
          </Dropdown>
          <Dropdown data={onPageData} current={onPage}>
            Items on page
          </Dropdown>
        </div>

        <ProductList products={preparedData} />
      </div>
      {showPagination && <Pagination activePage={page} pageCount={pageCount} />}
    </section>
  );
};
