import './SliderProducts.scss';
import { ProductCard } from '../ProductCard/ProductCard';
import { useEffect, useState } from 'react';
import { GetProducts } from '../../services/GetProducts';
import { Product } from '../../types/Product';
import classNames from 'classnames';

type Props = {
  title: string;
};

export const SliderProducts: React.FC<Props> = ({ title }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [startIndex, setStartIndex] = useState(0);

  const shuffleArray = (array: Product[]) => {
    const arr = [...array];

    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr;
  };

  useEffect(() => {
    GetProducts().then(data => {
      let filtered = data;

      if (title === 'brand new models') {
        filtered = data.filter(d => d.price > 1300);
      }

      const shuffled = shuffleArray(filtered);

      setProducts(shuffled.slice(0, 20));
    });
  }, [title]);

  const handleNext = () => {
    if (startIndex < products.length - 4) {
      setStartIndex(prev => prev + 1);
    }
  };

  const handlePrevios = () => {
    if (startIndex > 0) {
      setStartIndex(prev => prev - 1);
    }
  };

  return (
    <div className="slider-products">
      <div className="slider-products__wrapper">
        <div className="slider-products__icon-wrapper">
          <h2 className="slider-products__title">{title}</h2>
          <div className="slider-products__slide-icons">
            <img
              src="/img/ui-kit/Slider-button-small-right.png"
              alt="slider-button"
              className={classNames(
                'slider-products__slide-icon',
                'slider-products__slide-icon--left',
                { 'slider-products__slide-icon--disabled': startIndex === 0 },
              )}
              onClick={handlePrevios}
            ></img>

            <img
              src="/img/ui-kit/Slider-button-small-right.png"
              alt="slider-button"
              className={classNames('slider-products__slide-icon', {
                'slider-products__slide-icon--disabled':
                  startIndex >= products.length - 4,
              })}
              onClick={handleNext}
            ></img>
          </div>
        </div>

        <div className="slider-products__products">
          {products.slice(startIndex, startIndex + 4).map(product => (
            <div key={product.id} className="slider-products__product-wrapper">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
