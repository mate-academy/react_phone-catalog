import { Link } from 'react-router-dom';
import { Message } from '../components/Message';

export const NotFoundPage = () => {
  return (
    <section className="not-found-page">
      <div className="not-found-page__message">
        <Message message="Page not found" isError />
      </div>

      <Link to="/" className="not-found-page__link">
        Home
      </Link>
    </section>
  );
};
