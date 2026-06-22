type Props = {
  total: number;
  perPage: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const pages = Math.ceil(total / perPage);

  const handleChange = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <nav>
      <ul className="pagination">
        <li className={currentPage === 1 ? 'disabled' : ''}>
          <a
            href="#prev"
            aria-disabled={currentPage === 1}
            onClick={e => {
              e.preventDefault();

              if (currentPage > 1) {
                handleChange(currentPage - 1);
              }
            }}
          >
            «
          </a>
        </li>

        {Array.from({ length: pages }, (_, i) => {
          const page = i + 1;

          return (
            <li key={page} className={page === currentPage ? 'active' : ''}>
              <a
                href={`#${page}`}
                onClick={e => {
                  e.preventDefault();
                  handleChange(page);
                }}
              >
                {page}
              </a>
            </li>
          );
        })}

        <li className={currentPage === pages ? 'disabled' : ''}>
          <a
            href="#next"
            aria-disabled={currentPage === pages}
            onClick={e => {
              e.preventDefault();

              if (currentPage < pages) {
                handleChange(currentPage + 1);
              }
            }}
          >
            »
          </a>
        </li>
      </ul>
    </nav>
  );
};
