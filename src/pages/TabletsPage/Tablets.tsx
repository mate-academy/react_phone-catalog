import { ProductsList } from '../../modules/ProductsList';
import { useGetDataQuery } from '../../store/api/api';

export const Tablets = () => {
  const { data } = useGetDataQuery();

  const tabletsData = data?.filter(product => product.category === 'tablets');

  return (
    <div>
      <ProductsList data={tabletsData} title="Tablets" />
    </div>
  );
};
