/* eslint-disable no-console */
import { getRequest } from '@server/api/serverMock';
import {
  BasicResponse,
  CatalogueRequest,
  CatalogueResponse,
  ErrorMessage,
  ProductRequest,
  Request,
  type ProductConf,
  type CatalogueConf,
} from './typesAndEnums';
import { BaseProduct, Product } from '@shared/types/APITypes';
import { BannerData } from '@entities/bannerSlide/types/bannerSlide';

function handleError(message: string): never {
  console.warn(`Unable to load data, error: ${message}`);
  throw new Error(`Unable to load data, error: ${message}`);
}

const get = {
  banners: async (): Promise<BannerData[]> => {
    const banners: BasicResponse<BannerData[]> | ErrorMessage = JSON.parse(
      await getRequest(JSON.stringify(Request.BANNER)),
    );

    if (banners.status === false) {
      return handleError(banners.message);
    }

    return banners.data;
  },

  product: async (conf: ProductConf): Promise<Product[]> => {
    const itemConf: ProductRequest = {
      request: Request.PRODUCT,
      body: { ...conf },
    };

    const item: BasicResponse<Product[]> | ErrorMessage = JSON.parse(
      await getRequest(JSON.stringify(itemConf)),
    );

    if (item.status === false) {
      return handleError(item.message);
    }

    return item.data;
  },
  catalogue: async (
    conf: CatalogueConf,
  ): Promise<{
    data: BaseProduct[];
    currentPage: number;
    pages: number;
  }> => {
    const catConf: CatalogueRequest = {
      request: Request.CATALOGUE,
      body: { ...conf },
    };

    const catalogueItems: CatalogueResponse | ErrorMessage = JSON.parse(
      await getRequest(JSON.stringify(catConf)),
    );

    if (catalogueItems.status === false) {
      handleError(catalogueItems.message);
    }

    const { data, currentPage, pages } = catalogueItems;

    return { data, currentPage, pages };
  },
};

export { get };
