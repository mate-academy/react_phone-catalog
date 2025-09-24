import notFound from '../../public/img/page-not-found.png';

export const PageNotFound = () => {
  return (
    <>
      <h1 className="title">Page not found</h1>
      <img src={notFound} alt="error" className="error__img" />
    </>
  );
};
