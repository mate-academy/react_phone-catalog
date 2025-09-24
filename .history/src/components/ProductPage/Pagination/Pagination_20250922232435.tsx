import React from 'react';

type Props = {
  page: number;
  pagesCount: number;
  onPrev: () => void;
  onNext: () => void;
  onSelect: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  page,
  pagesCount,
  onPrev,
  onNext,
  onSelect,
}) => {
  if (pagesCount <= 1) return null;

  const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);

  return (
    <div>
      <button onClick={onPrev} disabled={page <= 1}>
        Prev
      </button>
      {pages.map(p => (
        <button key={p} onClick={() => onSelect(p)} disabled={p === page}>
          {p}
        </button>
      ))}
      <button onClick={onNext} disabled={page >= pagesCount}>
        Next
      </button>
    </div>
  );
};
