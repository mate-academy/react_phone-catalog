import { useContext, useEffect, useState } from 'react';
import { Container } from '../components/Container';
import { ProductList } from '../components/ProductList';
import { ProductsIntro } from '../components/ProductsIntro';
import { ProductControls } from '../components/UI/ProductsContols';
import { ProductsContext } from '../store/ProductsContext';
import { Category } from '../types/Category';
import { Product } from '../types/Product';
import { useLocation } from 'react-router-dom';

export const PhonesPage = () => {
  const { products, setPage } = useContext(ProductsContext);
  const filteredPhones = products.filter(
    product => product.category === Category.Phones,
  );
  const { pathname } = useLocation();

  const [filteredProducts, setFilteredProducts] =
    useState<Product[]>(filteredPhones);

  const handleSortChange = (sortedProducts: Product[]) => {
    setFilteredProducts(sortedProducts);
  };

  const category = pathname.split('/')[1];

  useEffect(() => {
    setPage(1);
  }, [filteredProducts]);

  return (
    <Container>
      <ProductsIntro category={category} />
      <ProductControls
        onSortChange={handleSortChange}
        filteredProducts={filteredProducts}
      />
      <ProductList filteredProducts={filteredProducts} category={category} />
    </Container>
  );
};
