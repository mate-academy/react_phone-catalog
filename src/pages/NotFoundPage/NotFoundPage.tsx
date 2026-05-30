import notFound from '../../../public/img/page-not-found.png';
import './NotFoundPage.scss';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="grid">
      <div className="not-found-page">
        <img src={notFound} alt="Page Not Found" />
        {/* <h1 className="not-found-page__title">404 - Page Not Found</h1>
        <p className="not-found-page__message">
          The page you are looking for does not exist.
        </p> */}
      </div>
    </div>
  );
};
