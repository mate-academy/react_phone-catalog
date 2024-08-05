import { useLocation, useSearchParams } from 'react-router-dom';
import { SearchParamsValue } from '../../types/SearchParamsValue';
import { Product } from '../../types/Product';
import { PerPage } from '../../types/PerPage';
import { DEFAULT_PER_PAGE, DEFAULT_SORT } from '../../constants';
import { Dropdown } from '../Dropdown';
import { ProductCard } from '../ProductCard';
import { Pagination } from '../Pagination';
import { ProductsListEmpty } from '../ProductsListEmpty';
import { useTranslation } from 'react-i18next';
import { TRANSLATIONS } from '../../utils/i18n/translations';
import { Category } from '../../types/Category';
import { SortBy } from '../../types/SortBy';
import styles from './ProductsList.module.scss';

type Props = {
  products: Product[];
};

export const ProductsList: React.FC<Props> = ({ products }) => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();

  const category = location.pathname.split('/')[1];

  const PAGE_TITLE = {
    [Category.PHONES]: t(TRANSLATIONS.category.card.phones.title.text),
    [Category.TABLETS]: t(TRANSLATIONS.category.card.tablets.title.text),
    [Category.ACCESSORIES]: t(
      TRANSLATIONS.category.card.accessories.title.text,
    ),
  };

  const SORT_BY_OPTIONS: Partial<{ [key in SortBy]: string }> = {
    [SortBy.NEWEST]: t(TRANSLATIONS.dropdown.sortBy.newest),
    [SortBy.ALPHABETICALLY]: t(TRANSLATIONS.dropdown.sortBy.alphabetically),
    [SortBy.CHEAPEST]: t(TRANSLATIONS.dropdown.sortBy.cheapest),
  };

  const ITEM_PER_PAGE: { [key in PerPage]: string } = {
    [PerPage.ALL]: t(TRANSLATIONS.dropdown.itemsPerPage),
    [PerPage.FOUR]: '4',
    [PerPage.EIGHT]: '8',
    [PerPage.SIXTEEN]: '16',
  };

  const currentPage: number = +(
    searchParams.get(SearchParamsValue.PAGE) || '1'
  );
  const perPage: string =
    searchParams.get(SearchParamsValue.PER_PAGE) || DEFAULT_PER_PAGE;

  const numberOfProducts: number = products.length;
  const numberOfPages: number = Math.ceil(numberOfProducts / +perPage);
  const productFrom: number = (currentPage - 1) * +perPage;
  const productTo: number = currentPage * +perPage;

  const productsPerPage =
    perPage === PerPage.ALL ? products : products.slice(productFrom, productTo);

  const showPagination =
    perPage !== DEFAULT_PER_PAGE && +perPage < numberOfProducts;

  return (
    <section className={styles.block}>
      <h1 className={styles.title}>{PAGE_TITLE[category as Category]}</h1>
      <p className={styles.subtitle}>
        {t(TRANSLATIONS.category.card.quantity_interval, {
          postProcess: 'interval',
          count: products.length,
        })}
      </p>

      {products.length === 0 ? (
        <ProductsListEmpty />
      ) : (
        <div className={styles.content}>
          <div className={styles.dropdowns}>
            <div className={styles.sortBy}>
              <p className={styles.dropdowns__label}>
                {t(TRANSLATIONS.dropdown.label.sortBy)}
              </p>

              <Dropdown
                options={SORT_BY_OPTIONS}
                searchParam={SearchParamsValue.SORT}
                defaultOption={DEFAULT_SORT}
              />
            </div>

            <div className={styles.perPage}>
              <p className={styles.dropdowns__label}>
                {t(TRANSLATIONS.dropdown.label.itemsOnPage)}
              </p>

              <Dropdown
                options={ITEM_PER_PAGE}
                searchParam={SearchParamsValue.PER_PAGE}
                defaultOption={DEFAULT_PER_PAGE}
              />
            </div>
          </div>

          <ul className={styles.list}>
            {productsPerPage.map(item => {
              return (
                <li key={item.id} className={styles.item}>
                  <ProductCard product={item} />
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {showPagination && (
        <Pagination currentPage={currentPage} numberOfPages={numberOfPages} />
      )}
    </section>
  );
};
