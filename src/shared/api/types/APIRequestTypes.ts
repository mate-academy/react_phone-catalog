import { Category, ItemsAmount, Order, Request } from '.';

interface CatalogueConf {
  itemType: Category;
  sort: Order;
  perPage: ItemsAmount;
  page: number;
}

type RequestBodyMap = {
  [Request.BANNER]: { request: Request.BANNER };
  [Request.PRODUCT]: { request: Request.PRODUCT; body: { itemId: string } };
  [Request.CATALOGUE]: { request: Request.CATALOGUE; body: CatalogueConf };
  [Request.AMOUNT]: { request: Request.AMOUNT; body: { category: Category } };
};

type GetRequestBody<T extends Request> = RequestBodyMap[T];

export { type CatalogueConf, type RequestBodyMap, type GetRequestBody };
