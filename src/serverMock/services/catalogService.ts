/* eslint-disable prettier/prettier */
import {
  CatalogParams,
  ItemsOnPage,
  Sort,
  type Response,
} from '@server/types/types';
import { BaseProduct } from '@shared/types/APITypes';

const defaultParams: CatalogParams = {
  sort: Sort.AGE,
  itemsOnPage: ItemsOnPage.ALL,
  page: 1,
};

// Mutation is essential, because this is server mock,
// I do not have DB and instruments to imply it full usage.


//todo: validation and map of internal and external values!
export const prepareArray = (
  data: BaseProduct[],
  initParams: Partial<CatalogParams> = { ...defaultParams },
): Response => {
  const params = { ...defaultParams, ...initParams };

  const { itemType, sort, itemsOnPage, page } = params;
  const initData = itemType
    ? [...data].filter((el: BaseProduct) =>
      el.category === itemType,
    )
    : [...data];

  const length = initData.length;

  const result: Response = {
    totalPages: 0,
    length: length,
    dataArray: [],
    currentPage: 0,
  };

  switch (sort) {
    case Sort.TITLE:
      result.dataArray = [...initData].sort(
        (a: BaseProduct, b: BaseProduct) => a.name.localeCompare(b.name),
      );
      break;
    case Sort.AGE:
      result.dataArray = [...initData].sort(
        (a: BaseProduct, b: BaseProduct) => b.year - a.year,
      );
      break;
    case Sort.PRICE_ASC:
      result.dataArray = [...initData].sort(
        (a: BaseProduct, b: BaseProduct) => a.price - b.price,
      );
      break;
    case Sort.FULL_PRICE_DECS_PROMO:
      result.dataArray = [...initData]
        .filter(el => el.fullPrice && el.fullPrice !== el.price)
        .sort((a: BaseProduct, b: BaseProduct) => b.fullPrice - a.fullPrice);
      break;
    default:
      break;
  }

  if (itemsOnPage === ItemsOnPage.ALL) {
    return result;
  }

  result.totalPages = Math.ceil(length / +itemsOnPage);
  result.currentPage = page;
  const start = (page - 1) * +itemsOnPage;
  const end = start + +itemsOnPage;

  result.dataArray = [...result.dataArray].slice(start, end);

  return result;
};
