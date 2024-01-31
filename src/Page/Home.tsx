import { useMemo } from 'react';
import {
  PhonesSlider as BrandNewModels,
  PhonesSlider as HotPrices,
} from '../components/Home/PhonesSlider';
import { ImageSlider } from '../components/Home/ImageSlider';
import { IPhone } from '../types';
import { useAppSelector } from '../app/hooks';
import { selectPhones } from '../features/phoneSlice/phonesSlice';
import { ShopByCategory } from '../components/Home/ShopByCategory';
import { getMultipleRandomPhones } from '../helper/getMultipleRandomPhones';

export const Home = () => {
  const phones = useAppSelector(selectPhones) || [];

  const newHotPricePhones: IPhone[] = useMemo(
    () => getMultipleRandomPhones(phones, 10),
    [phones],
  );

  const newBrandModelsFilter = phones.filter((phone) => phone.year === 2019);

  const newBrandModelsRandom: IPhone[] = useMemo(
    () => getMultipleRandomPhones(newBrandModelsFilter, 10), [phones],
  );

  return (
    <>
      <div
        style={{
          width: '100%',
          height: '432px',
          margin: '40px 0px 72px',
          position: 'relative',
        }}
      >
        <ImageSlider />
      </div>

      <HotPrices phones={newHotPricePhones} title="Hot Prices" />

      <ShopByCategory phonesLength={phones.length} />
      <BrandNewModels phones={newBrandModelsRandom} title="Bran New Models" />
    </>
  );
};
