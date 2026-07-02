// import { useState } from 'react';
import { useAdd } from '../../context/AddCartContext';
import style from './AddButton.module.scss';
import classNames from 'classnames';

// import { useFavorites } from '../../context/FavoritesContext';

interface AddButtonProps {
  product: CartItem;
}

// export const AddButton = ({ product }: { product: ProductCardType }) => {
//   const { addToCart } = useAdd();

//   const { cartItems, toggleAdd } = useAdd();
//   const isAdd = cartItems.some(item => item.id === id);

//   const handleAddClick = (e: React.MouseEvent) => {
//     e.preventDefault(); // ← Предотврати переход по ссылке
//     e.stopPropagation(); // ← Останови всплытие события
//     // toggleAdd(id); // ← Вызови функцию избранного
//     addToCart({
//       id: product.id,
//       name: product.name,
//       image: product.image,
//       price: product.price,
//       quantity: 1,
//     });
//   };

//   return (
//     <button
//       className={classNames(style.icon_btn, {
//         [style.icon_btn_active]: isAdd,
//       })}
//       onClick={handleAddClick}
//       title={isAdd ? 'Remove from cart' : 'Add to cart'}
//     >
//       Add to cart
//     </button>
//   );
// };

export const AddButton = ({ product }: AddButtonProps) => {
  const { addToCart, cartItems } = useAdd();

  // Проверяем, есть ли уже товар в корзине по ID
  const isAdd = cartItems.some(item => item.id === product.id);

  const handleAddClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart(product);
  };

  return (
    <button
      className={classNames(style.icon_btn, { [style.icon_btn_active]: isAdd })}
      onClick={handleAddClick}
    >
      {isAdd ? 'Added' : 'Add to cart'}
    </button>
  );
};
