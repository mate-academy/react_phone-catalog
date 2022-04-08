import { FunctionComponent, useEffect, useState } from 'react';

// Styles
import './ProductsSlider.scss';

// Types
import { Product } from '../../types/Product';
import { ButtonCallback } from '../../types/ButtonCallback';

// Components
import { Button } from '../Button';
import { ProductsList } from '../ProductsList';

type Props = {
  title: string
  products: Product[];
};

export const ProductsSlider: FunctionComponent<Props> = ({ title, products }) => {
  const [index, setIndex] = useState(0);
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);

  const increaseIndex: ButtonCallback = () => {
    if (index > products.length - 4) {
      setIndex(products.length - 4);

      return;
    }

    setIndex(index + 4);
  };

  const decreaseIndex: ButtonCallback = () => {
    if (index < 0) {
      setIndex(0);

      return;
    }

    setIndex(index - 4);
  };

  useEffect(() => {
    setVisibleProducts([...products].splice(index, 4));
  }, [index]);

  return (
    <div className="ProductsSlider">
      <div className="ProductsSlider__header">
        <h2 className="ProductsSlider__title">{title}</h2>

        <Button
          classModificator="Button--arrowLeft"
          disablet={index === 0}
          callback={decreaseIndex}
        />

        <Button
          classModificator="Button--arrowRight"
          disablet={index === products.length - 4}
          callback={increaseIndex}
        />
      </div>

      <ProductsList products={visibleProducts} />
    </div>
  );
};
