import classNames from "classnames";

type Props = {
  pageNum: number;
  selectedPage: number;
  onChange: (page: number) => void;
};

const PaginationPage = ({ pageNum, selectedPage, onChange }: Props) => {
  const isSelected = selectedPage === pageNum;

  return (
    <div
      className={classNames(
        "hover: grid size-8 cursor-pointer place-items-center rounded-full border-1 border-elem text-bodyText duration-150 hover:border-primary",
        { "cursor-default bg-primary text-white": isSelected },
      )}
      onClick={() => onChange(pageNum)}
    >
      {pageNum}
    </div>
  );
};

export default PaginationPage;
