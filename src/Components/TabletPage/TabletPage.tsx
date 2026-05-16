import { useProducts } from '../../Hooks/useProducts';
import { Catalog } from '../Catalog/Catalog';
import { Loader } from '../Loader/Loader';

export const TabletPage = () => {
  const { data, isLoading } = useProducts('tablets');

  if (isLoading || !data) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div className="tablet-page">
      <Catalog title={'Tablets'} products={data} />
    </div>
  );
};
