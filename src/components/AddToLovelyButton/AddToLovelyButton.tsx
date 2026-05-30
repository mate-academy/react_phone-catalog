import { useCart } from '../../context/CartContext';
import buttonStyles from './AddToLovelyButton.module.scss';
import cn from 'classnames';
import { Products } from '../../types/types';
import React from 'react';

interface Props {
  gadget: Products;
}

const AddToLovelyButton: React.FC<Props> = ({ gadget }) => {
  const { addProductToLovely, lovelyProducts } = useCart();

  return (
    <>
      <button
        className={cn(buttonStyles['list__lovely-choice'], {
          [buttonStyles['list__lovely-choice--active']]: lovelyProducts.some(
            item => item.itemId === gadget.itemId,
          ),
        })}
        onClick={event => {
          event.preventDefault();
          addProductToLovely(gadget);
        }}
      ></button>
    </>
  );
};

export default AddToLovelyButton;
