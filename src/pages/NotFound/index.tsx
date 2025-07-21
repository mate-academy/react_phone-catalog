import { FC } from 'react';
import './NotFoundPage.scss';

export const NotFoundPage: FC = () => {
  return (
    <section className="not-found-page">
      <div className="not-found-page__content">
        <h1 className="not-found-page__title">Page not found</h1>
        <img className="not-found-page__image" src="img/page-not-found.png" />
      </div>
    </section>
  );
};
