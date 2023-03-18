import { useContext } from 'react';
import { GlobalContext } from '../../reducer';
import { Product } from '../../types/product';
import { NavLinkCustom } from '../navLink/NavLinkCustom';
import './catalogs.scss';

export const Catalogs = () => {
  const [state] = useContext(GlobalContext);

  return (
    <div className="wrapper-catalogs">
      <NavLinkCustom
        way="/phones"
        classStyle="link"
        data-cy="categoryLinksContainer"
      >
        <div className="catalog">
          <img src="./img/banners/phone.png" alt="phones" />
          <div className="catalog__info">
            <span>Mobile phones</span>
            <span>
              {
                state.catalogsProducts.filter(
                  (el: Product) => el.type === 'phone',
                ).length
              }
              {' '}
              models
            </span>
          </div>
        </div>
      </NavLinkCustom>
      <NavLinkCustom
        way="/tablets"
        classStyle="link"
        data-cy="categoryLinksContainer"
      >
        <div className="catalog">
          <img src="./img/banners/tablets.png" alt="tablets" />
          <div className="catalog__info">
            <span>Mobile phones</span>
            <span>
              {
                state.catalogsProducts.filter(
                  (el: Product) => el.type === 'tablet',
                ).length
              }
              {' '}
              models
            </span>
          </div>
        </div>
      </NavLinkCustom>
      <NavLinkCustom
        way="/accessories"
        classStyle="link"
        data-cy="categoryLinksContainer"
      >
        <div className="catalog">
          <img src="./img/banners/accessories.png" alt="accessories" />
          <div className="catalog__info">
            <span>Mobile phones</span>
            <span>
              {
                state.catalogsProducts.filter(
                  (el: Product) => el.type === 'accessories',
                ).length
              }
              {' '}
              models
            </span>
          </div>
        </div>
      </NavLinkCustom>
    </div>
  );
};
