import scss from './Breadcrumbs.module.scss';

interface Props {
  page: string;
}

export const Breadcrumbs: React.FC<Props> = ({ page }) => {
  return (
    <nav className={scss.breadcrumbs} aria-label="Navigation path">
      <ol className={scss.breadcrumbs__path}>
        <li>
          <a href="/" className={scss.breadcrumbs__link}>
            <svg
              className={scss.breadcrumbs__icon}
              aria-hidden="true"
              focusable="false"
            >
              <use href="/icons/icons.svg#home-icon"></use>
            </svg>
          </a>
        </li>
        <li>
          <svg
            className={`${scss.breadcrumbs__icon} ${scss.breadcrumbs__icon_color}`}
            aria-hidden="true"
            focusable="false"
          >
            <use href="/icons/icons.svg#arrow"></use>
          </svg>
        </li>
        <li aria-current="page">
          <span className={scss.breadcrumbs__text}>{page}</span>
        </li>
      </ol>
    </nav>
  );
};
