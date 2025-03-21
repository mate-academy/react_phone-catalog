import React, { useEffect, useState } from 'react';
import { ProductDetails } from '../../types/ProductTypes';
import Delete from '../../../image/close.svg';
import './ByCardItem.scss';

interface CartProps {
  product: ProductDetails;
  onDelete: (productId: string) => void;
  onUpdate: (productId: string, quantity: number) => void;
}

export const ByCardItem: React.FC<CartProps> = ({
  product,
  onDelete,
  onUpdate,
}) => {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    onUpdate(product.id, quantity);
  }, [product.id, onUpdate, quantity]);

  const handleDeleteButton = () => {
    onDelete(product.id);
  };

  const handleIncrease = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecrease = () => {
    setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const totalPriceOneProduct = product.priceRegular * quantity;

  return (
    <>
      <div className="buy">
        <div className="buy__item">
          <img
            src={Delete}
            alt="deleteIcon"
            className="buy__deleteIcon"
            onClick={handleDeleteButton}
          />
          <img
            src={product.images[0]}
            alt={product.name}
            className="buy__image"
          />
          <h3>{product.name}</h3>
          <p>{`$${totalPriceOneProduct}`}</p>

          <div className="buy__button">
            <button className="buttonPrev" onClick={handleDecrease}>
              -
            </button>
            <span className="buy__number">{quantity}</span>
            <button className="buttonNext" onClick={handleIncrease}>
              +
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
