import Heart from "../../assets/icons/Heart";
import { useAppContext } from "../../context/AppContext";
import { Item } from "../../types/item";
import { itemSpecifics } from "./ProductsCard.data";

type Props = {
  item: Item;
};

const ProductCard = ({ item }: Props) => {
  const { colors } = useAppContext();
  const { primary } = colors;
  const { images, name, ram, screen, capacity, priceRegular, priceDiscount } =
    item;

  const specific = (x: string) => {
    switch (x) {
      case "Screen":
        return screen;
      case "Capacity":
        return capacity;
      default:
        return ram;
    }
  };

  return (
    <div className="flex w-53 flex-col items-center justify-center gap-2 rounded-lg border-1 border-elem p-8 small:w-68">
      <picture className="w-fit">
        <img src={images[0]} alt="" className="size-52 object-contain" />
      </picture>
      <span className="w-full pt-4 text-bodyText">{name}</span>

      <div className="flex w-full justify-start gap-2">
        {priceDiscount ? (
          <>
            <h3 className="text-">${priceDiscount}</h3>
            <h3 className="font-normal text-sec line-through">
              ${priceRegular}
            </h3>
          </>
        ) : (
          <h3 className="text-">${priceRegular}</h3>
        )}
      </div>
      <hr className="w-full border-elem" />
      <div className="w-full">
        {itemSpecifics.map((el) => (
          <article className="flex justify-between">
            <p key={el} className="text-smallText text-sec">
              {el}
            </p>
            <p className="text-smallText uppercase">{specific(el)}</p>
          </article>
        ))}
      </div>
      <div className="grid w-full grid-cols-[1fr_auto] justify-between gap-2">
        <button className="h-10 rounded-lg bg-accent text-bodyText text-white duration-300 hover:text-primary">
          Add to cart
        </button>
        <button className="grid aspect-square h-10 place-items-center rounded-full border-1 border-icon duration-300 hover:border-primary">
          <Heart fill={primary} />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
