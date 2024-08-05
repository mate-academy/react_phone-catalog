import { useContext } from 'react';
import './Error.scss';
import { ProductContext } from '../Context/Context';

export const Error = () => {
  const { errorMessage } = useContext(ProductContext);

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="error">
      <h1 className="page-title">{errorMessage}</h1>
      <button className="error__button" onClick={handleRefresh}>
        Reload
      </button>
    </div>
  );
};
