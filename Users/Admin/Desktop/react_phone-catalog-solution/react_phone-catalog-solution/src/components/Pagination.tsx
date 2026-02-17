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
  const pages = Math.ceil(total / perPage);

  if (pages <= 1) {
    return null;
  }

  return (
    <div className="pagination">
      {Array.from({ length: pages }, (_, i) => i + 1).map(p => (
        <button
          key={p}
          onClick={() => onChange(p)}
          disabled={p === current}
        >
          {p}
        </button>
      ))}
    </div>
  );
};