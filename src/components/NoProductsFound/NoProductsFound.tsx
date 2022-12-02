import { useNavigate, useLocation } from 'react-router-dom';
import './NoProductsFound.scss';

export const NoProductsFound = () => {
  const navigate = useNavigate();
  const { search, pathname } = useLocation();
  const searchParams = new URLSearchParams(search);

  const resetSearchQuery = () => {
    searchParams.delete('query');

    navigate({
      pathname,
      search: searchParams.toString(),
    });
  };

  return (
    <div className="no-products-found">
      <h1 className="no-products-found__title">
        Oops!
      </h1>
      <p className="no-products-found__text">
        Seems like we don&apos;t have any products
        in this section matching your search
      </p>
      <button
        type="button"
        className="button no-products-found__button"
        onClick={() => {
          resetSearchQuery();
        }}
      >
        Reset your search
      </button>
    </div>
  );
};
