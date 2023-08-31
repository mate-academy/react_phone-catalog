import { useContext, useRef } from 'react';
import { StoragesContext } from '../Context/StoragesContext';
import { TitleOfPage } from '../components/TitleOfPage';
import { CartCard } from '../components/CartCard/CartCard';

export const Cart = () => {
  const { cartStorage } = useContext(StoragesContext);
  const isArrow = useRef(true);

  return (
    <div className="page__container">

      <div className="page__section">
        <TitleOfPage
          title="Cart"
          phonesLen={cartStorage.length}
          visiblePhonesLen={cartStorage.length}
          backArrow={isArrow.current}
        />
      </div>

      <div className="cataloge" data-cy="productList">
        <CartCard />
      </div>
    </div>
  );
};
