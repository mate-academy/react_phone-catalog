import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <main className="main main--not-found">
      <h1 className="main__title main__title--development">
        Page not found
      </h1>
      <div className="main__text">
        Perhaps you would like to navigate to the
        <Link to="/">
          <span className="main__span"> Home page </span>
        </Link>
        ?
      </div>
    </main>
  );
};
