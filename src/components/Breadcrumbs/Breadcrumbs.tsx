import './Breadcrumbs.scss';

export const Breadcrumbs = () => {
  return (
    <div className="breadcrumbs">
      <a href="/" aria-label="home-link">
        <span className="breadcrumbs__home" />
      </a>
      <span className="breadcrumbs__arrow" />
      <a href="/" className="breadcrumbs__link">Phones</a>
    </div>
  );
};
