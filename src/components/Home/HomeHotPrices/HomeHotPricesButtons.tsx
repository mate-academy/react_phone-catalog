import ArrowLeft from "../../../assets/icons/ArrowLeft";
import ArrowRight from "../../../assets/icons/ArrowRight";
import { useAppContext } from "../../../context/AppContext";
import { Item } from "../../../types/item";

type Props = {
  curElem: number;
  itemsList: Item[];
  handleStateChangeCurElem: (
    number: number | ((prev: number) => number),
  ) => void;
};

const HomeHotPricesButtons = ({
  curElem,
  itemsList,
  handleStateChangeCurElem,
}: Props) => {
  const { colors } = useAppContext();
  const firstElem = 0;
  const lastElem = itemsList.length - 4;
  const { icon, primary } = colors;

  const handleClickNextEl = () => {
    if (curElem === 0) {
      return;
    }

    handleStateChangeCurElem((prev: number) => prev - 1);
  };

  const handleClickPrevEl = () => {
    if (curElem === lastElem) {
      return;
    }

    handleStateChangeCurElem((prev: number) => prev + 1);
  };

  return (
    <section className="flex items-center justify-center gap-4">
      <button
        onClick={handleClickNextEl}
        className={`grid size-8 place-items-center rounded-full border-1 duration-150 ${curElem === firstElem ? "border-elem" : "border-icon"}`}
      >
        <ArrowLeft fill={curElem === firstElem ? icon : primary} />
      </button>
      <button
        onClick={handleClickPrevEl}
        className={`grid size-8 place-items-center rounded-full border-1 duration-150 ${curElem === lastElem ? "border-elem" : "border-icon"}`}
      >
        <ArrowRight fill={curElem === lastElem ? icon : primary} />
      </button>
    </section>
  );
};

export default HomeHotPricesButtons;
