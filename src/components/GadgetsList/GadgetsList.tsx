import { useContext, useState } from 'react';
import { BreadCrumbs } from '../BreadCrumbs/BreadCrumbs';
import { Cards } from '../Cards/Cards';
import style from './GadgetsList.module.scss';
import { ProductsContext } from '../../store/ProductsProvider';
import { useLocation } from 'react-router-dom';
import { filterGadgets } from '../../utils/filterGadgets';
import classNames from 'classnames';
import { ThemeContext } from '../../store/ThemeProvider';
import { SortBy } from '../../enums/SortBy';
import { Products } from '../../types/ContextType/Products';
import { Pagination } from './Pagination/Pagination';
import { Dropdown } from './Dropdown/Dropdown';
import { ItemsList } from '../../enums/ItemsPerPage';

type Props = {
  title: string;
};

export const GadgetsList: React.FC<Props> = ({ title }) => {
  const { products } = useContext(ProductsContext);
  const { pathname } = useLocation();
  const { theme } = useContext(ThemeContext);

  const gadgets = filterGadgets(pathname, products);
  const listSortedBy = [SortBy.newest, SortBy.alphabetically, SortBy.cheapest];
  const listItemsPerPage = [ItemsList.four, ItemsList.eight, ItemsList.sixteen, ItemsList.all]

  const [sortBy, setSortBy] = useState<SortBy>(SortBy.newest);

  const [itemsOnPage, setItemsOnPage] = useState<string>(ItemsList.four)

  const sortedBy = (sortByItem: string, device: Products[]): Products[] => {
    const copyOfProducts = [...device];

    if (sortByItem) {
      switch (sortByItem) {
        case SortBy.newest:
          return copyOfProducts.sort((a, b) => b.year - a.year);
        case SortBy.alphabetically:
          return copyOfProducts.sort((a, b) => a.name.localeCompare(b.name));
        case SortBy.cheapest:
          return copyOfProducts.sort((a, b) => a.price - b.price);
        default:
          return copyOfProducts;
      }
    }

    return copyOfProducts;
  };

  const sortedGadgets = sortedBy(sortBy, gadgets.gadgets);

  return (
    <div
      className={classNames(style.gadgets, {
        [style.gadgets__darkTheme]: theme,
      })}
    >
      <BreadCrumbs />
      <h1 className={style.gadgets__title}>{title}</h1>
      <p className={style.gadgets__itemsQuantity}>
        {gadgets.gadgetsLen} models
      </p>

      <div className={style.gadgets__selectors}>
        <Dropdown
          listItems={listSortedBy}
          titleDropdown={'Sort by'}
          currentItem={sortBy}
          setItem={(v: SortBy) => setSortBy(v)}
          className={style.gadgets__widthSortBy}
        />

        <Dropdown
          listItems={listItemsPerPage}
          titleDropdown={'Items on page'}
          currentItem={itemsOnPage}
          setItem={(v) => setItemsOnPage(v)}
          className={style.gadgets__widthItemsOnPage}
        />
      </div>

      <Cards gadgets={sortedGadgets} />
      <Pagination />
    </div>
  );
};
