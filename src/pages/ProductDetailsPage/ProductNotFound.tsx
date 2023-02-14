import { Link } from 'react-router-dom';

export const ProductNotFound:React.FC<{ directory: string }> = ({
  directory,
}) => {
  return (
    <div className="product-not-found">
      <h1 className="main-title">
        Sorry, but we couldn&apos;t find this product
      </h1>
      <Link
        type="button"
        to={`/${directory}`}
        className="button product-not-found__button"
      >
        {`Go back to ${directory}`}
      </Link>
    </div>
  );
};
