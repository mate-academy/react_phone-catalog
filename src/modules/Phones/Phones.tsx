import { ProductsPage } from '@/components/ProductsPage';
import { PhonesHeader } from './components/PhonesHeader';
import { PhonesGrid } from './components/PhonesGrid';

export const Phones = () => (
  <ProductsPage Header={PhonesHeader} Grid={PhonesGrid} />
);
