import './PageNotFound.scss';
import '../../styles/container.scss';

export const PageNotFound = () => (
  <div className="not-found">
    <div className="container">
      <h2 className="not-found__title">
        Oooops, we can&apos;t find this page...
      </h2>
      <img
        className="not-found__img"
        src="./img/page-not-found.png"
        alt="Page not found"
      />
    </div>
  </div>
);
