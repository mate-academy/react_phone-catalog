import { PageTitle } from '../titles/PageTitle';
import { ShownRoute, ShownRouteOrigin } from '../ui/ShownRoute';
import cl from './CartPage.module.scss';

export const CartPage = () => {
  return (
    <div className="container">
      <ShownRoute origin={ShownRouteOrigin.ONCART} />
      <PageTitle text="Cart" className={cl.title} />
      <ul className={cl.list}></ul>
    </div>
  );
};
