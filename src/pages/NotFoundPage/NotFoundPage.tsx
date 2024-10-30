import { BreadCrumbs } from '../../components/BreadCrumbs/BreadCrumbs';

export const NotFoundPage = () => {
  return (
    <main className="main">
      <div className="container">
        <BreadCrumbs pageName="Phones" />
        <h1 className="title">Page not found</h1>
      </div>
    </main>
  );
};
