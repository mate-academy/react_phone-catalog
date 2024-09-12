import { Product } from '../../types/product';
import { ProductCard } from '../productCard/productCard';
import { useState, useEffect } from 'react';

type Props = {
  products: Product[];
};

export const Catalog: React.FC<Props> = ({ products }) => {
  const [columsPerItem, setColumsPerItem] = useState(0);
  const updateColumns = () => {
    if (window.innerWidth < 640) {
      setColumsPerItem(4);
    } else if (window.innerWidth < 769) {
      setColumsPerItem(6);
    } else if (window.innerWidth < 1200) {
      setColumsPerItem(4);
    } else {
      setColumsPerItem(6);
    }
  };

  useEffect(() => {
    updateColumns();
    window.addEventListener('resize', updateColumns);

    return () => {
      window.removeEventListener('resize', updateColumns);
    };
  }, []);

  return (
    <div className="catalog">
      {products.map(product => (
        <ProductCard
          showOldPrice={true}
          product={product}
          style={{ gridColumn: `span ${columsPerItem}` }}
          key={product.id}
        />
      ))}
    </div>
  );
};
