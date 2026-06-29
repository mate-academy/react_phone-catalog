import styles from './ProductListMenu.module.scss';
import Select from '../../shared/Select';
import { useTranslation } from 'react-i18next';
import { SelectOption } from '../../../types/SelectOptions';

interface Props {
  sortValue: SelectOption;
  itemsOnPageValue: SelectOption;
  handleSortChange: (option: SelectOption | null) => void;
  handleItemsOnPageChange: (option: SelectOption | null) => void;
  sortByOptions: SelectOption[];
  itemsOnPageOptions: SelectOption[];
}

const ProductListMenu: React.FC<Props> = ({
  sortValue,
  itemsOnPageValue,
  handleSortChange,
  handleItemsOnPageChange,
  sortByOptions,
  itemsOnPageOptions,
}: Props) => {
  const { t } = useTranslation();

  return (
    <menu className={styles.listMenu + ' ' + styles.listMenu_marginTop}>
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
