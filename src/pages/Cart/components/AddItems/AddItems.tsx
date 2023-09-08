import { useState } from 'react';
import { IconButton } from '../../../../bits';
import { IconButtonType, Product } from '../../../../types';
import './AddItems.scss';

type Props = {
  totalPrice: number,
  setTotalPrice: (price: number) => void,
  product: Product,
};

export const AddItems: React.FC<Props> = ({
  totalPrice,
  setTotalPrice,
  product,
}) => {
  const [quantity, setQuantity] = useState(1);

  const incQuantity = () => {
    const newPrice = totalPrice + product.price;

    setTotalPrice(newPrice);
    setQuantity(prev => prev + 1);
  };

  const decQuantity = () => {
    const newPrice = totalPrice - product.price;

    setTotalPrice(newPrice);
    setQuantity(prev => prev - 1);
  };

  return (
    <div className="add-items">
      <IconButton
        type={IconButtonType.minus}
        disabled={quantity < 2}
        handler={decQuantity}
      />

      <p className="add-items__quantity">{quantity}</p>

      <IconButton
        type={IconButtonType.plus}
        handler={incQuantity}
      />
    </div>
  );
};
