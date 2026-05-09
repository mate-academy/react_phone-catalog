import classNames from 'classnames';
import styles from './Pagination.module.scss';

interface Props {
  total: number;
  perPage: number;
  current: number;
  onChange: (page: number) => void;
}

export const Pagination = ({ total, perPage, current, onChange }: Props) => {
  const pageCount = Math.max(1, Math.ceil(total / perPage));
  if (pageCount <= 1) return null;

  const pages: number[] = [];
  const window = 2;
  const start = Math.max(1, current - window);
  const end = Math.min(pageCount, current + window);
  for (let i = start; i <= end; i++) pages.push(i);

  const Btn = ({
    label,
    page,
    disabled,
    active,
  }: {
    label: React.ReactNode;
    page: number;
    disabled?: boolean;
    active?: boolean;
  }) => (
    <li>
      <button
        type="button"
        disabled={disabled}
        onClick={() => onChange(page)}
        className={classNames(styles.btn, {
          [styles.btnActive]: active,
        })}
      >
        {label}
      </button>
    </li>
  );

  return (
    <nav>
      <ul className={styles.list}>
        <Btn
          label="‹"
          page={current - 1}
          disabled={current === 1}
        />
        {start > 1 && (
          <>
            <Btn label={1} page={1} />
            {start > 2 && <li className={styles.dots}>…</li>}
          </>
        )}
        {pages.map(p => (
          <Btn key={p} label={p} page={p} active={p === current} />
        ))}
        {end < pageCount && (
          <>
            {end < pageCount - 1 && <li className={styles.dots}>…</li>}
            <Btn label={pageCount} page={pageCount} />
          </>
        )}
        <Btn
          label="›"
          page={current + 1}
          disabled={current === pageCount}
        />
      </ul>
    </nav>
  );
};
