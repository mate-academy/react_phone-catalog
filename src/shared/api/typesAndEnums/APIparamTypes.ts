import { Category, ItemsAmount, Order, Request } from '.';

interface CatalogueConf {
  itemType: Category;
  sort: Order;
  perPage: ItemsAmount;
  page: number;
}

interface ProductConf {
  itemId: string;
}

interface AmountConf {
  category: Category;
}

interface CatalogueRequest {
  request: Request.CATALOGUE;
  body: CatalogueConf;
}

interface ProductRequest {
  request: Request.PRODUCT;
  body: ProductConf;
}

interface AmountRequest {
  request: Request.AMOUNT;
  body: AmountConf;
}

interface BannerRequest {
  request: Request.BANNER;
}

export {
  type CatalogueConf,
  type ProductConf,
  type AmountConf,
  type CatalogueRequest,
  type ProductRequest,
  type AmountRequest,
  type BannerRequest,
};
