import { ProductsList } from '../../modules/ProductsList';
import { useGetDataQuery } from '../../store/api/api';

export const Accessories = () => {
  const { data } = useGetDataQuery();

  const phonesData = data?.filter(
    product => product.category === 'accessories',
  );

  return (
    <div>
      <ProductsList data={phonesData} title="Accessories" />
    </div>
  );
};
