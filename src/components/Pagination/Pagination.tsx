// src/components/Pagination/Pagination.tsx - Pagination control component
import s from './Pagination.module.scss';

type Props = {
  total: number;
  perPage: number;
  currentPage?: number; // 1-based
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage = 1,
  onPageChange,
}) => {
  const pages = Math.max(1, Math.ceil(total / Math.max(1, perPage)));
  const isFirst = currentPage <= 1;
  const isLast = currentPage >= pages;

  const go = (p: number) => {
    const clamped = Math.min(pages, Math.max(1, p));

    if (clamped !== currentPage) {
      onPageChange(clamped);
    }
  };

  if (pages <= 1) {
    return null;
  }

  return (
    <nav className={s.root} aria-label="Pagination">
      <ul className={s.ul}>
        <li className={`${s.li} ${isFirst ? s.disabled : ''}`}>
          <a
            className={s.a}
            aria-disabled={isFirst}
            onClick={isFirst ? undefined : () => go(currentPage - 1)}
          >
            «
          </a>
        </li>

        {Array.from({ length: pages }, (_, i) => i + 1).map(page => (
          <li
            key={page}
            className={`${s.li} ${page === currentPage ? s.active : ''}`}
          >
            <a className={s.a} onClick={() => go(page)}>
              {page}
            </a>
          </li>
        ))}

        <li className={`${s.li} ${isLast ? s.disabled : ''}`}>
          <a
            className={s.a}
            aria-disabled={isLast}
            onClick={isLast ? undefined : () => go(currentPage + 1)}
          >
            »
          </a>
        </li>
      </ul>
    </nav>
  );
};
