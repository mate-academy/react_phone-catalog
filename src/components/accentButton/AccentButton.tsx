// AccentButton component
import styles from './AccentButton.module.scss';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../store/context';
import { ProductWithQuantity } from '../../types/ProductWithQuantity';

type Props = {
  text: string;
  onClick?: () => void;
  product?: ProductWithQuantity;
};

export const AccentButton: React.FC<Props> = ({ text, product, onClick }) => {
  const { selectedProducts, setSelectedProducts } = useContext(AppContext);
  const [isSelected, setIsSelected] = useState(false);

  const productId = product?.id;

  useEffect(() => {
    const isProductSelected = selectedProducts.some(
      selectedProduct => selectedProduct.id === productId,
    );

    setIsSelected(isProductSelected);
  }, [selectedProducts, productId]);

  const handleButtonFavorite = () => {
    if (!product) {
      return;
    }

    const productIsSelected = selectedProducts.some(
      item => item.id === product.id,
    );

    let updatedSelectedProducts: ProductWithQuantity[];

    if (productIsSelected) {
      updatedSelectedProducts = selectedProducts.filter(
        item => item.id !== product.id,
      );
    } else {
      const newProduct: ProductWithQuantity = { ...product, quantity: 1 };

      updatedSelectedProducts = [...selectedProducts, newProduct];
    }

    localStorage.setItem(
      'selectedProducts',
      JSON.stringify(updatedSelectedProducts),
    );

    setSelectedProducts(updatedSelectedProducts);
  };

  return (
    <button
      className={`${styles.accentButton} ${isSelected ? styles.accentButton_pressed : ''}`}
      onClick={onClick ? onClick : handleButtonFavorite}
    >
      {!isSelected ? text : 'Added to cart'}
    </button>
  );
};
