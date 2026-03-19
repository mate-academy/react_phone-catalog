import { Container } from '../components/Container';
import { ProductList } from '../components/ProductList';
import { ProductsIntro } from '../components/ProductsIntro';
import { ProductControls } from '../components/UI/ProductsContols';
import { Category } from '../types/Category';
import { useContext } from 'react';
import { ProductsContext } from '../store/ProductsContext';
import { useCategoryProducts } from '../hooks/useFilteredProducts';

export const PhonesPage = () => {
  const { products, searchTerm } = useContext(ProductsContext);
  const category = Category.Phones;

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
