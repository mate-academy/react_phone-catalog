import { useEffect, useState } from 'react';
import { HeroSlider } from '../../widgets/HeroSlider/HeroSlider';
import { PageLayout } from '../../shared/PageLayout';
import { Categories } from '../../widgets/Categories';
import { IProduct } from '../../entities/ProductCard/product.interface';
import { ProductsService } from '../../services/ProductsService';
import { ProductCard } from '../../entities/ProductCard/ProductCard';

export const Default = () => {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    ProductsService.getProducts()
      .then(setProducts);
  }, []);

  console.log(products);

  return (
    <PageLayout>
      <HeroSlider />
      <Categories />
      {products.map(product => (
        <ProductCard product={product} />
      ))}
    </PageLayout>
  );
};
