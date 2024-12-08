import { Product } from "../../types/product";
import Select from "../Select";

const optionsItems = ["4", "8", "16", "All"];
const optionsSorted = ["Newest", "Alphabet", "Cheaper", "Expensive"];

type Props = {
  name: string;
  itemList: Product[];
  onChangeItemPerPage: (value: string) => void;
  onChangeSortBy: (value: string) => void;
  currentSortBy: string;
  currentItemPerPage: string;
};

const ProductHeader = ({
  name,
  itemList,
  onChangeItemPerPage,
  onChangeSortBy,
  currentSortBy,
  currentItemPerPage,
}: Props) => {
  return (
    <section className="flex flex-col gap-14">
      <section className="flex flex-col gap-2">
        <h1>{name}</h1>
        <p className="text-bodyText text-sec">{`${itemList.length} models`}</p>
      </section>
      <div className="flex justify-between gap-6 small:justify-normal">
        <Select
          localStorage={name + "Items"}
          name="Items on page:"
          options={optionsItems}
          selectedOption={currentItemPerPage}
          onChange={onChangeItemPerPage}
        />
        <Select
          localStorage={name + "Sort"}
          name="Sort by:"
          options={optionsSorted}
          selectedOption={currentSortBy}
          onChange={onChangeSortBy}
        />
      </div>
    </section>
  );
};

export default ProductHeader;
