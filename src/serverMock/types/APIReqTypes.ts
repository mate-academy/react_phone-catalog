import { GlobalValidNameSpaceIDs } from '@server/static';
import { CategoryParams, ItemsOnPage, OrderParams } from '.';

interface ValidCatalogueParams {
  itemType?: CategoryParams;
  sortOrder?: OrderParams;
  itemsOnPage?: ItemsOnPage;
  page?: number;
}

interface ValidAmountParams {
  category: Omit<CategoryParams, CategoryParams.ALL>;
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
