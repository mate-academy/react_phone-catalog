import { Container } from '../components/Container';
import { ProductList } from '../components/ProductList';
import { ProductsIntro } from '../components/ProductsIntro/ProductsIntro';
import { ProductControls } from '../components/UI/SortBy';

export const PhonesPage = () => {
  return (
    <Container>
      <ProductsIntro />
      <ProductControls />
      <ProductList />
    </Container>
  );
};
