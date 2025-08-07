import { GlobalValidNameSpaceIDs } from '@server/static';
import { CategoryParams, ItemsOnPage, OrderParams } from '.';

interface ValidCatalogueParams {
  itemType?: CategoryParams;
  sortOrder?: OrderParams;
  itemsOnPage?: ItemsOnPage;
  page?: number;
}

interface ValidProdParams {
  category: Omit<CategoryParams, CategoryParams.ALL>;
  itemId: GlobalValidNameSpaceIDs;
}

type ValidParams = ValidCatalogueParams | ValidProdParams;

export { type ValidCatalogueParams, type ValidProdParams, type ValidParams };
