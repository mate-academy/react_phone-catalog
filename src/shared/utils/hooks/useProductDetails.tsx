/* eslint-disable prettier/prettier */
/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Accessories } from '../../../shared/types/Accessories';
import { PhonesTablets } from '../../../shared/types/PhonesTablets';
import {
  getAccessories,
  getPhones,
  getTablets,
} from '../../../shared/utils/httpClient';

export function getCategoryArr(
  nameSpace: string,
  categoryArr: Accessories[] | PhonesTablets[],
) {
  const nameSpaceArr = categoryArr.filter(
    item => item.namespaceId === nameSpace,
  );

  return nameSpaceArr;
}

export function getProductVariant(
  id: string,
  categoryArr: Accessories[] | PhonesTablets[],
) {
  const newProduct = categoryArr.find(item => item.id === id);

  return newProduct;
}

export function useProductDetails() {
  const { category, productId } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [product, setProduct] = useState<Accessories | PhonesTablets | null>(
    null,
  );
  const [categoryArr, setCategoryArr] = useState<Accessories[] | PhonesTablets[]>([]);
  const [nameSpace, setNameSpace] = useState('');

  useEffect(() => {
    setIsError(false);
    async function loadCategoryData() {
      if (!category || !productId) {
        return;
      }

      // if nameSpace haven't changed
      if (nameSpace.length > 0 && productId.includes(nameSpace)) {



        try {
          const productVariation = getProductVariant(productId, categoryArr);

          if (!productVariation) {
            throw new Error(`Product with id "${productId}" not found`);
          }

          setProduct(productVariation);
        } catch(error) {
          setIsError(true);
        }

        return;
      }

      setIsLoading(true);

      try {
        let data = [];

        switch (category) {
          case 'phones':
            data = await getPhones();

            break;

          case 'tablets':
            data = await getTablets();

            break;

          case 'accessories':
            data = await getAccessories();

            break;

          default:
            return;
        }

        const foundProduct = data.find(item => item.id === productId);


        setNameSpace(foundProduct?.namespaceId ||  '');

        const variations = getCategoryArr(foundProduct?.namespaceId || '', data);

        setCategoryArr(variations);
        setProduct(foundProduct || null);
      } catch (error) {
        setIsError(true);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    }

    loadCategoryData();
  }, [productId]);

  return { product, isLoading, isError };
}
