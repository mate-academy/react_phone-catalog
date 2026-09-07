import { useCallback, useRef } from 'react';
import { Article } from '../shared/types/Article';
import { getDataPublic } from '../shared/functions/getDataPublic';
import { Products } from '../shared/types/Products';

export const useDataProduct = () => {
  const data = useRef(new Map<Products, Article[]>());

  const checkData = useCallback(
    async (dataName: Products) => {
      if (data.current.has(dataName)) {
        return data.current.get(dataName) ?? [];
      }

      try {
        const response = await getDataPublic('products');
        const newData = response.filter(
          (el: Article) => el.category === dataName,
        );

        data.current.set(dataName, newData);

        return response;
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(`problem with custom hook ${error}`);

        return [];
      }
    },
    [data],
  );

  return { checkData };
};
