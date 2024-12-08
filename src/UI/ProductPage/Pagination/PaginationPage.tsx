type Props = {
  pageNum: number;
  selectedPage: number;
  onChange: (page: number) => void;
};

const PaginationPage = ({ pageNum, selectedPage, onChange }: Props) => {
  const currentPage = pageNum + 1;
  const isSelected = selectedPage === currentPage;

  return (
    <div
      className={`hover: grid size-8 cursor-pointer place-items-center rounded-full border-1 border-elem text-bodyText duration-150 hover:border-primary ${isSelected ? "cursor-default bg-primary text-white" : ""}`}
      onClick={() => onChange(currentPage)}
    >
      {currentPage}
    </div>
  );
};

export default PaginationPage;
