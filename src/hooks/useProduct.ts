import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProductContext } from '../shared/context/ProductsContext';
import { ProductItem } from '../types/ProductItem';

export const useProduct = () => {
  const { products } = useContext(ProductContext);
  const { productId } = useParams();
  const [product, setProduct] = useState<ProductItem | null>(null);

  useEffect(() => {
    if (!products.length || !productId) {
      return;
    }

    const numberProductId = +productId;
    const productItem = products.find(p => p.id === numberProductId);

    if (!productItem) {
      setProduct(null);

      return;
    }

    const itemCategory = productItem.category;

    const API_URL_PRODUCT = () => {
      switch (itemCategory) {
        case 'phones':
          return './api/phones.json';
        case 'tablets':
          return './api/tablets.json';
        case 'accessories':
          return './api/accessories.json';
        default:
          return './api/products.json';
      }
    };

    fetch(API_URL_PRODUCT())
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        return response.json();
      })
      .then((data: ProductItem[]) => {
        setProduct(data.find(item => item.id === productItem.itemId) || null);
      })
      .catch(() => {
        setProduct(null);
      });
  }, [products, productId]);

  return { product };
};
