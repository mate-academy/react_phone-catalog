import { useContext, useState } from 'react';
import BackButton from '../components/ui/BackButton';
import CartItem from '../components/ui/CartItem';
import { CartContext, CartProduct } from '../context/CartContext';
import ModalWarning from '../components/ui/ModalWarning';

const CartPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { cart, setCart } = useContext(CartContext);

  const totalInProducts = Object.values(cart).reduce(
    (acc, product) => acc + product.quantity * product.product.price,
    0,
  );

  const totalQuantityInCart = Object.values(cart).reduce(
    (acc, product) => acc + product.quantity,
    0,
  );

  const handleCheckoutConfirmation = () => {
    setCart({});
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <main className="flex flex-col gap-8 w-full h-full px-4 sm:px-6 md:px-8">
      <BackButton />
      <h1 className="text-5xl font-bold">Cart</h1>
      <div className="flex flex-col justify-between md:flex-row gap-4">
        {Object.keys(cart).length === 0 && (
          <h1 className="text-3xl font-bold">Your cart is empty</h1>
        )}

        <section className="flex flex-col gap-4">
          {Object.keys(cart).length > 0 &&
            Object.values(cart).map((cartProduct: CartProduct) => (
              <CartItem
                key={cartProduct.product.id}
                product={cartProduct.product}
              />
            ))}
        </section>
        {/* Ajuste na linha abaixo: Quebra de linha para respeitar o limite de 120 caracteres */}
        <div
          className="flex flex-col p-6 justify-center items-center gap-6 border
          border-gray-200 w-full h-fit lg:w-[23rem] lg:h-52"
        >
          <div className="flex items-center flex-col justify-center">
            <h2 className="text-3xl font-bold">${totalInProducts}</h2>
            <p className="text-sm text-gray-400">
              Total for {totalQuantityInCart} items
            </p>
          </div>
          <div className="card__line-separator"></div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="border w-full h-full bg-black text-white text-sm"
          >
            Checkout
          </button>
        </div>
      </div>
      {isModalOpen && Object.keys(cart).length > 0 && (
        <ModalWarning>
          <div className="p-4 flex flex-col gap-4">
            <p>Are you sure you want to checkout?</p>
            <div className="flex justify-between">
              <button onClick={handleCheckoutConfirmation}>yes</button>
              <button onClick={handleCloseModal}>no</button>
            </div>
          </div>
        </ModalWarning>
      )}
    </main>
  );
};

export default CartPage;
