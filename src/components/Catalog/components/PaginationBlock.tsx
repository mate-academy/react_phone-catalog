import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

type Props = {
  safePage: number;
  handleChangeArrow: (value: 'prev' | 'next') => void;
  visiblePages: number[];
  handleChangeNumber: (value: number) => void;
  totalPages: number;
};

export const PaginationBlock = ({
  safePage,
  handleChangeArrow,
  visiblePages,
  handleChangeNumber,
  totalPages,
}: Props) => {
  return (
    <div className="col-span-full flex justify-center mb-6">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(event) => {
                event.preventDefault();

                if (safePage > 1) {
                  handleChangeArrow('prev');
                }
              }}
            />
          </PaginationItem>
          {visiblePages.map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                isActive={safePage === page}
                onClick={(event) => {
                  event.preventDefault();
                  handleChangeNumber(page);
                }}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(event) => {
                event.preventDefault();

                if (safePage < totalPages) {
                  handleChangeArrow('next');
                }
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
