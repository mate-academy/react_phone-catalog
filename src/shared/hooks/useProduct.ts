import { useContext, useEffect, useState } from 'react';
import { ProductContext } from '../context/ProductsContext';
import { useParams } from 'react-router-dom';
import { ProductItem } from '../../types/ProductItem';

export const useProduct = () => {
  const { products } = useContext(ProductContext);
  const { productId } = useParams();
  const numberProductId = productId ? +productId : 0;
  const [product, setProduct] = useState<ProductItem | null>(null);

  useEffect(() => {
    if (!products.length || !numberProductId) {
      return;
    }

    const productItem = products.find(p => p.id === numberProductId);
    const itemCategory = productItem?.category;

    if (!itemCategory) {
      return;
    }

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
        if (response.ok) {
          return response.json();
        }

        throw new Error('Failed to fetch products');
      })
      .then((data: ProductItem[]) => {
        setProduct(data.find(item => item.id === productItem.itemId) || null);
      })
      .catch(error => {
        throw error;
      });
  }, [products, numberProductId]);

  return { product };
};
