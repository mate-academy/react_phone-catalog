import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { DropDownMenuContext } from '../helpers/context/DropDownMenuContext';
import { BottomNavigation } from './BottomNavigation';
import { Logo } from './Logo';
import { Nav } from './header/Nav';
import { Cart } from './header/image-link/Cart';
import { Favourites } from './header/image-link/Favourites';
import { useLocalStorage } from '../helpers/LocalStorage';
import { CART_KEY, FAVORITES_KEY } from '../helpers/constants/StorageKeys';
import { CART_LINK, FAVORITES_LINK } from '../helpers/constants/Links';
import { ProductType } from '../helpers/enums/ProductType';
import { getProducts } from '../helpers/api/GetProducts';

function getDisplayedCount(size: number, comparedLink: string) {
  const { hash } = window.location;

  if (hash.includes(comparedLink)) {
    return size;
  }

  return -1;
}

export const DropDownMenu = () => {
  const [productType, setProductType] = useState(ProductType.all);

  const { collapseMenu } = useContext(DropDownMenuContext);

  const [,,,, cartTotalProducts] = useLocalStorage(CART_KEY);
  const [,,, favoritesSize] = useLocalStorage(FAVORITES_KEY);

  const { productId } = useParams();

  const cartDisplayedSize = getDisplayedCount(cartTotalProducts, CART_LINK);
  const favoritesDisplayedSize = getDisplayedCount(
    favoritesSize,
    FAVORITES_LINK,
  );

  useEffect(() => {
    getProducts()
      .then(products => {
        const product = products.find(
          currentProduct => currentProduct.id === productId,
        );

        if (product) {
          setProductType(product.type);
        }
      });
  }, []);

  return (
    <div className="drop-down-menu">
      <div className="drop-down-menu__content">
        <button
          onClick={collapseMenu}
          type="button"
          className="drop-down-menu__close"
        >
          <img src="img/header/search/close.svg" alt="Clear search" />
        </button>

        <Logo />

        <Nav activeLink={productType} />

        <Favourites count={favoritesDisplayedSize} />

        <Cart count={cartDisplayedSize} />

        <BottomNavigation />
      </div>
    </div>
  );
};
