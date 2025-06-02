import { ProductsPage } from '@/components/ProductsPage';
import { TabletsHeader } from './components/TabletsHeader';
import { TabletsGrid } from './components/TabletsGrid';

export const Tablets = () => (
  <ProductsPage Header={TabletsHeader} Grid={TabletsGrid} />
);
