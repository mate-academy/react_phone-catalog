import styles from './ProductListMenu.module.scss';
import Select from '../../shared/Select';
import { useTranslation } from 'react-i18next';
import { SelectOption } from '../../../types/SelectOptions';
import { productsListMenu } from '../../constants';
import { useState } from 'react';

const ProductListMenu: React.FC = () => {
  const { t } = useTranslation();

  const sortByOptions: SelectOption[] = productsListMenu.sortBy.map(value => ({
    value,
    label: t(`products_page.menu_sort_values.${value}`),
  }));
  const itemsOnPageOptions: SelectOption[] = productsListMenu.itemsOnPage.map(
    value => {
      return {
        value,
        label: Number.isInteger(Number(value))
          ? value
          : t(`products_page.menu_items_values.${value}`),
      };
    },
  );
  const [sortValue, setSortValue] = useState<SelectOption>(sortByOptions[0]);
  const [itemsOnPageValue, setItemsOnPageValue] = useState<SelectOption>(
    itemsOnPageOptions[0],
  );

  const handleSortChange = (option: SelectOption | null) => {
    if (option) {
      setSortValue(option);
    }
  };

  const handleItemsOnPageChange = (option: SelectOption | null) => {
    if (option) {
      setItemsOnPageValue(option);
    }
  };

  return (
    <menu className={styles.listMenu}>
      <li className={styles.listMenu__sort}>
        <span className={styles.listMenu__title}>
          {t('products_page.menu_sort')}
        </span>
        <Select
          value={sortValue}
          options={sortByOptions}
          onChange={handleSortChange}
        />
      </li>
      <li className={styles.listMenu__items}>
        <span className={styles.listMenu__title}>
          {t('products_page.menu_items')}
        </span>
        <Select
          value={itemsOnPageValue}
          options={itemsOnPageOptions}
          onChange={handleItemsOnPageChange}
        />
      </li>
    </menu>
  );
};
export default ProductListMenu;
