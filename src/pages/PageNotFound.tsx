import '../styles/pages/PageNotFound.scss';

export const PageNotFound: React.FC = () => {
  return (
    <>
      <section className="page-notfound">
        <img src="../img/page-not-found.png" alt="#" className="page-notfound__img" />
        <h1 className="page-notfound__title">Unfortunaly, Page Not Found</h1>
      </section>
    </>
  );
};
