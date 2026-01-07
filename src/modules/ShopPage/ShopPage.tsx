import { useContext, useState } from 'react';

import style from './ShopPage.module.scss';
import { Card } from '../../components/ShopCart';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { StateContext } from '../../provider/GlobalProvider';
import { Registration } from './components/Registration';

export const ShopPage = () => {
  const [registration, setRegistration] = useState(false);
  const { shopCount, shopList } = useContext(StateContext);

  const totalPrice = shopList.reduce((sum, a) => sum + a.price * a.quantity, 0);

  return (
    <section className={style.shop}>
      <h1 hidden> ShopPage</h1>

      <Breadcrumbs type="back" modifier="shop" />

      <h2 className={style.shop__title}>Cart</h2>

      {shopCount <= 0 && <div className={style.shop__empty}></div>}

      <div className={style.shop__list}>
        {shopList.map(product => (
          <Card card={product} key={product.id} />
        ))}
      </div>

      <Registration
        handleRegistration={() => setRegistration(false)}
        registration={registration}
      />

      {shopCount > 0 && (
        <div className={style.total}>
          <div className={style.total__info}>
            <p className={style.total__price}>${totalPrice}</p>
            <p className={style.total__count}>Total for {shopCount} items</p>
          </div>

          <button
            className={style.total__button}
            onClick={() => setRegistration(true)}
          >
            Checkout
          </button>
        </div>
      )}
    </section>
  );
};
