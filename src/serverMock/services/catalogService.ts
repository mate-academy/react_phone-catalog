import { apiFetch } from '@server/helpers';
import { ApiEndpoint } from '@server/static';
import {
  ItemsOnPage,
  OrderParams,
  ValidCatalogueParams,
  BaseProduct,
  ValidResponse,
  ServerCategory,
  ErrorObject,
  Status,
} from '@server/types';

// Mutation is essential, because this is server mock,
// I do not have DB and instruments to imply it full usage.

async function getCatalogueItems(
  params: ValidCatalogueParams,
): Promise<ValidResponse | ErrorObject> {
  const { itemType, sort, perPage, page } = params;

  let initialArray = (await apiFetch(ApiEndpoint.PRODUCTS)) as BaseProduct[];

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
    response.pages = Math.ceil(
      initialArray.length / +(perPage as Exclude<ItemsOnPage, ItemsOnPage.ALL>),
    );

    const start =
      ((page as number) - 1) *
      +(perPage as Exclude<ItemsOnPage, ItemsOnPage.ALL>);
    const end = start + +(perPage as Exclude<ItemsOnPage, ItemsOnPage.ALL>);

    response.items = initialArray.slice(start, end);

    if (response.items.length === 0 && page > 1) {
      return {
        status: Status.ERROR,
        message: 'Requested page does not exist',
      };
    }
  }

  return {
    status: Status.SUCCESS,
    data: response,
  };
}

export { getCatalogueItems };
