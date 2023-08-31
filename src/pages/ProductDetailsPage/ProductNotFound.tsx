import { Link } from 'react-router-dom';

import './ProductDetailsPage.scss';

type Props = {
  directory: string;
};

export const ProductNotFound: React.FC<Props> = ({ directory }) => {
  return (
    <div className="ProductNotFound">
      <h1 className="ProductNotFound__title">
        Oops!
      </h1>
      <h2 className="ProductNotFound__paragpraph">
        Sorry, but we couldn&apos;t find this product.
      </h2>
      <Link
        type="button"
        to={`/${directory}`}
        className="ProductNotFound__button"
      >
        {`Go back to ${directory}`}
      </Link>
    </div>
  );
};
