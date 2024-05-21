import { ProductsList } from '../../modules/ProductsList';
import { useGetDataQuery } from '../../store/api/api';

export const Phones = () => {
  const { data } = useGetDataQuery();

  const phonesData = data?.filter(product => product.category === 'phones');

  return (
    <div>
      <ProductsList data={phonesData} title="Mobile phones" />
    </div>
  );
};
