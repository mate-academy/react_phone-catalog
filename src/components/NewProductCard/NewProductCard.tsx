import { useEffect, useState } from 'react';
import { getProducts } from '../../api/api';
import { Product } from '../../types/ProductTypes';
import { ProductsSlider } from '../ProductSlider/ProductSlider';


export const NewestProducts = () => {
  const [newestProducts, setNewestProducts] = useState<Product[]>([]);
  const [name, setName] = useState<string>('')

  useEffect(() => {
    getProducts().then(products => {
      const sorted = [...products].sort((a, b) => b.year - a.year);
      const newest = sorted.slice(0, 13);
      setNewestProducts(newest);
      setName('Brand new models')
    });
  }, []);

  return <ProductsSlider products={newestProducts} name={name} />;
};
