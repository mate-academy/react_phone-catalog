import { useEffect, useState } from 'react';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard/ProductCard';
import { getProducts } from '../../api/products';
import { ProductsSlider } from '../ProductsSlider/ProductsSlider';
import './AlsoLike.scss';

type Props = {
  activeProduct: Product;
};

export const AlsoLike: React.FC<Props> = ({ activeProduct }) => {
  const [alsoLikePosition, setAlsoLikePosition] = useState<number>(0);
  const [alsoLikeProducts, setAlsoLikeProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const getSuggestedProducts
          = (await getProducts()).filter(item => item.name
              !== activeProduct.name);

        setAlsoLikeProducts(getSuggestedProducts.sort((a, b) => b.discount
        * b.price - a.discount * a.price));
      } catch {
        setError('We can not load products.');
      }
    };

    loadData();
  }, []);

  const prevItem = () => {
    return setAlsoLikePosition((current) => current - 288);
  };

  const nextItem = () => {
    return setAlsoLikePosition((current) => current + 288);
  };

  if (error) {
    return null;
  }

  return (
    <div className="alsoLike">
      <ProductsSlider
        name="You may also like"
        sliderPosition={alsoLikePosition}
        itemsAmount={alsoLikeProducts.length}
        prevItem={prevItem}
        nextItem={nextItem}
      />

      <ul
        className="alsoLike__cards"
        style={{
          transform: `translateX(-${alsoLikePosition}px)`,
        }}
      >
        {alsoLikeProducts.map(product => (
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
