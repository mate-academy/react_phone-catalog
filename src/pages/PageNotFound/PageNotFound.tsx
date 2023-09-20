import { Link } from 'react-router-dom';
import { ButtonGoBack } from '../../components/ButtonGoBack/ButtonGoBack';
import './style.scss';

export const PageNotFound = () => {
  return (
    <section className="page-notFound">
      <div className="page-notFound__back">
        <ButtonGoBack />
      </div>
      <p className="page-notFound__message">
        Page Not Found. You can return to the&nbsp;
        <Link
          to="/"
          className="page-notFound__link"
        >
          Home Page.
        </Link>
      </p>
    </section>
  );
};
