import { useLocation } from 'react-router-dom';
import { ProductsList } from '../../modules/ProductsList';
// eslint-disable-next-line max-len
import { Category } from '../../utils/types/Categories';
import { useGetDataQuery } from '../../store/api/api';
import { Loader } from '../../modules/Loader';
import { Container } from '../../modules/Container';

export const Catalog = () => {
  const { pathname } = useLocation();

  const currentCategory = pathname.startsWith('/')
    ? (pathname.slice(1) as Category)
    : (pathname as Category);

  const { data } = useGetDataQuery();

  const getTitleForCategory =
    currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1);

  const phonesData = data?.filter(
    product => product.category === currentCategory,
  );

  return (
    <div>
      <Container>
        {phonesData ? (
          <ProductsList data={phonesData} title={getTitleForCategory} />
        ) : (
          <Loader />
        )}
      </Container>
    </div>
  );
};
