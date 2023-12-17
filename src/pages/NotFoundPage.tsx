/* eslint-disable operator-linebreak */
import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MainContext } from '../context/MainContext';

interface Props {
  title: string;
}

export const NotFoundPage: React.FC<Props> = ({ title }) => {
  const { setIsMenuOpen, setIsHeaderSearchVisible, setDocumentTitle } =
    useContext(MainContext);

  useEffect(() => {
    setDocumentTitle('Not Found Page');
    setIsHeaderSearchVisible(false);
    setIsMenuOpen(false);
  }, []);

  return (
    <section className="section not-found">
      <div className="section__container">
        <div className="not-found__block">
          <h1 className="h1 not-found__title">{title}</h1>
          <Link to="/" className="btn">
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
};
