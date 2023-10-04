import './NotFound.scss';
import notFoundLogo from '../../img/not-found.png';

export const NotFound = () => {
  return (
    <div className="notFound">
      <div className="notFound__image-container">
        <img
          src={notFoundLogo}
          alt="not-found"
          className="notFound__image"
        />
      </div>
      <h1 className="notFound__title">Page Not Found</h1>
      <div className="notFound__paragraphs">
        <p className="notFound__paragraph">
          We&apos;re sorry, the page you requested could not be found
        </p>
        <p className="notFound__paragraph">
          Please go back to the homepage
        </p>
      </div>
    </div>
  );
};
