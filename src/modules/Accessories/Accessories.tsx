import { ProductsPage } from '@/components/ProductsPage';
import { AccessoriesHeader } from './components/AccessoriesHeader';
import { AccessoriesGrid } from './components/AccessoriesGrid';

export const Accessories = () => (
  <ProductsPage Header={AccessoriesHeader} Grid={AccessoriesGrid} />
);
