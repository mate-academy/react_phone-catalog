import { useProducts } from '../../Hooks/useProducts';
import { Catalog } from '../Catalog/Catalog';
import { Loader } from '../Loader/Loader';

export const PhonesPage = () => {
  const { data, isLoading } = useProducts('phones');

  if (isLoading || !data) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div className="phones-page">
      {/* Your favourite phones will appear here! */}
      <Catalog title={'Mobile Phones'} products={data} />
    </div>
  );
};
