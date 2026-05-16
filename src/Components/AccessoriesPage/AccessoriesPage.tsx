import { useProducts } from '../../Hooks/useProducts';
import { Catalog } from '../Catalog/Catalog';
import { Loader } from '../Loader/Loader';

export const AccessoriesPage = () => {
  const { data, isLoading } = useProducts('accessories');

  if (isLoading || !data) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div className="accessories-page">
      <Catalog title={'Accessories'} products={data} />
    </div>
  );
};
