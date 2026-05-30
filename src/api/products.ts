import { AllProductsType } from '../types/AllProductsType';

export const getProductsData = async (): Promise<{
  newModels: AllProductsType[];
  hotPrices: AllProductsType[];
  totalPhoneModels: number;
  totalTabletsModels: number;
  totalAccessoriesModels: number;
}> => {
  const res = await fetch('api/products.json');

  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }

  const data: AllProductsType[] = await res.json();

  const newModels = data
    .filter(phone => phone.year === 2022)
    .sort(() => Math.random() - 0.5)
    .slice(0, 12);

  const hotPrices = data
    .filter(models => models.year < 2021)
    .sort(() => Math.random() - 0.5)
    .slice(0, 12);

  const totalPhoneModels = data.filter(p => p.category === 'phones').length;
  const totalTabletsModels = data.filter(p => p.category === 'tablets').length;
  const totalAccessoriesModels = data.filter(
    p => p.category === 'accessories',
  ).length;

  return {
    newModels,
    hotPrices,
    totalPhoneModels,
    totalTabletsModels,
    totalAccessoriesModels,
  };
};
