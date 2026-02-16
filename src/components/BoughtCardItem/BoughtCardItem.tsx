import React, { useEffect, useState } from 'react';
import { Product } from '../../types/ProductTypes';
import styles from './BoughtCardItem.module.scss';
import { useNavigate } from 'react-router-dom';
import DeleteLight from '../../assets/icons/closeLight.svg';
import { useTheme } from '../Themes/Themes';
import minusGray from '../../assets/icons/minusGray.svg';
import minusLight from '../../assets/icons/minusLight.svg';
import plus from '../../assets/icons/plus.svg';
import plusLight from '../../assets/icons/plusLight.svg';
import grayDelete from '../../assets/icons/grayClose.svg';
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
  const { theme } = useTheme();
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
      <div className={styles.bought}>
        <div
          className={styles.bought__item}
          role="button"
          onClick={() => navigate(productPath)}
        >
          <div className={styles.bought__wrapper}>
            <img
              src={isBasicDark ? grayDelete : DeleteLight}
              alt="delete"
              className={styles.bought__deleteIcon}
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                handleDelete();
                toggleCart(product);
              }}
            />
            <img
              src={product.image}
              alt={product.name}
              className={styles.bought__image}
            />
            <h3 className={styles.bought__title}>{product.name}</h3>
          </div>

          <div className={styles.bought__wrapper2}>
            <div className={styles.bought__button}>
              <button
                className={styles.prevBtn}
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  handleDecrease();
                }}
              >
                <img src={isBasicDark ? minusGray : minusLight} alt="-" />
              </button>
              <span className={styles.bought__num}>{quantity}</span>
              <button
                className={styles.nextBtn}
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  handleIncrease();
                }}
              >
                <img src={isBasicDark ? plus : plusLight} alt="+" />
              </button>
            </div>
            <p className={styles.bought__price}>{`$${totalPriceOne}`}</p>
          </div>
        </div>
      </div>
    </>
  );
};
