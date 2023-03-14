import './Loader.scss';

export const Loader: React.FC = () => (
  <div
    className="
      Loader
      grid__item--tablet-6-7
      grid__item--desktop-12-13"
    data-cy="loader"
  >
    <div className="Loader__content" />
  </div>
);
