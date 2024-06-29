import { useContext } from 'react';
import { ProductContext } from '../../store/ProductContext';
import { Link, useLocation } from 'react-router-dom';
import './Breadcrumbs.scss';

export const Breadcrumbs = () => {
  const { selectedProduct } = useContext(ProductContext);
  const { pathname } = useLocation();

  const pathTo = pathname.split('/').filter(path => path)[0];

  const pathName = pathTo[0].toUpperCase() + pathTo.slice(1, pathTo.length);

  const checkPathName = () => {
    if (selectedProduct) {
      return pathname.includes(selectedProduct.id);
    }

    return;
  };

  return (
    <div className="breadcrumbs">
      <Link to={`/`} className="breadcrumbs--home"></Link>
      <div className="breadcrumbs--arrow-right"></div>
      <Link to={`/${pathTo}`} className="breadcrumbs--text">
        {pathName}
      </Link>
      {selectedProduct && checkPathName() && (
        <>
          <div className="breadcrumbs--arrow-right"></div>
          <p className="breadcrumbs--text">{selectedProduct.name}</p>
        </>
      )}
    </div>
  );
};
