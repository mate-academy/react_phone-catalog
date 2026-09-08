/* eslint-disable max-len */
import { Link, useNavigate } from 'react-router-dom';
import './NoFoundPage.scss';

export const NoFoundPage = () => {
  const navigate = useNavigate();

  function handleBack() {
    navigate(-1);
  }

  return (
    <>
      <div className="content">
        <div className="error-code">404</div>
        <h1 className="error-title">Page Not Found</h1>
        <p className="error-description">
          It looks like the page you`re looking for has been moved, deleted, or
          never existed. Don`t worry, we`ll help you find what you need!
        </p>

        <div className="actions">
          <Link to="/" className="btn btn-primary">
            <svg className="icon" viewBox="0 0 24 24">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </svg>
            Home
          </Link>
          <button
            className="btn btn-secondary"
            onClick={() => {
              handleBack();
            }}
          >
            <svg className="icon" viewBox="0 0 24 24">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
            </svg>
            Go Back
          </button>
        </div>
      </div>
    </>
  );
};
