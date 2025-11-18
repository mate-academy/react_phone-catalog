import { catalogueProducts } from '../static';
import { ValidCatalogueBody, CatalogueData, ProcessingResult } from '../types';
import { filterByCategory, filterByPage, sortItems } from './helpers';

function getCatalogueItems(
  params: ValidCatalogueBody,
): ProcessingResult<CatalogueData> {
  const { category, sort, perPage, page } = params;

  const initialArray = [...catalogueProducts];
  const filtered = filterByCategory(initialArray, category);
  const sorted = sortItems(filtered, sort);

  return filterByPage(sorted, perPage, page);
}

export { getCatalogueItems };
