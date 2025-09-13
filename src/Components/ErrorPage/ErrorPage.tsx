import './ErrorPage.scss';

export const ErrorPage: React.FC = () => (
  <div>
    <h1 className="error-message">Page Not Found</h1>
    <img className="error" src="public/img/page-not-found.png" alt="error" />
  </div>
);
