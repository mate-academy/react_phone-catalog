import { Link, useLocation, useNavigate } from 'react-router-dom';
import cl from './ShownRoute.module.scss';
import { useState } from 'react';
import { Product } from '../../../features/types/Product';

export enum ShownRouteOrigin {
  ONPRODUCTPAGE = 'onProductPage',
  ONFAV = 'onFav',
  ONCART = 'onCart',
}

type Props = {
  origin: ShownRouteOrigin;
  chosenProduct?: Product;
};

export const ShownRoute: React.FC<Props> = ({ origin, chosenProduct }) => {
  const [pathname] = useState(useLocation().pathname);
  const navigate = useNavigate();

  // first word after / in pathname
  const currentCategoryName = pathname.split('/')[1];
  // makes this word capitalized
  const capitalizedName =
    currentCategoryName.charAt(0).toUpperCase() + currentCategoryName.slice(1);

  if (origin === ShownRouteOrigin.ONCART) {
    return (
      <nav className={cl.routeContainer}>
        <button onClick={() => navigate(-1)} className={cl.button}>
          <svg className={`${cl.iconArrowLeft} ${cl.icon}`} />
        </button>
        <button
          onClick={() => navigate(-1)}
          className={`${cl.word} ${cl.wordLink} ${cl.wordLinkWhite}`}
        >
          Back
        </button>
      </nav>
    );
  }

  return (
    <nav className={cl.routeContainer}>
      <Link to="/" className={cl.linkHome}>
        <svg className={`${cl.icon} ${cl.iconHome}`} />
      </Link>

      <svg className={`${cl.iconArrowRight} ${cl.icon}`} />

      <Link
        to={`/${currentCategoryName}`}
        className={`${cl.word} ${cl.wordLink}`}
      >
        {capitalizedName}
      </Link>

      {chosenProduct && (
        <>
          <svg className={`${cl.iconArrowRight} ${cl.icon}`} />
          <p className={cl.word}>{chosenProduct.name}</p>
        </>
      )}
    </nav>
  );
};
