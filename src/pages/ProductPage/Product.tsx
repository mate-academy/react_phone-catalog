import { useLocation } from 'react-router-dom';
import { ProductsList } from '../../modules/ProductsList';
// eslint-disable-next-line max-len
import { Category } from '../../utils/types/Categories';
import { useGetDataQuery } from '../../store/api/api';

export const ProductSingle = () => {
  const { pathname } = useLocation();

  const currentCategory = pathname.startsWith('/')
    ? (pathname.slice(1) as Category)
    : (pathname as Category);

  const { data } = useGetDataQuery();

  const phonesData = data?.filter(
    product => product.category === currentCategory,
  );

  return (
    <div>
      <ProductsList data={phonesData} title="Mobile phones" />
    </div>
  );
};
