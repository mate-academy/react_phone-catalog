import { Container } from '../../components/container/Container';
import { Filter } from '../../components/filter/Filter';
import { ProductList } from '../../components/ProductsList/ProductsList';
import { TitlePages } from '../../components/title/TitlePages';
import { PageNav } from '../PhonePage/components/pageNav/PageNav';

export const AccessoriesPage = () => {
  return (
    <>
      <Container>
        <PageNav />
        <TitlePages type={'accessories'} />
           <Filter/>
        <ProductList />
      </Container>
    </>
  );
};
