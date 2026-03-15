import { useContext } from 'react';
import { Container } from '../components/Container';
import { ProductList } from '../components/ProductList';
import { ProductsIntro } from '../components/ProductsIntro';
import { ProductControls } from '../components/UI/ProductsContols';
import { ProductsContext } from '../store/ProductsContext';
import { Category } from '../types/Category';
import { useCategoryProducts } from '../utils/useFilteredProducts';

export const AccessoriesPage = () => {
  const { products } = useContext(ProductsContext);
  const category = Category.Accessories;

  const { displayedProducts } = useCategoryProducts(products, category);

  return (
    <Container>
      <ProductsIntro category={category} />
      <ProductControls />
      <ProductList filteredProducts={displayedProducts} />
    </Container>
  );
};
