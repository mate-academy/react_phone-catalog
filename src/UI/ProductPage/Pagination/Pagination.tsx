import PaginationPage from "./PaginationPage";

type Props = {
  pages: number;
  selectedPage: number;
  onChange: (page: number) => void;
};

const Pagination = ({ pages, selectedPage, onChange }: Props) => {
  return (
    <section className="flex items-center justify-center gap-2">
      {Array.from({ length: pages }).map((_, i) => (
        <PaginationPage
          key={i}
          pageNum={i}
          selectedPage={selectedPage}
          onChange={onChange}
        />
      ))}
    </section>
  );
};

export default Pagination;
