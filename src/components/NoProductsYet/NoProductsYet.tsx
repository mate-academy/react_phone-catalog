import { useLocation } from 'react-router-dom';
import { noProductYetData } from '../../data/noProductYetData';

export const NoProductsYet = () => {
  const {
    title,
    descriptionFirst,
    descriptionSecond,
  } = noProductYetData;

  const { pathname } = useLocation();

  return (
    <section className="no-products">
      <img
        className="no-products__image"
        src="./categories/no_products.png"
        alt="No product yet"
      />
      <div className="no-products__content">
        <h1 className="no-products__title">
          {title}
        </h1>
        <span className="no-products__description">
          {descriptionFirst}
        </span>
        <span className="no-products__description--category">
          {pathname.slice(1)}
        </span>
        <span className="no-products__description">
          {descriptionSecond}
        </span>
      </div>
    </section>
  );
};
