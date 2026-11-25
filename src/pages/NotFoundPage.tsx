import Footer from '../components/Footer';

const NotFoundPage = () => {
  return (
    <>
      <img
        src={`${import.meta.env.VITE_PUBLIC_URL}/img/page-not-found.png`}
        alt="page not found."
        className="not-found-image"
      />
      <Footer />
    </>
  );
};

export default NotFoundPage;
