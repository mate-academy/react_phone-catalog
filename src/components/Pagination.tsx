type Props = {
  total: number;
  perPage: number;
  current: number;
  onChange: (page: number) => void;
};

export const Pagination = ({
  total,
  perPage,
  current,
  onChange,
}: Props) => {
  const totalPages = Math.ceil(total / perPage);

  if (totalPages <= 1) return null;

  const pages: number[] = [];

  const add = (p: number) => {
    if (!pages.includes(p) && p >= 1 && p <= totalPages) {
      pages.push(p);
    }
  };

  add(1);
  add(totalPages);

  for (let i = current - 2; i <= current + 2; i++) {
    add(i);
  }

  pages.sort((a, b) => a - b);

  return (
    <div className="pagination-center">
      {pages.map((p, i) => {
        const prev = pages[i - 1];

        return (
          <span key={p}>
            {prev && p - prev > 1 && <span>...</span>}

            <button
              onClick={() => onChange(p)}
              className={p === current ? 'active-page' : ''}
            >
              {p}
            </button>
          </span>
        );
      })}
    </div>
  );
};