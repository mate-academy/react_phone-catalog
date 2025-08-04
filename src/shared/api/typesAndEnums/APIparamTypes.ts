import { Category, ItemsAmount, Order, Request } from '.';

interface RequestParams {
  request: Request;
}

interface ProductRequest extends RequestParams {
  body: {
    category: Category;
    itemId: string;
  };
}

interface CatalogueConf {
  itemType?: Category;
  sortOrder?: Order;
  itemsOnPage?: ItemsAmount;
  page?: number;
}

interface CatalogueRequest extends RequestParams {
  body: CatalogueConf;
}
interface ProductConf {
  category: Category;
  itemId: string;
}

export {
  type ProductRequest,
  type RequestParams,
  type CatalogueRequest,
  type ProductConf,
  type CatalogueConf,
};
