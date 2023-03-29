import { useContext, useEffect } from 'react';
import './header.scss';
import { Navigation } from '../navigation/Navigation';
import { addCatalog, GlobalContext, load } from '../../reducer';
import { requestListProducts } from '../../helpers/api';
import { NavLinkCustom } from '../navLink/NavLinkCustom';

export const Header = () => {
  const [state, dispatch] = useContext(GlobalContext);

  useEffect(() => {
    dispatch({ type: load, active: true });
    (async () => {
      const result = await requestListProducts();

      dispatch({ type: addCatalog, list: result });
      dispatch({ type: load, active: false });
    })();
  }, []);

  return (
    <header className="header">
      <NavLinkCustom way="/" classStyle="logo" active>
        <div className="logo" />
      </NavLinkCustom>
      <Navigation
        favorite={state.favoriteProducts.length}
        shoping={state.basketList.length}
      />
    </header>
  );
};
