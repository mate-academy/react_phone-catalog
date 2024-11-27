import { useContext, useEffect, useState } from 'react';
import { Container } from '../components/Container';
import { ProductList } from '../components/ProductList';
import { ProductsIntro } from '../components/ProductsIntro';
import { ProductControls } from '../components/UI/ProductsContols';
import { ProductsContext } from '../store/ProductsContext';
import { Category } from '../types/Category';
import { Product } from '../types/Product';
import { useLocation } from 'react-router-dom';

export const AccessoriesPage = () => {
  const { products, setPage } = useContext(ProductsContext);
  const filteredAccessories = products.filter(
    product => product.category === Category.Accessories,
  );
  const { pathname } = useLocation();

  const [filteredProducts, setFilteredProducts] =
    useState<Product[]>(filteredAccessories);

  const handleSortChange = (sortedProducts: Product[]) => {
    setFilteredProducts(sortedProducts);
  };

  const category = pathname.split('/')[1];

  useEffect(() => {
    setPage(1);
  }, [filteredProducts]);

  return (
    <Container>
      <ProductsIntro category={category}/>
      <ProductControls
        filteredProducts={filteredProducts}
        onSortChange={handleSortChange}
      />
      <ProductList filteredProducts={filteredProducts} category={category} />
    </Container>
  );
};
