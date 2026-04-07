import { Link } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';

type BreadcrumbItem = {
  label: string;
  path?: string;
};

type Props = {
  items: BreadcrumbItem[];
};

/* eslint-disable max-len */
const HOME_OUTER_PATH =
  'M7.59.807a.67.67 0 0 1 .82 0l6 4.667c.162.126.257.32.257.526v7.333a2 2 0 0 1-2 2H3.334a2 2 0 0 1-2-2V6c0-.206.094-.4.257-.526zm-4.923 5.52v7.006a.667.667 0 0 0 .667.667h9.333a.666.666 0 0 0 .667-.667V6.326L8 2.178z';
const HOME_INNER_PATH =
  'M5.334 8c0-.368.298-.667.666-.667h4c.368 0 .667.299.667.667v6.667a.667.667 0 1 1-1.333 0v-6H6.667v6a.667.667 0 0 1-1.333 0z';
/* eslint-enable max-len */

const HomeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="none"
    viewBox="0 0 16 16"
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
      d={HOME_OUTER_PATH}
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
      d={HOME_INNER_PATH}
    />
  </svg>
);

const ChevronIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6 4L10 8L6 12"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Breadcrumbs = ({ items }: Props) => {
  return (
    <nav aria-label="Breadcrumb" className={styles.root}>
      <Link to="/" className={styles.home} aria-label="Home">
        <HomeIcon />
      </Link>

      {items.map(item => (
        <div key={item.path ?? item.label} className={styles.item}>
          <span className={styles.chevron}>
            <ChevronIcon />
          </span>

          {item.path ? (
            <Link to={item.path} className={styles.link}>
              {item.label}
            </Link>
          ) : (
            <span className={styles.current}>{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
};
