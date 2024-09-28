import Heart from "../../assets/icons/Heart";
import { useAppContext } from "../../context/AppContext";
import { Product } from "../../types/product";
import { itemSpecifics } from "./ProductsCard.data";

type ops = {
  product: Product;
  isSectHP?: boolean;
  isSlider?: boolean;
};

const ProductCard = ({ product, isSectHP, isSlider }: ops) => {
  const { colors } = useAppContext();
  const { primary } = colors;

  const { name, image, price, ram, screen, capacity, fullPrice } = product;

  const specificItem = (x: string) => {
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
    <div
      className={`${isSlider ? "w-53 small:w-69" : "w-auto"} flex flex-shrink-0 flex-col items-center justify-center gap-2 rounded-lg border-1 border-elem p-8 duration-300 hover:shadow-xl`}
    >
      <picture className="w-fit">
        <img
          src={image}
          alt=""
          className="size-52 object-contain duration-300 hover:scale-105"
        />
      </picture>
      <span className="line-clamp-2 min-h-16 w-full text-balance pt-4 text-bodyText">
        {name}
      </span>

      <div className="flex w-full justify-start gap-2">
        {isSectHP ? (
          <>
            <h3 className="text-">${price}</h3>
            <h3 className="font-normal text-sec line-through">${fullPrice}</h3>
          </>
        ) : (
          <h3 className="text-">${fullPrice}</h3>
        )}
      </div>
      <hr className="w-full border-elem" />
      <div className="w-full">
        {itemSpecifics.map((el) => (
          <article className="flex justify-between">
            <p key={el} className="text-smallText text-sec">
              {el}
            </p>
            <p className="text-smallText uppercase">{specificItem(el)}</p>
          </article>
        ))}
      </div>
      <div className="grid w-full grid-cols-[1fr_auto] justify-between gap-2">
        <button className="h-10 rounded-lg bg-accent text-bodyText text-white duration-300 hover:shadow-buttonHover">
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
