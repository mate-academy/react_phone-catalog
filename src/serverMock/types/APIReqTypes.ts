import { GlobalValidNameSpaceIDs } from '@server/static';
import { ServerCategory, ItemsOnPage, OrderParams } from '.';

interface ValidCatalogueParams {
  itemType?: ServerCategory;
  sort?: OrderParams;
  perPage?: ItemsOnPage;
  page?: number;
}

interface ValidAmountParams {
  category: Exclude<ServerCategory, ServerCategory.ALL>;
}

interface ValidProdParams extends ValidAmountParams {
  itemId: GlobalValidNameSpaceIDs;
}

type ValidParams = ValidCatalogueParams | ValidAmountParams | ValidProdParams;

export {
  type ValidCatalogueParams,
  type ValidProdParams,
  type ValidParams,
  type ValidAmountParams,
};
