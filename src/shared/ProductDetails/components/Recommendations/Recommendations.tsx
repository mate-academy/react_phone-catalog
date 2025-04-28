import React, { useEffect, useState } from 'react';
import { IProductCard } from '../../../../interfaces/ProductCard.interface';
import { ProductService } from '../../../../services/product.service';
import ProductsSlider from '../../../ProductsSlider';

const Recommendations: React.FC<{ productCategory: string }> = ({ productCategory }) => {
  const [products, setProducts] = useState<IProductCard[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (productCategory) {
          const data = await ProductService.getByCategory(productCategory);
          setProducts(data);
        }
      } catch (error) {
        console.error('Error fetching products by category:', error);
      }
    };

    fetchData();
  }, [productCategory]);

  return (
    <ProductsSlider 
      products={products} 
      title='You may also like'
    />
  );
};

export default Recommendations;
