import { Container } from '../components/Container';
import { ProductList } from '../components/ProductList';
import { ProductsIntro } from '../components/ProductsIntro';
import { ProductControls } from '../components/UI/ProductsContols';
import { Category } from '../types/Category';
import { useContext } from 'react';
import { ProductsContext } from '../store/ProductsContext';
import { useCategoryProducts } from '../utils/useFilteredProducts';

export const PhonesPage = () => {
  const { products } = useContext(ProductsContext);
  const category = Category.Phones;

  const { displayedProducts } = useCategoryProducts(products, category);

  return (
    <Container>
      <ProductsIntro category={category} />
      <ProductControls />
      <ProductList filteredProducts={displayedProducts} />
    </Container>
  );
};
