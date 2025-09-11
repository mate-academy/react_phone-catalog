import React, { useContext, useEffect, useState } from 'react';
import { Product } from '../../types/ProductTypes';
import './BoughtCardItem.module.scss';
import { useNavigate } from 'react-router-dom';
import Delete from '../../../public/img/close.svg';
import DeleteLight from '../../../public/img/closeLight.svg';
import { ThemeContext } from '../Themes/Themes';
import minus from '../../../public/img/minus.svg';
import plus from '../../../public/img/plus.svg';
import { useCart } from '../BoughtCart/CartContext';

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
  const { theme } = useContext(ThemeContext);
  const { toggleCart } = useCart();
  const productPath = `/${product.category}/${product.itemId}`;
  const isBasicDark = theme === 'dark';

  const savedQuantity = parseInt(
    localStorage.getItem(`quantity-${product.id}`) || '1',
  );
  const [quantity, setQuantity] = useState(savedQuantity);

  useEffect(() => {
    localStorage.setItem(`quantity-${product.id}`, quantity.toString());
  }, [product.id, quantity, onUpdate]);

  const handleDelete = () => {
    onDelete(product.id.toString());
    localStorage.removeItem(`quantity-${product.id}`);
  };

  const handleIncrease = () => {
    const newQuantity = quantity + 1;

    setQuantity(newQuantity);
    onUpdate(product.id.toString(), newQuantity);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;

      setQuantity(newQuantity);
      onUpdate(product.id.toString(), newQuantity);
    }
  };

  const totalPriceOne = product.fullPrice * quantity;

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
              src={isBasicDark ? Delete : DeleteLight}
              alt="delete"
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
                <img src={minus} alt="-" />
              </button>
              <span className="bought__num">{quantity}</span>
              <button
                className="nextBtn"
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  handleIncrease();
                }}
              >
                <img src={plus} alt="+" />
              </button>
            </div>
            <p className="bought__price">{`$${totalPriceOne}`}</p>
          </div>
        </div>
      </div>
    </>
  );
};
