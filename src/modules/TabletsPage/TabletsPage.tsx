import { ProductList } from '../../components/ProductList/ProductList';
import list from '../../../public/api/products.json';
import { Container } from '../../components/Container/Container';

export const TabletsPage = () => {
  return (
    <Container>
      <ProductList
        list={list.filter(item => item.category === 'tablets')}
        type="Tablets"
      />
    </Container>
  );
};
