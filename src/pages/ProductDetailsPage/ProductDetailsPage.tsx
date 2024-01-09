import { Link } from 'react-router-dom';

export const ProductDetailsPage = () => {
  return (
    <div className="product-details__page">
      <div className="path-box">
        <Link
          to="/home"
          className="home__link icon"
        />
        <div className="arrow-path icon" />
        <Link
          to="/phones"
          className="phones__link"
        >
          Phones
        </Link>
        <div className="arrow-path icon" />
        <p className="current-page">
          Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)
        </p>
      </div>
    </div>
  );
};
