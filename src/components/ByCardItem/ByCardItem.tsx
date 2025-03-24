import React, { useEffect, useState } from 'react';
import { ProductDetails } from '../../types/ProductTypes';
import Delete from '../../../image/close.svg';
import './ByCardItem.scss';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  const sevedQuantity = parseInt(
    localStorage.getItem(`quantity-${product.id}`) || '1',
  );
  const [quantity, setQuantity] = useState(sevedQuantity);

  useEffect(() => {
    localStorage.setItem(`quantity-${product.id}`, quantity.toString());

    onUpdate(product.id, quantity);
  }, [product.id, onUpdate, quantity]);

  const handleDeleteButton = () => {
    onDelete(product.id);
    localStorage.removeItem(`quantity-${product.id}`);
  };

  const handleIncrease = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecrease = () => {
    setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const totalPriceOneProduct = product.priceRegular * quantity;
  const productPath = `/${product.category}/${product.id}`;

  return (
    <>
      <div className="buy">
        <div className="buy__item" onClick={() => navigate(productPath)}>
          <img
            src={Delete}
            alt="deleteIcon"
            className="buy__deleteIcon"
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              handleDeleteButton();
            }}
          />
          <img
            src={product.images[0]}
            alt={product.name}
            className="buy__image"
          />
          <h3 className="buy__title">{product.name}</h3>
          <p className="buy__price">{`$${totalPriceOneProduct}`}</p>

          <div className="buy__button">
            <button
              className="buttonPrev"
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                handleDecrease();
              }}
            >
              -
            </button>
            <span className="buy__number">{quantity}</span>
            <button
              className="buttonNext"
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                handleIncrease();
              }}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
