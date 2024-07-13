import { useContext } from 'react';
import { BreadCrumbs } from '../BreadCrumbs/BreadCrumbs';
import { CardsContainer } from '../CardsContainer/CardsContainer';
import style from './GadgetsList.module.scss';
import { ProductsContext } from '../../store/ProductsProvider';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { ThemeContext } from '../../store/ThemeProvider';
import { SortBy } from '../../enums/SortBy';
import { Pagination } from './Pagination/Pagination';
import { Dropdown } from './Dropdown/Dropdown';
import { ItemsList } from '../../enums/ItemsPerPage';
import { LanguageContext } from '../../store/LanguageProvider';
import { QueryParams } from '../../enums/QuryParams';

type Props = {
  title: string;
};

export const GadgetsList: React.FC<Props> = ({ title }) => {
  const { t } = useContext(LanguageContext);
  const { theme } = useContext(ThemeContext);
  const [searchParams] = useSearchParams();
  const { resultFilteredDev, gadgets } = useContext(ProductsContext);

  const listSortedBy = [SortBy.newest, SortBy.alphabetically, SortBy.cheapest];
  const listItemsPerPage = [
    ItemsList.four,
    ItemsList.eight,
    ItemsList.sixteen,
    ItemsList.all,
  ];
  const sortBy = searchParams.get(QueryParams.sort) || SortBy.newest;
  const itemsOnPage = searchParams.get(QueryParams.perPage) || ItemsList.four;

  return (
    <div
      className={classNames(style.gadgets, {
        [style.gadgets__darkTheme]: theme,
      })}
    >
      <BreadCrumbs />
      <h1 className={style.gadgets__title}>{title}</h1>
      <p className={style.gadgets__itemsQuantity}>
        {gadgets.gadgets.length} {t('models')}
      </p>
      {resultFilteredDev.length === 0 ? (
        <p className={style.gadgets__noGadgetsText}>{t('thereAreNoGadgets')}</p>
      ) : (
        <>
          <div className={style.gadgets__selectors}>
            <Dropdown
              listItems={listSortedBy}
              titleDropdown={t('sortBy')}
              currentItem={sortBy}
              keySearchParams={QueryParams.sort}
              className={style.gadgets__widthSortBy}
            />

            <Dropdown
              listItems={listItemsPerPage}
              titleDropdown={t('itemsPerPage')}
              currentItem={itemsOnPage}
              keySearchParams={QueryParams.perPage}
              className={style.gadgets__widthItemsOnPage}
            />
          </div>

          <div className={style.gadgets__cardsContainer}>
            <CardsContainer gadgets={resultFilteredDev} />
          </div>
          {resultFilteredDev.length !== 0 && (
            <Pagination perPage={itemsOnPage} />
          )}
        </>
      )}
    </div>
  );
};
