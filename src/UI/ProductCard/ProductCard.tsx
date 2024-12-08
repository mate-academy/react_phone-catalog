import { NavLink } from "react-router-dom";
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
  const {
    colors,
    favorite,
    handleAddFavoriteItem,
    handleRemoveFavoriteItem,
    handleAddProductShop,
    handleRemoveProductShop,
    shoppingCart,
  } = useAppContext();
  const { primary, secAccent } = colors;
  const {
    name,
    image,
    price,
    ram,
    screen,
    capacity,
    fullPrice,
    category,
    itemId,
  } = product;
  const isInFavorite = favorite.find((el) => el === product);
  const isInShoppingCart = shoppingCart.find((el) => el.id === product.id);

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

  const handleClickFavorite = (item: Product) => {
    isInFavorite
      ? handleRemoveFavoriteItem(item.id)
      : handleAddFavoriteItem(item);
  };

  const handleClickShoppingCart = (item: Product) => {
    isInShoppingCart
      ? handleRemoveProductShop(item.id)
      : handleAddProductShop(item);
  };

  return (
    <div
      className={`${isSlider ? "w-cardSmall small:w-card" : "w-auto"} flex flex-shrink-0 flex-col items-center justify-center gap-2 rounded-lg border-1 border-elem p-8 duration-300 hover:shadow-xl`}
    >
      <picture className="w-fit">
        <NavLink to={`/${category}/${itemId}`}>
          <img
            src={image}
            alt=""
            className="size-52 object-contain duration-300 hover:scale-105"
          />
        </NavLink>
      </picture>
      <span className="line-clamp-2 min-h-16 w-full text-balance pt-4 text-bodyText">
        {name}
      </span>

      <div className="flex w-full justify-start gap-2">
        {isSectHP ? (
          <>
            <h3>${price}</h3>
            <h3 className="font-normal text-sec line-through">${fullPrice}</h3>
          </>
        ) : (
          <h3>${fullPrice}</h3>
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
        <button
          className={`h-10 rounded-lg text-bodyText duration-300 hover:shadow-buttonHover ${isInShoppingCart ? "border-1 border-elem bg-white text-accent" : "bg-accent text-white"}`}
          onClick={() => handleClickShoppingCart(product)}
        >
          {isInShoppingCart ? "Added to cart" : "Add to cart"}
        </button>
        <button
          onClick={() => handleClickFavorite(product)}
          className="grid aspect-square h-10 place-items-center rounded-full border-1 border-icon duration-300 hover:border-primary"
        >
          <Heart
            fill={!isInFavorite ? primary : secAccent}
            isFilled={!!isInFavorite}
          />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
