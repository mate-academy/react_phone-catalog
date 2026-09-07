/* eslint-disable no-console */

import { API_BASE_URL } from 'config/config';
import { Banner } from 'types/Banner';
import { Product } from 'types/Product';
import { ProductDetails } from 'types/ProductDetailsPage';

export type Category = 'phones' | 'tablets' | 'accessories';

export async function getProducts(): Promise<Product[]> {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));

    const response = await fetch(`${API_BASE_URL}/products.json`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: Product[] = await response.json();

    return data;
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'Unknown error occurred while fetching products';

    console.error('Error in getProducts:', error);
    throw new Error(`An error occurred: ${errorMessage}`);
  }
}

export async function getProductDetails(
  id: string,
  category: Category,
): Promise<ProductDetails> {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));

    let response;

    switch (category) {
      case 'phones':
        response = await fetch(`${API_BASE_URL}/phones.json`);
        break;
      case 'tablets':
        response = await fetch(`${API_BASE_URL}/tablets.json`);
        break;
      case 'accessories':
        response = await fetch(`${API_BASE_URL}/accessories.json`);
        break;
      default:
        break;
    }

    if (!response?.ok) {
      throw new Error(`HTTP error! status: ${response?.status}`);
    }

    const products: ProductDetails[] = await response.json();
    const productDetails = products.find(product => product.id === id);

    if (!productDetails) {
      throw new Error(`Product with id "${id}" not found`);
    }

    return productDetails;
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'Unknown error occurred while fetching product details';

    console.error('Error in getProductDetails:', error);
    throw new Error(`Failed to load product: ${errorMessage}`);
  }
}

export async function getFavouritesProducts(ids: string[]): Promise<Product[]> {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));

    const response = await fetch(`${API_BASE_URL}/products.json`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const products: Product[] = await response.json();

    const favourites = products.filter(product =>
      ids.includes(product.id.toString()),
    );

    if (!products && !favourites) {
      throw new Error(`Favourites list not found`);
    }

    return favourites;
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'Unknown error occurred while fetching favourites list';

    console.error('Error in getFavouritesProducts:', error);
    throw new Error(`Failed to load favourites: ${errorMessage}`);
  }
}

export async function getBanners(): Promise<Banner[]> {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));

    const response = await fetch(`${API_BASE_URL}/banners.json`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const banners: Banner[] = await response.json();

    if (!banners) {
      return [];
    }

    return banners;
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'Unknown error occurred while loading banners';

    console.error('Error in getBanners:', error);
    throw new Error(`Failed to load banners: ${errorMessage}`);
  }
}
