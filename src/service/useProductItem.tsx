import { useShopDataContext } from '../context/ShopContext/ShopDataContext';

export const useProductItem = (
  productId: string | undefined,
  category: string | undefined,
) => {
  const {phones, tablets, accessories, fetchData} = useShopDataContext();

  let item;
  let productData;

  switch (category) {
    case 'phones':
      productData = phones ;
      break;
    case 'tablets':
      productData = tablets;
      break;
    default :
      productData = accessories;
      break;
  }

  item = productData.data.find(data => data.id === productId);

  return {
    item,
    isLoading: productData.isLoading,
    error: productData.error,
    fetchData
  };

};   