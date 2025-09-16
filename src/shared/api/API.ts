/* eslint-disable no-console */
import { getRequest } from '@server/api/serverMock';
import {
  AmountRequest,
  BannerResponse,
  CatalogueConf,
  CatalogueData,
  CatalogueRequest,
  CatalogueResponse,
  Category,
  ErrorMessage,
  ItemResponse,
  LengthResponse,
  ProductRequest,
  Request,
  ResponseStatus,
} from './typesAndEnums';
import { BannerData, Product } from '@shared/types';

const handleError = (message: string): never => {
  console.warn(`Unable to load data, error: ${message}`);
  throw new Error(`Unable to load data, error: ${message}`);
};

const get = {
  banners: async (): Promise<BannerData[]> => {
    const banners: BannerResponse | ErrorMessage = JSON.parse(
      await getRequest(JSON.stringify({ request: Request.BANNER })),
    );

    if (banners.status === ResponseStatus.ERROR) {
      return handleError(banners.message);
    }

    return banners.data;
  },

  product: async (conf: string): Promise<Product | null> => {
    const itemConf: ProductRequest = {
      request: Request.PRODUCT,
      body: { itemId: conf },
    };

    const item: ItemResponse | ErrorMessage = JSON.parse(
      await getRequest(JSON.stringify(itemConf)),
    );

    if (item.status === ResponseStatus.ERROR) {
      return handleError(item.message);
    }

    return item.data;
  },

  catalogue: async (conf: CatalogueConf): Promise<CatalogueData> => {
    const catConf: CatalogueRequest = {
      request: Request.CATALOGUE,
      body: conf,
    };

    const catalogueItems: CatalogueResponse | ErrorMessage = JSON.parse(
      await getRequest(JSON.stringify(catConf)),
    );

    if (catalogueItems.status === ResponseStatus.ERROR) {
      return handleError(catalogueItems.message);
    }

    return catalogueItems.data;
  },

  length: async (category: Category): Promise<number> => {
    const lenReq: AmountRequest = {
      request: Request.AMOUNT,
      body: { category: category },
    };

    const itemsAmount: LengthResponse | ErrorMessage = JSON.parse(
      await getRequest(JSON.stringify(lenReq)),
    );

    if (itemsAmount.status === ResponseStatus.ERROR) {
      return handleError(itemsAmount.message);
    }

    console.log(itemsAmount);

    return itemsAmount.data;
  },
};

export { get };
