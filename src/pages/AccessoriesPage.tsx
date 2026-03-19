import { useContext } from 'react';
import { Container } from '../components/Container';
import { ProductList } from '../components/ProductList';
import { ProductsIntro } from '../components/ProductsIntro';
import { ProductControls } from '../components/UI/ProductsContols';
import { ProductsContext } from '../store/ProductsContext';
import { Category } from '../types/Category';
import { useCategoryProducts } from '../hooks/useFilteredProducts';

export const AccessoriesPage = () => {
  const { products, searchTerm } = useContext(ProductsContext);
  const category = Category.Accessories;

  const { displayedProducts } = useCategoryProducts(products, category);

  const filtered = displayedProducts.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <Container>
      <ProductsIntro category={category} />
      <ProductControls />
      <ProductList filteredProducts={filtered} />
    </Container>
  );
};
