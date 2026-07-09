import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { Product } from '../../types/itemTypes';

type Props = {
  product: Product;
};

const CartItem: React.FC<Props> = ({ product }) => {
  const { cart, handleDeleteProduct, handleSubtractProduct, handleAddToCart } =
    useContext(CartContext);

  const productInCart = cart[product.id];

  const totalValue = product.price * productInCart.quantity;

  if (!productInCart) {
    return null;
  }

  return (
    <div
      className="border justify-between gap-4 flex-col font-mont
     border-gray-200 px-6 py-4  sm:gap-6 flex
     sm:flex-row items-center h-40 sm:h-32 sm:w-[752px]"
    >
      <div
        className="flex flex-row justify-between
      gap-4 items-center w-full"
      >
        <button onClick={() => handleDeleteProduct(product.id)}>
          <img src="/img/icons/X button.svg" alt="remove button" />
        </button>
        <img className="size-20" src={product.image} alt="product image" />
        <p className="break-all w-1/2">{product.name}</p>
      </div>
      <div
        className="flex flex-row gap-4 justify-between
       items-center w-full sm:w-fit"
      >
        <div
          className="flex flex-row items-center
        h-8 w-24 justify-around gap"
        >
          <button
            onClick={() => handleSubtractProduct(product.id)}
            className="size-8 border border-gray-400"
          >
            -
          </button>
          <span>{productInCart.quantity}</span>
          <button
            onClick={() => handleAddToCart(product)}
            className="size-8 border border-gray-400"
          >
            +
          </button>
        </div>
        <h2 className="font-bold text-[22px]">${totalValue}</h2>
      </div>
    </div>
  );
};

export default CartItem;
