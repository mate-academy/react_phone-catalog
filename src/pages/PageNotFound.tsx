import { BreadCrumbs } from '../components/BreadCrumbs';
import '../styles/page.scss';

export const PageNotFound = () => {
  return (
    <div className="container">
      <BreadCrumbs />
      <div className="page__block">
        <h1 className="page__title">Page not found</h1>
      </div>
    </div>
  );
};
