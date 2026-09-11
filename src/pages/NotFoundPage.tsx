import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <>
      <h1>NotFoundPage</h1>
      <Link to={'/'}>Back to home</Link>
    </>
  );
};
