import classNames from 'classnames';
import { Pagination } from '../Pagination';
import styles from './ProductsDisplay.module.scss';
import { useMemo } from 'react';
import { Product } from '../../types/types';
import { useListControls } from '../../hooks/useListControls';
import { Category, LoadingStatus, SortOption } from '../../types/enums';
import { getFirstItemOnPage, getLastItemOnPage } from '../../functions';
import { useLanguage } from '../Contexts/LanguageContext';
import { ProductsList } from '../ProductsList';
import { ProductsListControls } from '../ProductsListControls';
import { HandleReloadClick } from '../../types/handlers';
import { ProductsListSkeleton } from '../ProductsListSkeleton';

type Props = {
  products: Product[];
  loadingStatus: LoadingStatus;
  onReloadClick: HandleReloadClick;
  productCategory?: Category;
  responseStatus?: number;
  className?: string;
};

export const ProductsDisplay: React.FC<Props> = ({
  products,
  loadingStatus,
  onReloadClick,
  productCategory,
  responseStatus,
  className,
}) => {
  const {
    models,
    modelsOne,
    preModels,
    items,
    itemsOne,
    preItems,
    noPhones,
    noTablets,
    noAccessories,
    noProducts,
    noPhonesQuery,
    noTabletsQuery,
    noAccessoriesQuery,
    noProductsQuery,
  } = useLanguage().localeTexts;
  const { sort, pagination, search } = useListControls();

  const filteredProducts = useMemo(
    () =>
      products.filter(product =>
        product.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
      ),
    [search, products],
  );

  const sortedProducts = useMemo(() => {
    switch (sort) {
      case SortOption.Title:
        return [...filteredProducts].sort((firstProduct, secondProduct) =>
          firstProduct.name
            .toLocaleLowerCase()
            .localeCompare(secondProduct.name.toLocaleLowerCase()),
        );
      case SortOption.Price:
        return [...filteredProducts].sort(
          (firstProduct, secondProduct) =>
            firstProduct.price - secondProduct.price,
        );
      case SortOption.Age:
        return [...filteredProducts].sort(
          (firstProduct, secondProduct) =>
            secondProduct.year - firstProduct.year,
        );

      default:
        throw new Error('Sort option is not valid!!!');
    }
  }, [sort, filteredProducts]);

  const { page } = useListControls(sortedProducts.length);

  let noProductsMessage: string;
  let noProductsQueryMessage: string;

  switch (productCategory) {
    case Category.Phones:
      noProductsMessage = noPhones;
      noProductsQueryMessage = noPhonesQuery;
      break;
    case Category.Tablets:
      noProductsMessage = noTablets;
      noProductsQueryMessage = noTabletsQuery;
      break;
    case Category.Accessories:
      noProductsMessage = noAccessories;
      noProductsQueryMessage = noAccessoriesQuery;
      break;
    case undefined:
      noProductsMessage = noProducts;
      noProductsQueryMessage = noProductsQuery;
      break;
    default:
      throw new Error('Product category is not valid!!!');
  }

  let content: React.JSX.Element;

  if (loadingStatus === LoadingStatus.Success) {
    if (sortedProducts.length) {
      content = (
        <>
          <ProductsList
            products={sortedProducts.slice(
              getFirstItemOnPage(pagination, page) - 1,
              getLastItemOnPage(pagination, page, sortedProducts.length),
            )}
            className={styles.List}
          />

          {pagination && sortedProducts.length > pagination && (
            <Pagination
              amountOfItems={sortedProducts.length}
              className={styles.Pagination}
            />
          )}
        </>
      );
    } else {
      content = <p className={styles.Message}>{noProductsQueryMessage}</p>;
    }
  } else if (loadingStatus === LoadingStatus.NoData) {
    content = <p className={styles.Message}>{noProductsMessage}</p>;
  } else {
    content = (
      <ProductsListSkeleton
        loadingStatus={loadingStatus}
        onReloadClick={onReloadClick}
        responseStatus={responseStatus}
        className={styles.List}
      />
    );
  }

  return (
    <section className={classNames(styles.ProductsDisplay, className)}>
      <header className={styles.Header}>
        <p className={styles.AmountOfProducts}>
          {!!products.length &&
            (productCategory
              ? `${preModels} ${products.length} ${products.length === 1 ? modelsOne : models}`
              : `${preItems} ${products.length} ${products.length === 1 ? itemsOne : items}`)}
        </p>

        <ProductsListControls
          amountOfProducts={sortedProducts.length}
          className={styles.ListControls}
        />
      </header>

      {content}
    </section>
  );
};
