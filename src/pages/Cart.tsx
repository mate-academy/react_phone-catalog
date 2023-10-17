import { useRef } from 'react';
import { TitleOfPage } from '../components/TitleOfPage';
import { CartCard } from '../components/CartCard/CartCard';

export const Cart = () => {
  const isArrow = useRef(true);

  return (
    <div className="page__container">

      <div className="page__section">
        <TitleOfPage
          title="Cart"
          backArrow={isArrow.current}
        />
      </div>

      <div className="cataloge" data-cy="productList">
        <CartCard />
      </div>
    </div>
  );
};
