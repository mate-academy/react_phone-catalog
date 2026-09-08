import buttonStyles from './AddToCardButton.module.scss';
import { useCart } from '../../context/CartContext';
import cn from 'classnames';
import { Products } from '../../types/types';

interface Props {
  gadget: Products;
}

const AddToCardButton: React.FC<Props> = ({ gadget }) => {
  const { cartItems, addToCart } = useCart();

  return (
    <>
      <button
        className={cn(buttonStyles.button__add, {
          [buttonStyles.button__added]: cartItems.some(
            (item: Products) => item.itemId === gadget.itemId,
          ),
        })}
        onClick={event => {
          event.preventDefault();
          addToCart(gadget);
        }}
      >
        {cartItems.some(item => item.itemId === gadget.itemId)
          ? 'Added to cart'
          : 'Add to cart'}
      </button>
    </>
  );
};

export default AddToCardButton;
