import { Product } from '../types/product';
import { ProductDetails } from '../types/productDetails';


export const getProducts = async (): Promise<Product[]> => {
  const data = await fetch('./api/products.json');

  const products: Product[] = await data.json();

  return products;
};

export const getCategoryDetails = async (
  categoryName: string,
): Promise<ProductDetails[]> => {
  const data = await fetch(`/api/${categoryName}.json`);

  const productsDetails: ProductDetails[] = await data.json();

  return productsDetails;
};

export const getProductDetailsByID = async (
  id: string,
  products: Product[],
): Promise<ProductDetails | undefined> => {
  const productCategory = products.find(
    product => product.itemId === id,
  )?.category;
  const data = await fetch(`./api/${productCategory}.json`);

  const categoryDetails: ProductDetails[] = await data.json();
  const productData = categoryDetails.find(item => item.id === id);

  return productData;
};
