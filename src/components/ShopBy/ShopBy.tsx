import { Link } from 'react-router-dom';
import './shopBy.scss';
import { useContext, useMemo } from 'react';
import { CatalogContext } from '../../context';
import { countProducts } from '../../helpers/helpers';

export const ShopBy = () => {
  const { products } = useContext(CatalogContext);
  const phoneCount = useMemo(() => (
    countProducts('smartphone', products)
  ), [products]);

  const tabletCount = useMemo(() => (
    countProducts('tablet', products)
  ), [products]);

  const accessoriesCount = useMemo(() => (
    countProducts('accessories', products)
  ), [products]);

  return (
    <section className="page__section shopBy">
      <div className="container">
        <h2 className="shopBy__title">
          Shop by category
        </h2>

        <div className="shopBy__categories">
          <div className="shopBy__category">
            <Link
              data-cy="categoryLinksContainer"
              to="/phones"
              className="shopBy__link"
            >
              <div className="shopBy__container">
                <img
                  src="./img/categories/phone.svg"
                  alt="phones category"
                  className="shopBy__category-img"
                />
              </div>
              Mobile phones
            </Link>

            <span className="shopBy__category-count">
              {`${phoneCount} models`}
            </span>
          </div>

          <div className="shopBy__category">
            <Link
              data-cy="categoryLinksContainer"
              to="/tablets"
              className="shopBy__link"
            >
              <div className="shopBy__container shopBy__container--grey">
                <img
                  src="./img/categories/tablet.svg"
                  alt="phones category"
                  className="shopBy__category-img"
                />
              </div>
              Tablets
            </Link>

            <span className="shopBy__category-count">
              {`${tabletCount} models`}
            </span>
          </div>

          <div className="shopBy__category">
            <Link
              data-cy="categoryLinksContainer"
              to="/accessories"
              className="shopBy__link"
            >
              <div className="shopBy__container shopBy__container--red">
                <img
                  src="./img/categories/cases.svg"
                  alt="phones category"
                  className="shopBy__category-img"
                />
              </div>
              Accessories
            </Link>

            <span className="shopBy__category-count">
              {`${accessoriesCount} models`}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
