import { useMemo } from 'react';
import {
  ProductsSlider as BrandNewModels,
  ProductsSlider as HotPrices,
  ImageSlider,
  ShopByCategory,
} from '../components/Home';
import { IPhone } from '../types';
import { useAppSelector } from '../app/hooks';
import {
  selectAccessories,
  selectPhones,
  selectProducts,
  selectTalets,
} from '../features/productsSlice';
import { getMultipleRandomPhones } from '../helper';

export const Home = () => {
  const products = useAppSelector(selectProducts) || [];
  const phones = useAppSelector(selectPhones) || [];
  const talets = useAppSelector(selectTalets) || [];
  const accessories = useAppSelector(selectAccessories) || [];

  const newHotPricePhones: IPhone[] = useMemo(
    () => getMultipleRandomPhones(products, 10),
    [products],
  );

  const newBrandModelsFilter
    = products.filter((product) => product.year > 2020);

  const newBrandModelsRandom: IPhone[] = useMemo(
    () => getMultipleRandomPhones(newBrandModelsFilter, 10),
    [products],
  );

  return (
    <>
      <h1>Welcome to Nice Gadgets store!</h1>
      <ImageSlider />

      <HotPrices newProducts={newHotPricePhones} title="Hot Prices" />

      <ShopByCategory
        phonesLength={phones.length}
        tabletsLength={talets.length}
        accessoriesLength={accessories.length}
      />
      <BrandNewModels
        newProducts={newBrandModelsRandom}
        title="Bran New Models"
      />
    </>
  );
};
