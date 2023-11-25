import { NoResults } from '../components/additional/NoResults';
import { Errors } from '../types/Errors';

export const NotFoundPage = () => {
  return (
    <main className="main">
      <div className="page-heading">
        <h1>Page not found</h1>
      </div>
      <NoResults text={Errors.NOPAGE} />
    </main>
  );
};
