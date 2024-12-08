import { NavLink } from "react-router-dom";
import ArrowLeft from "../../assets/icons/ArrowLeft";
import ArrowRight from "../../assets/icons/ArrowRight";
import Close from "../../assets/icons/Close";
import { useAppContext } from "../../context/AppContext";
import { ShoppingCart } from "../../types/shoppingCart";

type Props = {
  item: ShoppingCart;
};

const ShoppingCard = ({ item }: Props) => {
  const {
    handleRemoveProductShop,
    handleIncreaseQuantityShop,
    handleDecreaseQuantityShop,
  } = useAppContext();
  const { id, img, name, price, quantity, itemId, category } = item;

  return (
    <div className="flex w-full flex-col items-center gap-6 rounded-2xl border-1 border-elem p-6 small:w-fit small:flex-row">
      <section className="flex items-center gap-6">
        <div onClick={() => handleRemoveProductShop(id)}>
          <Close fill="#b4Bdc3" />
        </div>
        <NavLink to={`/${category}/${itemId}`}>
          <img src={img} alt={name} className="size-20 object-contain" />
        </NavLink>
        <p className="w-[min(25dvw,336px)] text-bodyText">{name}</p>
      </section>
      <section className="flex gap-6">
        <div className="flex items-center justify-center gap-6">
          <button
            className={`grid size-8 place-items-center rounded-full border-1 duration-150`}
            onClick={(e) => handleDecreaseQuantityShop(id, e)}
            title="Shift-click for 5 item"
          >
            <ArrowLeft fill={"black"} />
          </button>
          <p className="w-6 text-center text-bodyText">{quantity}</p>
          <button
            className={`grid size-8 place-items-center rounded-full border-1 duration-150`}
            onClick={(e) => handleIncreaseQuantityShop(id, e)}
            title="Shift-click for 5 item"
          >
            <ArrowRight fill={"black"} />
          </button>
        </div>
        <h3 className="w-20 text-right">{`$${quantity * price}`}</h3>
      </section>
    </div>
  );
};

export default ShoppingCard;
