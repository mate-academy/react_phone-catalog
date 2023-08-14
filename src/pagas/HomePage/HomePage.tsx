import { HotPhones } from '../../components/HotPhones';
import { Slider } from '../../components/Slider';
import { Product } from '../../types/Product';

export const HomePage = () => {
  const storedProducts = localStorage.getItem('products');
  const products = storedProducts ? JSON.parse(storedProducts) : [];

  const phones = products.filter(
    (product: Product) => product.type === 'phone',
  );

  return (
    <>
      <Slider />
      <HotPhones phones={phones} />
    </>
  );
};
