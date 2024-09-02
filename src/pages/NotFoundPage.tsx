import { GoBackLink } from '../components/ui/GoBackLink';

export const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-page__goback-link">
        <GoBackLink />
      </div>

      <div className="not-found-page__title-block">
        <h2>Page not found</h2>
      </div>

      <div className="not-found-page__img-block"></div>
    </div>
  );
};
