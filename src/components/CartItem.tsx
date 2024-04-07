import { twMerge } from 'tailwind-merge';
import { Product } from '../types/products';
import closeIcon from '../images/icons/close.svg';
import { useLocalStorage } from 'usehooks-ts';
import { toggleObjectInArrayById } from '../helpers/functions';
import * as cartTypes from '../types/cart';
import { QuantityButton } from './QuantityButton';
import { useNavigate } from 'react-router-dom';

interface Props {
  card: Product;
  className?: string;
}

export const CartItem: React.FC<Props> = ({ card, className }) => {
  const [cart, setCart] = useLocalStorage<cartTypes.CartItem[]>('cart', []);
  const navigate = useNavigate();
  const storageItemIndex = cart.findIndex(i => i.id === card.id);
  const storageItem = cart.find(i => i.id === card.id);
  const storageItemQuantity = storageItem?.quantity || 1;

  const handleQuantityChange = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    const updatedItems = [...cart];
    const item = updatedItems[storageItemIndex];

    item.quantity =
      e.currentTarget.name === 'Decrease'
        ? storageItemQuantity - 1
        : storageItemQuantity + 1;
    setCart(updatedItems);
  };

  return (
    <article
      className={twMerge(
        `flex w-full flex-col gap-4 border border-elements
        p-4 md:flex-row md:justify-between`,
        className,
      )}
    >
      <div className="flex items-center gap-4 md:gap-6">
        <img
          className="cursor-pointer"
          onClick={() => setCart(toggleObjectInArrayById(cart, card.id))}
          src={closeIcon}
          alt="Close"
        />
        <img
          className="aspect-square w-20 cursor-pointer
          object-contain p-2 transition hover:scale-110"
          onClick={() => navigate(`/product/${card.itemId}`)}
          src={card.image}
          alt={card.itemId}
        />
        <p>{card.name}</p>
      </div>
      <div className="flex items-center justify-between md:gap-6">
        <div className="flex items-center gap-3.5">
          <QuantityButton
            type="Decrease"
            name="Decrease"
            disabled={storageItemQuantity <= 1}
            onClick={handleQuantityChange}
          />

          <p>{storageItemQuantity}</p>

          <QuantityButton
            type="Increase"
            name="Increase"
            onClick={handleQuantityChange}
          />
        </div>

        <h3>${storageItemQuantity * card.price}</h3>
      </div>
    </article>
  );
};
