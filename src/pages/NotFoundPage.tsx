import { BreadcrumbsMenu } from '../components/BreadcrumbsMenu/BreadcrumbsMenu';

export const NotFoundPagePage = () => {
  return (
    <section className="App__products not-found-page">
      <div className="container">
        <div className="not-found-page__content">
          <BreadcrumbsMenu
            category="Unknown page"
          />

          <h3>Page not found</h3>
        </div>
      </div>
    </section>
  );
};
