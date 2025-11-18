import { formError } from '../../helpers';
import {
  BaseProduct,
  CatalogueData,
  PerPage,
  ProcessingResult,
  ProductCategory,
  SortParams,
} from '../../types';

type CategoryFilter = (
  array: BaseProduct[],
  category: ProductCategory,
) => BaseProduct[];

const filterByCategory: CategoryFilter = (array, category) => {
  if (category === ProductCategory.ALL) {
    return array;
  }

  return array.filter((el: BaseProduct) => el.category === category);
};

type SortItems = (array: BaseProduct[], sortParam: SortParams) => BaseProduct[];

const sortItems: SortItems = (array, sortParam) => {
  switch (sortParam) {
    case SortParams.NONE:
      return array;
    case SortParams.AGE:
      return array.sort((a, b) => b.year - a.year);
    case SortParams.TITLE:
      return array.sort((a, b) => a.name.localeCompare(b.name));
    case SortParams.PRICE_ASC:
      return array.sort((a, b) => a.priceDiscount - b.priceDiscount);
    case SortParams.FULL_PRICE_DECS_PROMO:
      return array
        .filter(el => el.priceRegular && el.priceRegular !== el.priceDiscount)
        .sort((a, b) => b.priceRegular - a.priceRegular);
  }
};

type FilterByPage = (
  array: BaseProduct[],
  perPage: PerPage,
  page: number,
) => ProcessingResult<CatalogueData>;

const filterByPage: FilterByPage = (array, perPage, page) => {
  const res = {
    items: [],
    currentPage: 1,
    pages: 1,
  } as CatalogueData;

  if (perPage === PerPage.ALL) {
    res.items = array;

    if (page !== 1) {
      return formError(404, `Page doesn't exist`);
    }

    return { ok: true, data: res };
  }

  res.currentPage = page;

  const perPageInt = +perPage;

  res.pages = Math.ceil(array.length / perPageInt);

  const start = (page - 1) * perPageInt;
  const end = start + perPageInt;

  res.items = array.slice(start, end);

  if (res.items.length === 0 && page > 1) {
    return formError(404, `Page doesn't exist`);
  }

  return { ok: true, data: res };
};

export { filterByCategory, sortItems, filterByPage };
