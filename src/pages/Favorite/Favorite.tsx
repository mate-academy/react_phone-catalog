import { useContext } from 'react';
import { LocalStorageContext } from '../../context/LocaleStorageContext';

import './Favorite.scss';
import { ApiContext } from '../../context/ApiContext';
import { ProductType } from '../../types/ProductType';
import { Product } from '../../components/Product/Product';
import { useLocation, useNavigate } from 'react-router-dom';
import { Breadcrumbs } from '../../components/Breadcrumbs';

export const Favorite: React.FC = () => {
  const { favs } = useContext(LocalStorageContext);

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from;

  const productsAll = useContext(ApiContext) as ProductType[];

  const findFav = productsAll.filter(product => favs.includes(product.itemId));

  const goBack = () => {
    navigate(from ? from : -1);
  };

  return (
    <div className="container">
      <Breadcrumbs />
      <section className="fav-box">
        {findFav.length > 0 ? (
          <>
            <h2 className="title">Favorite</h2>
            <span className="fav-box__item-length">{findFav.length} items</span>
            <div className="fav-box-products">
              {findFav.map(item => (
                <Product key={item.id} model={item} />
              ))}
            </div>
          </>
        ) : (
          <div className="fav-box__no-favs">
            <h2 className="title">There is not favorite products yet...</h2>
            <button className="fav-box__button" onClick={goBack}>
              back
            </button>
          </div>
        )}
      </section>
    </div>
  );
};
