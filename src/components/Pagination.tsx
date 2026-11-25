import './Pagination.scss';
import { useSearchParams } from 'react-router-dom';

interface PaginationProps {
  pages: number[];
  setPage: (page: number) => void;
  currentPage: number;
}

const Pagination = ({ pages, setPage, currentPage }: PaginationProps) => {
  const [, setSearchParams] = useSearchParams();

  return (
    <nav className="products__pagination">
      <button
        className="products__link"
        onClick={() => {
          const page = Math.max(currentPage - 1, pages[0]);

          setPage(page);
          setSearchParams({ page: page.toString() });
        }}
      >
        <img
          src={`${import.meta.env.VITE_PUBLIC_URL}/img/chevron-left.svg`}
          alt="chevron left"
        />
      </button>
      {pages.map(p => {
        return (
          <button
            key={p}
            onClick={() => {
              setPage(p);
              setSearchParams({ page: p.toString() });
            }}
            className="products__link"
          >
            {p}
          </button>
        );
      })}
      <button
        className="products__link"
        onClick={() => {
          const page = Math.min(currentPage + 1, pages[pages.length - 1]);

          setPage(page);
          setSearchParams({ page: page.toString() });
        }}
      >
        <img
          src={`${import.meta.env.VITE_PUBLIC_URL}/img/chevron-right.svg`}
          alt="chevron right"
        />
      </button>
    </nav>
  );
};

export default Pagination;
