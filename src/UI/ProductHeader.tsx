import { Product } from "../types/product";
import Select from "./Select";

type Props = {
  name: string;
  itemList: Product[];
  localStItems: string;
  optionsItems: string[];
  localStSort: string;
  optionsSorted: string[];
};

const ProductHeader = ({
  name,
  itemList,
  optionsItems,
  optionsSorted,
  localStItems,
  localStSort,
}: Props) => {
  return (
    <section className="flex flex-col gap-14">
      <section className="flex flex-col gap-2">
        <h1>{name}</h1>
        <p className="text-bodyText text-sec">{`${itemList.length} models`}</p>
      </section>
      <div className="flex justify-between gap-6 small:justify-normal">
        <Select
          name="Items on page:"
          options={optionsItems}
          localStoreName={localStItems}
        />
        <Select
          name="Sort by:"
          options={optionsSorted}
          localStoreName={localStSort}
        />
      </div>
    </section>
  );
};

export default ProductHeader;
