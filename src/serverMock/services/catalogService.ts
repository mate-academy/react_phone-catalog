import { apiFetch } from '@server/helpers';
import { ApiEndpoint } from '@server/static';
import {
  CategoryParams,
  ItemsOnPage,
  OrderParams,
  ValidCatalogueParams,
  BaseProduct,
  ValidResponse,
} from '@server/types';

const defaultParams: ValidCatalogueParams = {
  itemType: CategoryParams.ALL,
  sortOrder: OrderParams.NONE,
  itemsOnPage: ItemsOnPage.ALL,
  page: 1,
};

// Mutation is essential, because this is server mock,
// I do not have DB and instruments to imply it full usage.

async function getCatalogueItems(
  initParams?: ValidCatalogueParams,
): Promise<Omit<ValidResponse, 'status'>> {
  const params = { ...defaultParams, ...initParams } as ValidCatalogueParams;
  const { itemType, sortOrder, itemsOnPage, page } = params;
  let initialArray = (await apiFetch(ApiEndpoint.PRODUCTS)) as BaseProduct[];

  const response = {
    data: [] as BaseProduct[],
    currentPage: page as number,
    pages: 1,
  };

  if (itemType && itemType !== CategoryParams.ALL) {
    initialArray = initialArray.filter(
      (el: BaseProduct) => el.category === itemType,
    );
  }

  switch (sortOrder) {
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

  if (itemsOnPage === ItemsOnPage.ALL) {
    response.data = initialArray;
  } else {
    response.pages = Math.ceil(
      initialArray.length /
        +(itemsOnPage as Omit<ItemsOnPage, ItemsOnPage.ALL>),
    );

    const start =
      ((page as number) - 1) *
      +(itemsOnPage as Omit<ItemsOnPage, ItemsOnPage.ALL>);
    const end = start + +(itemsOnPage as Omit<ItemsOnPage, ItemsOnPage.ALL>);

    response.data = initialArray.slice(start, end);
  }

  return response as Omit<ValidResponse, 'status'>;
}

export { getCatalogueItems };
