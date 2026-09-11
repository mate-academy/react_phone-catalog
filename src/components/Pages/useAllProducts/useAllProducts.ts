import { useEffect, useState } from 'react';

export interface Product {
  id: string;
  itemId: string | number;
  category: string;
  namespaceId: string;
  name: string;
  priceRegular: number;
  priceDiscount: number;
  screen: string;
  capacity: string;
  capacityAvailable: string[];
  colorsAvailable: string[];
  color: string;
  ram: string;
  year: number;
  images: string[];
  description: Description[];
  resolution: string;
  processor: string;
  camera: string;
  zoom: string;
  cell: string;
  text: string[];
}

interface Description {
  title: string;
  text: string;
}

const allProductsUrls = [
  '/api/phones.json',
  '/api/tablets.json',
  '/api/accessories.json',
];

export const useAllProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    Promise.all(
      allProductsUrls.map(url =>
        fetch(`${import.meta.env.BASE_URL}${url}`).then(response =>
          response.json(),
        ),
      ),
    )
      .then(productArrays => setProducts(productArrays.flat()))
      .catch(() => setProducts([]))
      .finally(() => setIsLoading(false));
  }, []);

  return { products, isLoading };
};
