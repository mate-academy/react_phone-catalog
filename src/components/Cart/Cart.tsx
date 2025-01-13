import { useAppContext } from "../../context/AppContext";
import ShoppingCard from "../../UI/ShoppingCard/ShoppingCard";
import CartTotal from "./CartTotal";

const Cart = () => {
  const { shoppingCart } = useAppContext();

  return (
    <section className="mb-20 flex w-full flex-col gap-20 pt-6 small:pt-8 desktop:pt-16">
      <section className="mb-14">
        <h1>Cart</h1>
        {!shoppingCart.length && (
          <p className="text-bodyText text-sec">
            No items in cart =( Sure you can find one
          </p>
        )}
      </section>
      {!!shoppingCart.length && (
        <div>
          <section className="grid grid-rows-[1fr,auto] gap-4 desktop:grid-cols-[auto,1fr] desktop:grid-rows-1">
            <section className="flex flex-col gap-4">
              {shoppingCart.map((item) => (
                <ShoppingCard key={item.id} item={item} />
              ))}
            </section>
            <CartTotal />
          </section>
        </div>
      )}
    </section>
  );
};

export default Cart;
