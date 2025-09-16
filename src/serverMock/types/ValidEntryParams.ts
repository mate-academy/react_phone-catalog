import { ServerCategory, ItemsOnPage, OrderParams } from '.';

interface ValidCatalogueParams {
  itemType: ServerCategory;
  sort: OrderParams;
  perPage: ItemsOnPage;
  page: number;
}

interface ValidAmountParams {
  category: ServerCategory;
}

interface ValidProdParams extends ValidAmountParams {
  itemId: string;
}

type ValidParams = ValidCatalogueParams | ValidAmountParams | ValidProdParams;

export {
  type ValidCatalogueParams,
  type ValidProdParams,
  type ValidParams,
  type ValidAmountParams,
};
