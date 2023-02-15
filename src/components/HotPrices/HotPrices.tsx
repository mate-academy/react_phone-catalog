import { useEffect, useState } from 'react';
import { getProducts } from '../../api/products';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard/ProductCard';
import { ProductsSlider } from '../ProductsSlider/ProductsSlider';
import './HotPrices.scss';

export const HotPrices: React.FC = () => {
  const [hotPricesPosition, setHotPricesPosition] = useState<number>(0);
  const [hotPricesProducts, setHotPricesProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const getHotPriceProducts
          = (await getProducts()).filter(item => item.discount > 0);

        setHotPricesProducts(getHotPriceProducts.sort((a, b) => b.discount
        * b.price - a.discount * a.price));
      } catch {
        setError('We can not load products with discount.');
      }
    };

    loadData();
  }, []);

  const prevItem = () => {
    return setHotPricesPosition((current) => current - 288);
  };

  const nextItem = () => {
    return setHotPricesPosition((current) => current + 288);
  };

  if (error) {
    return null;
  }

  return (
    <div className="hotPrices">
      <ProductsSlider
        name="Hot prices"
        sliderPosition={hotPricesPosition}
        itemsAmount={hotPricesProducts.length}
        prevItem={prevItem}
        nextItem={nextItem}
      />

      <ul
        className="hotPrices__cards"
        style={{
          transform: `translateX(-${hotPricesPosition}px)`,
        }}
      >
        {hotPricesProducts.map(product => (
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
