import { ScrollLineCards } from '@/shared/components';

import products from '../../../../../public/api/products.json';

export const NewModels = () => {
  const avaliableProducts = products
    .filter(item => item.category === 'phones')
    .sort((item1, item2) => item2.year - item1.year)
    .slice(0, 20);

  return (
    <ScrollLineCards title={'Brand new models'} data={avaliableProducts} />
  );
};
