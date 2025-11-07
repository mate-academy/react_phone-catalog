import { apiFetch, createError } from '@server/helpers';
import {
  ApiEndpoint,
  ItemsOnPage,
  OrderParams,
  ServerCategory,
} from '@server/static';
import {
  BaseProduct,
  ValidCatalogueBody,
  ServiceResult,
  Status,
  CatalogueData,
} from '@server/types';

async function getCatalogueItems(
  params: ValidCatalogueBody,
): Promise<ServiceResult<CatalogueData>> {
  const { itemType, sort, perPage, page } = params;

  const fetchResult = await apiFetch(ApiEndpoint.PRODUCTS);

  if (fetchResult.status !== Status.SUCCESS) {
    return fetchResult;
  }

  let initialArray = fetchResult.data;

  const response = {
    items: [] as BaseProduct[],
    currentPage: page as number,
    pages: 1,
  };

  if (itemType !== ServerCategory.ALL) {
    initialArray = initialArray.filter(
      (el: BaseProduct) => el.category === itemType,
    );
  }

  switch (sort) {
    case OrderParams.AGE:
      initialArray = initialArray.sort(
        (a: BaseProduct, b: BaseProduct) => b.year - a.year,
      );
      break;
    case OrderParams.TITLE:
      initialArray = initialArray.sort((a: BaseProduct, b: BaseProduct) =>
        a.name.localeCompare(b.name),
      );
      break;
    case OrderParams.PRICE_ASC:
      initialArray = initialArray.sort(
        (a: BaseProduct, b: BaseProduct) => a.priceDiscount - b.priceDiscount,
      );
      break;
    case OrderParams.FULL_PRICE_DECS_PROMO:
      initialArray = initialArray
        .filter(el => el.priceRegular && el.priceRegular !== el.priceDiscount)
        .sort(
          (a: BaseProduct, b: BaseProduct) => b.priceRegular - a.priceRegular,
        );
      break;
    default:
      break;
  }

  if (perPage === ItemsOnPage.ALL) {
    response.items = initialArray;
  } else {
    const perPageInt = +perPage;

    response.pages = Math.ceil(initialArray.length / perPageInt);

    const start = ((page as number) - 1) * perPageInt;
    const end = start + perPageInt;

    response.items = initialArray.slice(start, end);

    if (response.items.length === 0 && page > 1) {
      return createError(404, `Page doesn't exist`);
    }
  }

  return {
    status: Status.SUCCESS,
    data: response,
  };
}

export { getCatalogueItems };
