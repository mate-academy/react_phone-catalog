import './NotFound.scss';
import ProductNotFound from '../../../public/img/product-not-found.png';
import PageNotNotFound from '../../../public/img/page-not-found.png';

interface NotFoundProps {
  notFound: 'page' | 'product';
}

export const NotFound = ({ notFound }: NotFoundProps) => {
  return (
    <>
      <main className="not-found">
        <h1 className="not-found__title">
          {notFound.slice(0, 1).toUpperCase()}
          {notFound.slice(1)} not found
        </h1>

        <img
          className="not-found__image"
          src={notFound === 'page' ? PageNotNotFound : ProductNotFound}
          alt={`${notFound} not found`}
        />

        <a className="not-found__button" href="/home">
          Go to home page
        </a>
      </main>
    </>
  );
};
