import { Item } from "../../types/itemDetail";

type Props = {
  item: Item;
  capacities: string[];
  onClick: (capacity: string) => void;
};

const ItemDetailCapacity = ({ item, capacities, onClick }: Props) => {
  return (
    <section className="flex flex-col gap-2">
      <p className="text-bodyText text-sec">Select capacity</p>
      <div className="flex gap-2">
        {capacities.map((capacity) => (
          <button
            key={capacity}
            className={`grid place-items-center rounded-md border-1 p-2 text-bodyText ${capacity === item.capacity ? "border-primary bg-primary text-white" : "cursor-pointer border-icon"}`}
            onClick={() => onClick(capacity)}
          >
            {capacity}
          </button>
        ))}
      </div>
    </section>
  );
};

export default ItemDetailCapacity;
