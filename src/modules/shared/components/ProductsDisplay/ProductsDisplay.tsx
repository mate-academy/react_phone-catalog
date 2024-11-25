import classNames from 'classnames';
import { Pagination } from '../Pagination';
import styles from './ProductsDisplay.module.scss';
import { useMemo } from 'react';
import { Product } from '../../types/types';
import { useListControls } from '../../hooks/useListControls';
import { Category, SortOption } from '../../types/enums';
import {
  getFirstItemOnPage,
  getLastItemOnPage,
} from '../../functions/functions';
import { useLanguage } from '../Contexts/LanguageContext';
import { ProductsList } from '../ProductsList';
import { ProductsListControls } from '../ProductsListControls';

type Props = {
  products: Product[];
  productCategory?: Category;
  className?: string;
};

export const ProductsDisplay: React.FC<Props> = ({
  products,
  productCategory,
  className,
}) => {
  const {
    models,
    preModels,
    items,
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

  let content: React.JSX.Element;

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

    if (products.length) {
      content = <p className={styles.Message}>{noProductsQueryMessage}</p>;
    } else {
      content = <p className={styles.Message}>{noProductsMessage}</p>;
    }
  }

  return (
    <section className={classNames(styles.ProductsDisplay, className)}>
      <header className={styles.Header}>
        <p className={styles.AmountOfProducts}>
          {productCategory
            ? `${preModels} ${products.length} ${models}`
            : `${preItems} ${products.length} ${items}`}
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
