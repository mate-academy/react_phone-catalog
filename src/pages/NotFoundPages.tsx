import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/blocks/NotFoundPage.scss';

type Props = {
  updatePageHeight: () => void;
};

export const NotFoundPage: React.FC<Props> = ({ updatePageHeight }) => {
  useEffect(() => updatePageHeight(), []);

  return (
    <div className="page-not-found-container">
      <h1 className="title page-not-found-container__title">Page not found</h1>
      <Link to="/" className="link-home page-not-found-container__link-home">
        click here to go to the home page
      </Link>
    </div>
  );
};
