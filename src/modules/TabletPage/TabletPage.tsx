import { Container } from '../../components/container/Container';
import { ProductList } from '../../components/ProductsList/ProductsList';
import { TitlePages } from '../../components/title/TitlePages';
import { PageNav } from '../../components/pageNav/PageNav';

export const TabletPage = () => {
  return (
    <>
      <Container>
        <PageNav />
        <TitlePages type={'tablets'} />

        <ProductList />
      </Container>
    </>
  );
};
