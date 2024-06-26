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
// import { useModal } from '../../utils/useModals';

type Props = {
  title: string;
};

export const GadgetsList: React.FC<Props> = ({ title }) => {
  const { products } = useContext(ProductsContext);
  const { pathname } = useLocation();
  const { theme } = useContext(ThemeContext);
  const gadgets = filterGadgets(pathname, products);
  const [sortBy, setSortBy] = useState(SortBy.newest);

  // const { isOpen, open, close, toggle } = useModal(false);
  // console.log(isOpen);
  // console.log(open);
  // console.log(close);
  // console.log(toggle);

  const sortedBy = (sortByItem: string, device: Products[]): Products[] => {
    const copyOfProducts = [...device];

    if (sortByItem) {
      switch (sortByItem) {
        case SortBy.newest:
          return copyOfProducts.sort((a, b) => b.year - a.year);
        case SortBy.alphabetically:
          return copyOfProducts.sort((a, b) => a.name.localeCompare(b.name));
        case SortBy.newest:
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
        <div className={style.gadgets__select}>
          <label htmlFor="selectSortBy" className={style.gadgets__slectTitle}>
            Sort by
          </label>

          <Dropdown buttonText={sortBy} setSortBy={setSortBy} />

          {/* <select
            name="SelectSort"
            id="selectSortBy"
            className={style.gadgets__selectOptions}
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
          >
            <option value="Newest">Newest</option>
            <option value="Alphabetically">Alphabetically</option>
            <option value="Cheapest">Cheapest</option>
          </select> */}
        </div>

        <div className={style.gadgets__select}>
          <label htmlFor="itemsPerPage" className={style.gadgets__slectTitle}>
            Items on page
          </label>
          <select
            name="SelectPerPage"
            className={style.gadgets__selectOptions}
            id="itemsPerPage"
          >
            <option value="4">4</option>
            <option value="4">8</option>
            <option value="4">16</option>
            <option value="All">All</option>
          </select>
        </div>
      </div>

      <Cards gadgets={sortedGadgets} />
      <Pagination />
    </div>
  );
};
