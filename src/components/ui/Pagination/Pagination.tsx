import { Button } from '../Button/Button';
import './Pagination.scss';

type Props = {
  pages: number;
  activeIndex: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  pages,
  activeIndex,
  onPageChange,
}: Props) {
  const getVisiblePages = () => {
    const totalVisible = 4;
    const totalPages = Math.ceil(pages);

    if (totalPages <= totalVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    let start = activeIndex - 1;

    if (start < 1) {
      start = 1;
    }

    if (start + totalVisible - 1 > totalPages) {
      start = totalPages - totalVisible + 1;
    }

    return Array.from({ length: totalVisible }, (_, i) => start + i);
  };

  const visiblePages = getVisiblePages();
  const isFirstPage = activeIndex === 1;
  const isLastPage = activeIndex === Math.ceil(pages);

  return (
    <div className="Pagination">
      <div className="Pagination__wrapper">
        <Button
          variant="square"
          icon="arrow-left"
          disabled={isFirstPage}
          onClick={() => onPageChange(activeIndex - 1)}
        />
        <div className="Pagination__pagesCount">
          {visiblePages.map(item => (
            <Button
              variant="square"
              key={item}
              active={activeIndex === item}
              onClick={() => onPageChange(item)}
            >
              {item}
            </Button>
          ))}
        </div>
        <Button
          variant="square"
          icon="arrow-right"
          disabled={isLastPage}
          onClick={() => onPageChange(activeIndex + 1)}
        />
      </div>
    </div>
  );
}
