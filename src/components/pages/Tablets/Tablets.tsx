import { Products } from '../../Products/Products';

export const Tablets: React.FC = () => {
  const currentCategory = 'Tablets';

  return <Products title="Tablets" category={currentCategory} />;
};
