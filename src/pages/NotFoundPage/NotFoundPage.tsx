import { HomeLink } from '../shared/components/HomeLink/HomeLink';
import './NotFoundPage.scss';

export const NotFoundPage: React.FC = () => {
  return (
    <main className="not-found">
      <div className="not-found__links">
        <HomeLink className="not-found__home" />

        <img
          className="not-found__arrow"
          src="icons/arrow-right-disabled-16.svg"
          alt="right arrow"
        />
        <p className="body-text--14">back home</p>
      </div>

      <h1 className="not-found__text title--1">Page not found</h1>
    </main>
  );
};
