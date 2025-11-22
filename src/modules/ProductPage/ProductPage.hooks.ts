import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { SelectOption } from '../../types/SelectOptions';
import { PRODUCT_LIST_MENU } from './ProductPage.constants';
import { ProductPageSearchParams } from './ProductPage.types';

export function useMenuSelectors() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const currentSearchParams = new URLSearchParams(location.search);

  const itemsOnPageOptions: SelectOption[] = PRODUCT_LIST_MENU.itemsOnPage.map(
    value => {
      return {
        value,
        label: Number.isInteger(Number(value))
          ? value
          : t(`products_page.menu_items_values.${value}`),
      };
    },
  );

  const sortByOptions: SelectOption[] = PRODUCT_LIST_MENU.sortBy.map(value => ({
    value,
    label: t(`products_page.menu_sort_values.${value}`),
  }));

  const sortValue =
    sortByOptions.find(
      sortOption =>
        sortOption.value ===
        currentSearchParams.get(ProductPageSearchParams.sort),
    ) || sortByOptions[0];

  const itemsOnPageValue =
    itemsOnPageOptions.find(
      item =>
        item.value === currentSearchParams.get(ProductPageSearchParams.perPage),
    ) || itemsOnPageOptions[0];

  const handleSortChange = (option: SelectOption | null) => {
    if (option) {
      currentSearchParams.set(ProductPageSearchParams.sort, option.value);
      currentSearchParams.sort();
      const search = currentSearchParams.toString();

      navigate({ pathname: location.pathname, search });
    }
  };

  const handleItemsOnPageChange = (option: SelectOption | null) => {
    if (option) {
      currentSearchParams.set(ProductPageSearchParams.perPage, option.value);
      currentSearchParams.sort();
      const search = currentSearchParams.toString();

      navigate({ pathname: location.pathname, search });
    }
  };

  return {
    sortValue,
    itemsOnPageValue,
    itemsOnPageOptions,
    sortByOptions,
    handleSortChange,
    handleItemsOnPageChange,
  };
}
