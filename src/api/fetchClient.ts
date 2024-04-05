import { Product, ProductIncomplete } from '../types/Product';

const BASE_URL = 'https://yehorf21.github.io/react_phone-catalog';

function getData(url: string) {
  return fetch(url).then(resolve => resolve.json());
}

export const getProducts = (): Promise<ProductIncomplete[]> => {
  return getData(BASE_URL + '/api/products.json');
};

export const fetchAllProducts = async () => {
  const products = await getProducts();

  const urls = [
    BASE_URL + '/api/phones.json',
    BASE_URL + '/api/tablets.json',
    BASE_URL + '/api/accessories.json',
  ];

  const processedIDs = new Set();
  const productsToReturn: Product[] = [];

  const productsDetailed = (
    await Promise.all(urls.map(url => getData(url)))
  ).flat();

  products.forEach(product => {
    productsDetailed.forEach(one => {
      if (product.itemId === one.id && !processedIDs.has(product.itemId)) {
        const { resolution, processor, ram, capacity, camera, zoom, cell } =
          one;

        productsToReturn.push({
          ...one,
          mainId: product.id,
          year: product.year,
          screen: product.screen,
          specs: {
            screen: product.screen,
            resolution,
            processor,
            ram,
            capacity,
            camera,
            zoom,
            cell,
          },
        });

        processedIDs.add(product.itemId);
      }
    });
  });

  return productsToReturn;
};
