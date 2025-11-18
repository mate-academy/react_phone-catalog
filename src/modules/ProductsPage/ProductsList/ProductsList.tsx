import styles from './ProductsList.module.scss';
import { useTranslation } from 'react-i18next';
import Select from '../../shared/Select';
import { productsListMenu } from '../../constants';
import { SelectOption } from '../../../types/SelectOptions';
import { useState } from 'react';

const ProductsList = () => {
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
    } else {
      setSortValue(sortByOptions[0]);
    }
  };

  const handleItemsOnPageChange = (option: SelectOption | null) => {
    if (option) {
      setItemsOnPageValue(option);
    } else {
      setItemsOnPageValue(sortByOptions[0]);
    }
  };

  return (
    <div className={styles.productsList}>
      <menu className={styles.listMenu}>
        <li className={styles.listMenu__sort}>
          <span>{t('products_page.menu_sort')}</span>
          <Select
            value={sortValue}
            options={sortByOptions}
            onChange={handleSortChange}
          />
        </li>
        <li className={styles.listMenu__items}>
          <span>{t('products_page.menu_items')}</span>
          <Select
            value={itemsOnPageValue}
            options={itemsOnPageOptions}
            onChange={handleItemsOnPageChange}
          />
        </li>
      </menu>
    </div>
  );
};

export default ProductsList;
