import Heart from "../../assets/icons/Heart";
import { useAppContext } from "../../context/AppContext";
import { Item } from "../../types/item";
import { Product } from "../../types/product";
import { itemSpecifics } from "./ProductsCard.data";

type Props = {
  item?: Item;
  product?: Product;
};

const ProductCard = ({ item, product }: Props) => {
  const { colors } = useAppContext();
  const { primary } = colors;
  const { images, name, ram, screen, capacity, priceRegular, priceDiscount } =
    item!;
  const {
    name: namePr,
    image: imagePr,
    price: pricePr,
    ram: ramPr,
    screen: screenPr,
    capacity: capacityPr,
  } = product!;

  const specificItem = (x: string) => {
    switch (x) {
      case "Screen":
        return item ? screen : screenPr;
      case "Capacity":
        return item ? capacity : capacityPr;
      default:
        return item ? ram : ramPr;
    }
  };

  return (
    <div className="small:w-69 flex w-53 flex-col items-center justify-center gap-2 rounded-lg border-1 border-elem p-8 duration-300 hover:shadow-xl">
      <picture className="w-fit">
        <img
          src={item ? images[0] : imagePr}
          alt=""
          className="size-52 object-contain duration-300 hover:scale-105"
        />
      </picture>
      <span className="w-full pt-4 text-bodyText">{item ? name : namePr}</span>

      <div className="flex w-full justify-start gap-2">
        {item && priceDiscount ? (
          <>
            <h3 className="text-">${priceDiscount}</h3>
            <h3 className="font-normal text-sec line-through">
              ${priceRegular}
            </h3>
          </>
        ) : (
          <h3 className="text-">${priceRegular}</h3>
        )}
        {product && <h3 className="text-">${pricePr}</h3>}
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
        <button className="h-10 rounded-lg bg-accent text-bodyText text-white duration-300 hover:text-icon">
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
