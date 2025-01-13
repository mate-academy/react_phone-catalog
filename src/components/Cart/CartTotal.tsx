import { useAppContext } from "../../context/AppContext";

const CartTotal = () => {
  const { shoppingCart } = useAppContext();
  const totalPrice = shoppingCart.reduce((a, b) => a + b.quantity * b.price, 0);
  const totalItem = shoppingCart.reduce((a, b) => a + b.quantity, 0);

  return (
    <div className="h-fit rounded-2xl border-1 border-elem p-6">
      <div className="text-center">
        <h3>{`$${totalPrice}`}</h3>
        <p className="text-bodyText text-sec">Total for {totalItem} items</p>
      </div>
      <hr className="my-4 border-elem"></hr>
      <button className="mx-auto grid w-full place-items-center rounded-lg bg-accent py-4 text-white small:w-[max(20dvw,320px)]">
        Checkout
      </button>
    </div>
  );
};

export default CartTotal;
