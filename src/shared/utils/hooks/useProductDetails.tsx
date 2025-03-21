import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  DispatchContext,
  StateContext,
} from '../../../Provider/GadgetsContext';
import { Accessories } from '../../../shared/types/Accessories';
import { PhonesTablets } from '../../../shared/types/PhonesTablets';
import {
  getAccessories,
  getPhones,
  getTablets,
} from '../../../shared/utils/httpClient';

export function useProductDetails() {
  const { phones, tablets, accessories } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const { category, productId } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState<Accessories | PhonesTablets | null>(
    null,
  );

  // Загружаем данные, если их ещё нет
  useEffect(() => {
    async function loadCategoryData() {
      if (!category || !productId) {
        return;
      }

      setIsLoading(true);

      try {
        let data = [];

        switch (category) {
          case 'phones':
            if (phones.length === 0) {
              data = await getPhones();
              dispatch({ type: 'SET_PHONES', payload: data });
            }

            break;

          case 'tablets':
            if (tablets.length === 0) {
              data = await getTablets();
              dispatch({ type: 'SET_TABLETS', payload: data });
            }

            break;

          case 'accessories':
            if (accessories.length === 0) {
              data = await getAccessories();
              dispatch({ type: 'SET_ACCESSORIES', payload: data });
            }

            break;

          default:
            return;
        }
      } catch (error) {
        throw error;
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    }

    loadCategoryData();
  }, [productId]);

  // Ищем продукт после загрузки данных
  useEffect(() => {
    if (!category || !productId) {
      return;
    }

    let allProducts: (Accessories | PhonesTablets)[] = [];

    switch (category) {
      case 'phones':
        allProducts = phones;
        break;
      case 'tablets':
        allProducts = tablets;
        break;
      case 'accessories':
        allProducts = accessories;
        break;
      default:
        return;
    }

    const foundProduct = allProducts.find(item => item.id === productId);

    setProduct(foundProduct || null);
  }, [productId]);

  return { product, isLoading };
}
