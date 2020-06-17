import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import './ProductsPage.scss';
import BreadCrumbs from '../BreadCrumbs/BreadCrumbs';
import Selectors from "../Selectors/Selectors";
import ProductPage from "../homePage/ProductPage/ProductPage";

type Param = {
  item: string | undefined;
};

const ProductsPage = () => {
  const params: Param = useParams();
  const location = useLocation();
  const { pathname } = location;

  console.log(location);

  return (
    <>
      { params.item
        ? <ProductPage currentProduct={params.item}/>
        : (
          <>
            <BreadCrumbs />
            {pathname.replace('/', '') === 'phone'
              ? (
                <div>
                  Mobile phone
                </div>
              )
              : pathname.replace('/', '') === 'tablet'
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
