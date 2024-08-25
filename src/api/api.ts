import { Goods } from '../types';

const phoneData = require('../api/phones.json');
const accessoryData = require('../api/accessories.json');
const tabletData = require('../api/tablets.json');

const DATA_SOURCES: { [key: string]: Goods[] } = {
  phones: phoneData,
  accessories: accessoryData,
  tablets: tabletData,
};

export async function getAllProducts(productType: string): Promise<Goods[]> {
  const dataSource = DATA_SOURCES[productType];
  if (!dataSource) {
    throw new Error(`Invalid product type: ${productType}`);
  }
  return dataSource;
}

export async function getData(
  productType: string,
  productId: string,
): Promise<Goods> {
  const allProducts = await getAllProducts(productType);

console.log(`Fetching product data for ID: ${productId}`);
  const product = allProducts.find((item) => item.id === productId);
  if (!product) {
    throw new Error(`Product not found: ${productId}`);
  }
  return product;
}


export async function getProductsByName(
  productType: string,
  name: string,
): Promise<Goods[]> {
  const allProducts = await getAllProducts(productType);
  return allProducts.filter((item) => item.namespaceId === name);
}


