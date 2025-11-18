import { BannerData, CatalogueProduct, Product } from '@shared/types';
import { Methods, Request } from './api.enums';
import {
  AmountBody,
  CartBody,
  CatalogueBody,
  CheckoutBody,
  ProdBody,
} from './bodies.types';

interface Error {
  ok: false;
  error: {
    statusCode: number;
    error: string;
    message: string;
  };
}

interface CatalogueData {
  items: CatalogueProduct[] | Product[];
  currentPage: number;
  pages: number;
}

type RequestBodyMap = {
  [Request.BANNER]: { method: Methods.GET; request: Request.BANNER };
  [Request.PRODUCT]: {
    method: Methods.GET;
    request: Request.PRODUCT;
    body: ProdBody;
  };
  [Request.CATALOGUE]: {
    method: Methods.GET;
    request: Request.CATALOGUE;
    body: CatalogueBody;
  };
  [Request.AMOUNT]: {
    method: Methods.GET;
    request: Request.AMOUNT;
    body: AmountBody;
  };
  [Request.CART]: {
    method: Methods.GET;
    request: Request.CART;
    body: CartBody;
  };
  [Request.CHECKOUT]: {
    method: Methods.POST;
    request: Request.CHECKOUT;
    body: CheckoutBody;
  };
};

interface CartData {
  products: {
    product: Product;
    amount: number;
    total: number;
  }[];
  total: number;
}

interface ApiOKResponse<T> {
  ok: true;
  data: T;
}

type Crypto = `${string}-${string}-${string}-${string}-${string}`;

type ApiResponseMap = {
  [Request.BANNER]: ApiOKResponse<BannerData[]>;
  [Request.PRODUCT]: ApiOKResponse<Product>;
  [Request.CATALOGUE]: ApiOKResponse<CatalogueData>;
  [Request.AMOUNT]: ApiOKResponse<number>;
  [Request.CART]: ApiOKResponse<CartData>;
  [Request.CHECKOUT]: ApiOKResponse<Crypto>;
};

export {
  type Error,
  type RequestBodyMap,
  type ApiResponseMap,
  type ApiOKResponse,
  type CartData,
  type CatalogueData,
};
