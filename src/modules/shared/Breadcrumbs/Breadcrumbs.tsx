import { useContext } from 'react';
import breadcrumbs from './Breadcrumbs.module.scss';
import { CategoryContext } from '../../../context/CategoryContext';
import { Back } from './components/Back';
import { Link, useParams } from 'react-router-dom';
import { ProductsContext } from '../../../context/ProductsContext';

export const Breadcrumbs: React.FC = () => {
  const { currentCategory } = useContext(CategoryContext);

  const currentCategoryNormalized = currentCategory
    ? currentCategory[0].toUpperCase() + currentCategory.slice(1)
    : '';

  const isCart = currentCategory === 'cart';

  const params = useParams();
  const { productId } = params;

  const { allProducts } = useContext(ProductsContext);

  const product = allProducts.find(p => p.itemId === productId);

  return (
    <div className={breadcrumbs.breadcrumbs}>
      {isCart ? (
        <Back />
      ) : (
        <>
          <Link to="/" className={breadcrumbs.breadcrumbs__link}>
            <img
              src="img/icons/home.svg"
              alt="Home icon"
              className={breadcrumbs.breadcrumbs__icon}
            />
          </Link>
          <img
            src="img/icons/arrows/arrow-right-breadcrumbs.svg"
            alt="Arrow icon"
          />
          {productId ? (
            <Link
              to={`/${product?.category}`}
              className={`${breadcrumbs.breadcrumbs__category} ${productId ? breadcrumbs['breadcrumbs__category--active'] : ''}`}
            >
              {currentCategoryNormalized}
            </Link>
          ) : (
            <span
              className={`${breadcrumbs.breadcrumbs__category} ${breadcrumbs['breadcrumbs__category--span']} ${productId ? breadcrumbs['breadcrumbs__category--span--active'] : ''}`}
            >
              {currentCategoryNormalized}
            </span>
          )}

          {productId && (
            <>
              <img
                src="img/icons/arrows/arrow-right-breadcrumbs.svg"
                alt="Arrow icon"
              />
              <span className={breadcrumbs.breadcrumbs__name}>
                {product?.name}
              </span>
            </>
          )}
        </>
      )}
      {productId && (
        <div className={breadcrumbs.breadcrumbs__wrapper}>
          <Back />
        </div>
      )}
    </div>
  );
};
