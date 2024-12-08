import { useAppContext } from "../../context/AppContext";
import { Item } from "../../types/itemDetail";

type Props = {
  item: Item;
  colors: string[];
  onClick: (color: string) => void;
};

const ItemDetailColors = ({ colors, onClick, item }: Props) => {
  const { productColors } = useAppContext();

  return (
    <section className="flex flex-col gap-2">
      <p className="text-bodyText text-sec">Available colors</p>
      <div className="flex gap-2">
        {colors.map((color) => (
          <button
            key={color}
            className={`grid size-8 place-items-center rounded-full outline outline-1 ${color === item.color ? "outline-primary" : "cursor-pointer outline-elem"}`}
            onClick={() => onClick(color)}
          >
            <span
              style={{ backgroundColor: productColors[color] }}
              className="aspect-square size-5/6 rounded-full"
            ></span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default ItemDetailColors;
