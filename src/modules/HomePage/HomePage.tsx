import React from 'react';
import { BrandNewModels } from './components/BrandNewModels/BrandNewModels';
import { Categories } from './components/Categories/Categories';
import { HotPrices } from './components/HotPrices/HotPrices';
// import { getData } from '../utils/fetchClient';
// import { Product } from '../../types/Product';
// import { Phone } from '../../types/Phone';
// import { Accessory } from '../../types/Accessories';
// import { Tablet } from '../../types/Tablet';

export const HomePage = () => {
  // const [products, setProducts] = useState<Product[]>([]);
  // const [phones, setPhones] = useState<Phone[]>([]);
  // const [accessories, setAccessories] = useState<Accessory[]>([]);
  // const [tablets, setTablets] = useState<Tablet[]>([]);

  // useEffect(() => {
  //   getData<Product[]>('products.json').then(setProducts);
  //   getData<Phone[]>('phones.json').then(setPhones);
  //   getData<Accessory[]>('accessories.json').then(setAccessories);
  //   getData<Tablet[]>('tablets.json').then(setTablets);
  // }, []);

  return (
    <>
      <h1>Welcome to Nice Gadgets store!</h1>
      <BrandNewModels />
      <Categories />
      <HotPrices />
    </>
  );
};
