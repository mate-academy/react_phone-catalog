import { ProductList } from '../../components/ProductList/ProductList';
import list from '../../../public/api/products.json';
import { Container } from '../../components/Container/Container';
import { useFavorites } from '../../context/FavoritesContext';

export const FavoritesPage = () => {
  const { favorites } = useFavorites();

  return (
    <Container>
      <ProductList
        list={list.filter(item => favorites.includes(String(item.id)))}
        type="Favorites"
      />
    </Container>
  );
};
