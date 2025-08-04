import buttonStyles from './AddToCardButton.module.scss';
import { useCart } from '../../context/CartContext';
import cn from 'classnames';
import { Products } from '../../types/types';

interface Props {
  gadget: Products;
}

const AddToCardButton: React.FC<Props> = ({ gadget }) => {
  const { cartItems, setCartItems } = useCart();

  const handleAddToCart = (product: Products) => {
    const existing = cartItems.find(item => item.itemId === product.itemId);

    if (existing) {
      const filteredProducts = cartItems.filter(
        item => item.itemId !== product.itemId,
      );

      setCartItems(filteredProducts);
      localStorage.setItem('added', JSON.stringify(filteredProducts));
    } else {
      const newProduct = { ...product, quantity: 1 };
      const allGadgets = [...cartItems, newProduct];

      setCartItems(allGadgets);
      localStorage.setItem('added', JSON.stringify(allGadgets));
    }
  };

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
          handleAddToCart(gadget);
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
