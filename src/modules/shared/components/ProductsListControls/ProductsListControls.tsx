import { useListControls } from '../../hooks/useListControls';
import { SortOption } from '../../types/enums';
import { Dropdown } from '../Dropdown';
import { getFirstItemOnPage } from '../../functions';
import { ListSearch } from '../ListSearch';
import styles from './ProductsListControls.module.scss';
import { useLanguage } from '../Contexts/LanguageContext';
import classNames from 'classnames';

type Props = {
  amountOfProducts: number;
  className?: string;
};

export const ProductsListControls: React.FC<Props> = ({
  amountOfProducts,
  className,
}) => {
  const { sortLabel, newest, cheapest, alphabetically, paginationLabel, all } =
    useLanguage().localeTexts;
  const { sort, pagination, page, setListControls } =
    useListControls(amountOfProducts);

  const sortValues = {
    [SortOption.Age]: newest,
    [SortOption.Price]: cheapest,
    [SortOption.Title]: alphabetically,
  };

  const sortOptionMap = {
    [newest]: SortOption.Age,
    [cheapest]: SortOption.Price,
    [alphabetically]: SortOption.Title,
  };

  const paginationOptions = ['4', '8', '16', all];
  const areDropdownValuesLoaded = !!sortLabel;

  const getPageOfItem = (itemsPerPage: number, position: number): number =>
    Math.ceil(position / itemsPerPage);

  const handleSortChange = (sortOption: string) => {
    if (Object.values(sortValues).includes(sortOption)) {
      setListControls({ sort: sortOptionMap[sortOption] });
    } else {
      throw new Error('Sort option is not valid!!!');
    }
  };

  const handlePaginationChange = (newPagination: string) => {
    const parsedNewPagination = parseInt(newPagination);

    if (isNaN(parsedNewPagination)) {
      setListControls({
        pagination: null,
        page: 1,
      });
    } else {
      setListControls({
        pagination: parsedNewPagination,
        page: getPageOfItem(
          parsedNewPagination,
          getFirstItemOnPage(pagination, page),
        ),
      });
    }
  };

  return (
    <section className={classNames(styles.ProductsListControlls, className)}>
      <Dropdown
        title={sortLabel}
        options={areDropdownValuesLoaded ? Object.values(sortValues) : []}
        chosenOption={sortValues[sort]}
        onChange={handleSortChange}
        className={styles.Sorting}
      />

      <Dropdown
        title={paginationLabel}
        options={areDropdownValuesLoaded ? paginationOptions : []}
        chosenOption={pagination?.toString() || all}
        onChange={handlePaginationChange}
        className={styles.Pagination}
      />

      <ListSearch className={styles.Searching} />
    </section>
  );
};
