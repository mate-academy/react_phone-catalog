import GoBackLink from '../Blocks/GoBackLink';

const PageNotFound = () => {
  return (
    <main className="not-found">
      <h1>
        This page does not exist.
      </h1>
      <GoBackLink />
    </main>
  );
};

export default PageNotFound;
