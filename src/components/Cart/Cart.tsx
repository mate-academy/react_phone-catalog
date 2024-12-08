import { useAppContext } from "../../context/AppContext";
import ShoppingCard from "../../UI/ShoppingCard/ShoppingCard";
import CartTotal from "./CartTotal";

const Cart = () => {
  const { shoppingCart } = useAppContext();

  return (
    <section className="mb-20 flex w-full flex-col gap-20 pt-6 small:pt-8 desktop:pt-16">
      <h1 className="mb-14">Cart</h1>
      <div className="">
        <section className="flex flex-col gap-4 small:flex-row">
          <section className="flex flex-col gap-4">
            {shoppingCart.map((item) => (
              <ShoppingCard key={item.id} item={item} />
            ))}
          </section>
          <CartTotal />
        </section>
      </div>
    </section>
  );
};

export default Cart;
