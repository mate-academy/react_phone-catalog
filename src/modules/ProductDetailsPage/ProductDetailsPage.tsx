import { useContext } from 'react';
import { AppContext } from '../../AppContext';
import { Loader } from '../../components/Loader';

export const ProductDetailsPage = () => {
  const { currentProduct, errorMessage, isLoading } = useContext(AppContext);

  // console.log(currentProduct);

  return (
    <>
      {isLoading && <Loader />}

      {!isLoading && (
        <>
          {errorMessage && <span className="notification">{errorMessage}</span>}

          {currentProduct && <h1 className="sr-only">Product Page</h1>}
        </>
      )}
    </>
  );
};
