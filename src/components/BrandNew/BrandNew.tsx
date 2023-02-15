import { useEffect, useState } from 'react';
import { getProducts } from '../../api/products';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard/ProductCard';
import { ProductsSlider } from '../ProductsSlider/ProductsSlider';
import './BrandNew.scss';

export const BrandNew: React.FC = () => {
  const [brandNewPosition, setBrandNewposition] = useState<number>(0);
  const [brandNew, setBrandNew] = useState<Product[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const getBrandNewProducts
          = (await getProducts()).filter(item => item.discount === 0);

        setBrandNew(getBrandNewProducts.sort((a, b) => b.price - a.price));
      } catch {
        setError('We can not load new products.');
      }
    };

    loadData();
  }, []);

  const prevItem = () => {
    return setBrandNewposition((current) => current - 288);
  };

  const nextItem = () => {
    return setBrandNewposition((current) => current + 288);
  };

  if (error) {
    return null;
  }

  return (
    <div className="brandNew">
      <ProductsSlider
        name="Brand new models"
        sliderPosition={brandNewPosition}
        itemsAmount={brandNew.length}
        prevItem={prevItem}
        nextItem={nextItem}
      />

      <ul
        className="brandNew__cards"
        style={{
          transform: `translateX(-${brandNewPosition}px)`,
        }}
      >
        {brandNew.map(product => (
          <li
            key={product.id}
          >
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
};
