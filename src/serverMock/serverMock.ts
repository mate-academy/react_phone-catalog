/* eslint-disable no-console */

import { getBanners } from './services/bannerService';
import { getProduct } from './services/productService';
import { RequestType } from './types';
import { validateMethod, validateParams } from './validation';

async function getRequest(conf: string) {
  const config = JSON.parse(conf);
  const method = config.method;

  if (!validateMethod(method)) {
    console.warn(`Unreckognized method: ${method}`);
    throw new Error(`Unreckognized method: ${method}`);
  }

  const params = config.body;

  if (!validateParams(params)) {
    console.warn(`Unreckognized body params: ${params}`);
    throw new Error(`Unreckognized body params: ${params}`);
  }

  let data;

  switch (params.request) {
    case RequestType.BANNER:
      data = await getBanners();

      return data;
    case RequestType.PRODUCT:
      data = await getProduct(params);

      return data;
    case RequestType.CATALOGUE:
  }
}

export { getRequest };
