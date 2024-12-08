/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Item } from "../../types/itemDetail";
import { useAppContext } from "../../context/AppContext";
import Heart from "../../assets/icons/Heart";
import ItemDetailImages from "./ItemDetailImages";
import ItemDetailColors from "./ItemDetailColors";
import ItemDetailCapacity from "./ItemDetailCapacity";

const mainSpecs = [
  { name: "Screen", option: "screen" },
  { name: "Resolution", option: "resolution" },
  { name: "Processor", option: "processor" },
  { name: "RAM", option: "ram" },
];

const fullSpecs: { name: string; option: keyof Item }[] = [
  { name: "Screen", option: "screen" },
  { name: "Resolution", option: "resolution" },
  { name: "Processor", option: "processor" },
  { name: "RAM", option: "ram" },
  { name: "Built in memory", option: "capacity" },
  { name: "Camera", option: "camera" },
  { name: "Zoom", option: "zoom" },
  { name: "Cell", option: "cell" },
];

const ItemDetail = () => {
  const {
    shoppingCart,
    favorite,
    colors,
    handleAddFavoriteItem,
    handleRemoveFavoriteItem,
    handleAddProductShop,
    handleRemoveProductShop,
    productsList,
  } = useAppContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { primary, secAccent } = colors;
  const { idItem } = useParams();
  const navigate = useNavigate();
  const productType = useLocation().pathname.split("/")[1];
  const [data, setData] = useState<Item[]>([]);
  const [itemInfo, setItemInfo] = useState<Item | null>(null);
  const [chosenImage, setChosenImage] = useState<number>(0);
  const findItem = productsList.find((item) => item.itemId === itemInfo?.id);

  const isInShoppingCart = shoppingCart.find(
    (el) => el.itemId === itemInfo?.id,
  );

  const isInFavorite = favorite.find((el) => el.itemId === itemInfo?.id);

  const details = async () => {
    setIsLoading(true);
    try {
      const dataResponse = await fetch(
        `/react_phone-catalog/api/${productType}.json`,
      );

      if (!dataResponse.ok) {
        throw new Error("Network response was not ok");
      }

      const dataProducts: Item[] = await dataResponse.json();
      console.log("Fetched data:", dataProducts);

      setData(dataProducts);
      const foundItem = dataProducts.find((item) => item.id === idItem);
      if (foundItem) {
        setItemInfo(foundItem);
      } else {
        console.error(`Item with id ${idItem} not found.`);
      }
    } catch (err) {
      console.error("Error fetching data: ", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    details();
    setChosenImage(0);
  }, []);

  const handleClickChangePhoto = (i: number) => {
    setChosenImage(i);
  };

  const handleClickChangeColor = (color: string) => {
    setItemInfo(
      (prev) =>
        data.find(
          (item) =>
            item.color === color &&
            prev?.namespaceId === item.namespaceId &&
            item.capacity === prev.capacity,
        ) || null,
    );
  };

  const handleClickChangeCapacity = (capacity: string) => {
    setItemInfo(
      (prev) =>
        data.find(
          (item) =>
            item.capacity === capacity &&
            prev?.namespaceId === item.namespaceId &&
            item.color === prev.color,
        ) || null,
    );
  };

  useEffect(() => {
    return navigate(`/${productType}/${itemInfo?.id}`);
  }, [itemInfo]);

  const handleClickFavorite = () => {
    if (findItem) {
      return isInFavorite
        ? handleRemoveFavoriteItem(findItem.id)
        : handleAddFavoriteItem(findItem);
    }

    return;
  };
  1;

  const handleClickShop = () => {
    if (findItem) {
      return isInShoppingCart
        ? handleRemoveProductShop(findItem.id)
        : handleAddProductShop(findItem);
    }

    return;
  };

  return isLoading ? (
    <h2>Loading...</h2>
  ) : (
    <section className="mb-20 flex w-full flex-col gap-20 pt-6 small:pt-8 desktop:pt-16">
      <h2>{itemInfo?.name}</h2>
      <section className="grid gap-10 small:grid-cols-2 small:gap-4">
        {itemInfo && (
          <ItemDetailImages
            currentImage={itemInfo.images[chosenImage]!}
            images={itemInfo.images}
            chosenImage={chosenImage}
            onClick={handleClickChangePhoto}
          />
        )}
        <div>
          {itemInfo && (
            <>
              <ItemDetailColors
                item={itemInfo}
                colors={itemInfo.colorsAvailable.sort()}
                onClick={handleClickChangeColor}
              />
              <hr className="my-6 border-elem"></hr>
              <ItemDetailCapacity
                item={itemInfo}
                capacities={itemInfo.capacityAvailable}
                onClick={handleClickChangeCapacity}
              />
              <hr className="my-6 border-elem"></hr>
            </>
          )}

          <div className="flex flex-col gap-8">
            <section className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <h2>${itemInfo?.priceDiscount}</h2>
                <h3 className="text-sec line-through">
                  ${itemInfo?.priceRegular}
                </h3>
              </div>
              <div className="grid w-full grid-cols-[1fr_auto] justify-between gap-2">
                <button
                  onClick={handleClickShop}
                  className={`h-10 rounded-lg text-bodyText duration-300 hover:shadow-buttonHover ${isInShoppingCart ? "border-1 border-elem bg-white text-accent" : "bg-accent text-white"}`}
                >
                  {isInShoppingCart ? "Added to cart" : "Add to cart"}
                </button>
                <button
                  onClick={handleClickFavorite}
                  className="grid aspect-square h-10 place-items-center rounded-full border-1 border-icon duration-300 hover:border-primary"
                >
                  <Heart
                    fill={!isInFavorite ? primary : secAccent}
                    isFilled={!!isInFavorite}
                  />
                </button>
              </div>
            </section>
            <section className="flex flex-col gap-2">
              {itemInfo &&
                mainSpecs.map((spec) => (
                  <div className="flex justify-between" key={spec.name}>
                    <p className="text-smallText text-sec">{spec.name}</p>
                    <p className="text-smallText">{itemInfo[spec.option]}</p>
                  </div>
                ))}
            </section>
          </div>
        </div>
      </section>
      <section className="grid grid-cols-1 gap-14 small:gap-16 desktop:grid-cols-2">
        <div>
          <h3>About</h3>
          <hr className="my-6 border-elem"></hr>
          <section className="grid gap-8">
            {itemInfo?.description.map((text) => (
              <article className="flex flex-col gap-4" key={text.title}>
                <h4 key={text.title}>{text.title}</h4>
                <p className="text-bodyText text-sec">{text.text}</p>
              </article>
            ))}
          </section>
        </div>
        <div>
          <h3>Tech specs</h3>
          <hr className="my-6 border-elem"></hr>
          <section className="grid gap-2">
            {itemInfo &&
              fullSpecs.map((spec) =>
                itemInfo[spec.option as keyof Item] ? (
                  <div className="flex justify-between" key={spec.name}>
                    <p className="text-bodyText text-sec">{spec.name}</p>
                    <p className="text-bodyText">
                      {spec.option === "cell"
                        ? itemInfo[spec.option].join(", ")
                        : itemInfo[spec.option]}
                    </p>
                  </div>
                ) : (
                  <></>
                ),
              )}
          </section>
        </div>
      </section>
    </section>
  );
};

export default ItemDetail;
