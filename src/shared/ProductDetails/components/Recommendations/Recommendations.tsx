import React, { useEffect, useState } from 'react';
import { IProductCard } from '../../../../interfaces/ProductCard.interface';
import { ProductService } from '../../../../services/product.service';
import ProductsSlider from '../../../ProductsSlider';

const Recommendations: React.FC<{
  productCategory: string,
}> = ({ productCategory }) => {
  const [products, setProducts] = useState<IProductCard[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      setError('');

      try {
        if (productCategory) {
          const data = await ProductService.getByCategory(productCategory);

          setProducts(data);
        }
      } catch (err) {
        setError('Error fetching products by category');
      }
    };

    fetchData();
  }, [productCategory]);

  return (
    !error && (
      <ProductsSlider
        products={products}
        title='You may also like'
      />
    )
  );
};

export default Recommendations;
