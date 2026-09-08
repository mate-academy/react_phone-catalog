import React, { useState, useContext, useEffect } from 'react';
import { Product } from '../../types/ProductTipes';
import Dlt from '../../img/close.svg';
import DltLight from '../../img/closeLight.svg';
import minus from '../../img/minus.svg';
import minusLight from '../../img/minusLight.svg';
import plusLight from '../../img/plusLight.svg';
import plus from '../../img/plus.svg';
import './BougthCardItem.scss';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../Themes/Themes';
import { useCart } from '../BoughtCard/CartContext';

interface Props {
  product: Product;
  onDelete: (productId: string) => void;
  onUpdate: (productId: string, quantity: number) => void;
}

export const BoughtCardItem: React.FC<Props> = ({
  product,
  onDelete,
  onUpdate,
}) => {
  const navigate = useNavigate();
  const { toggleCart } = useCart();

  const savedQuantity = parseInt(
    localStorage.getItem(`quantity-${product.id}`) || '1',
  );
  const [quantity, setQuantity] = useState(savedQuantity);

  useEffect(() => {
    localStorage.setItem(`quantity-${product.id}`, quantity.toString());

    onUpdate(product.id.toString(), quantity);
  }, [product.id, quantity, onUpdate]); // onUpdate here is questionable;

  const handleDelete = () => {
    onDelete(product.id.toString());
    localStorage.removeItem(`quantity-${product.id}`);
  };

  const handleIncrease = () => {
    const newQuant = quantity + 1;

    setQuantity(newQuant);
    onUpdate(product.id.toString(), newQuant);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      const newQuant = quantity - 1;

      setQuantity(newQuant);
      onUpdate(product.id.toString(), newQuant);
    }
  };

  const totalPriceOne = product.fullPrice * quantity;
  const productPath = `/${product.category}/${product.itemId}`;

  const { theme } = useContext(ThemeContext);
  const isBasicDark = theme === 'dark';

  return (
    <>
      <div className="bought">
        <div
          className="bought__item"
          role="button"
          onClick={() => navigate(productPath)}
        >
          <div className="bought__wrapper">
            <img
              src={isBasicDark ? Dlt : DltLight}
              alt="delete"
              className="deleteIcon"
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                handleDelete();
                toggleCart(product);
              }}
            />
            <img
              src={product.image}
              alt={product.name}
              className="bought__image"
            />
            <h3 className="bought__title">{product.name}</h3>
          </div>

          <div className="bought__wrapper2">
            <div className="bought__button">
              <button
                className="prevBtn"
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  handleDecrease();
                }}
              >
                <img src={isBasicDark ? minus : minusLight} alt="-" />
              </button>

              <span className="bought__num">{quantity}</span>
              <button
                className="nextBtn"
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  handleIncrease();
                }}
              >
                <img src={isBasicDark ? plus : plusLight} alt="+" />
              </button>
            </div>
            <p className="bought__price">{`$${totalPriceOne}`}</p>
          </div>
        </div>
      </div>
    </>
  );
};
