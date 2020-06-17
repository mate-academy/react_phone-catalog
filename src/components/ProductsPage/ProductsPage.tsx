import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Device from '../Device/Device';
import './ProductsPage.scss';
import BreadCrumbs from '../BreadCrumbs/BreadCrumbs';
import Selectors from "../Selectors/Selectors";

type Param = {
  device: string | undefined;
};

const ProductsPage = () => {
  const params: Param = useParams();
  const location = useLocation();
  const { pathname } = location;

  console.log(location);

  return (
    <>
      { params.device
        ? <Device />
        : (
          <>
            <BreadCrumbs />
            {pathname.replace('/', '') === 'Phone'
              ? (
                <div>
                  Mobile phone
                </div>
              )
              : pathname.replace('/', '') === 'Tablet'
                ? (
                  <div>
                    Tablets
                  </div>
                )
                : (
                  <div>
                    Accessories
                  </div>
                )}
            <Selectors />
          </>
        )}
    </>
  );
};

export default ProductsPage;
