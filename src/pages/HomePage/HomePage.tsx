import { HotPhones } from '../../components/HotPhones';
import { NewPhones } from '../../components/NewPhones';
import { Slider } from '../../components/Slider';
import { SortPhones } from '../../components/SortPhones';
import { Product } from '../../types/Product';

export const HomePage = () => {
  const storedProducts = localStorage.getItem('products');
  const products = storedProducts ? JSON.parse(storedProducts) : [];

  const phones = products.filter(
    (product: Product) => product.type === 'phone',
  );
  const accessories = products.filter(
    (product: Product) => product.type === 'accessorie',
  );
  const tablets = products.filter(
    (product: Product) => product.type === 'tablet',
  );

  return (
    <>
      <Slider />
      <HotPhones phones={phones} />
      <SortPhones
        phones={phones}
        accessories={accessories}
        tablets={tablets}
      />
      <NewPhones phones={phones} />
    </>
  );
};
