import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';
import { TypesOfProducts } from '../../types/TypesOfProducts';

type Props = {
  product?: TypesOfProducts;
};

const capitalize = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

const categories = [
  { label: 'Phones', path: '/phones' },
  { label: 'Tablets', path: '/tablets' },
  { label: 'Accessories', path: '/accessories' },
  { label: 'Favorites', path: '/favorites' },
  { label: 'Cart', path: '/cart' },
];

export const Breadcrumbs = ({ product }: Props) => {
  const location = useLocation();
  const navigate = useNavigate();

  const crumbs = [{ label: 'Home', to: '/' }];

  if (!product) {
    categories.forEach(category => {
      if (location.pathname.startsWith(category.path)) {
        crumbs.push({ label: category.label, to: category.path });
      }
    });
  }

  if (product) {
    crumbs.push({
      label: capitalize(product.category),
      to: `/${product.category}`,
    });

    crumbs.push({ label: product.name, to: location.pathname });
  }

  return (
    <>
      <nav className={styles.container}>
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;

          return (
            <span key={crumb.to} className={styles.items}>
              {index > 0 && (
                <img
                  src="./img/icons/Chevron (Arrow Right).svg"
                  className={styles.next}
                  alt="NextVector"
                />
              )}
              {isLast ? (
                <span className={styles.crumbLast}>{crumb.label}</span>
              ) : (
                <Link className={styles.crumb} to={crumb.to}>
                  {crumb.to === '/' ? (
                    <img
                      src="./img/icons/Home.svg"
                      className={styles.homeIcon}
                      alt="Home"
                    />
                  ) : (
                    crumb.label
                  )}
                </Link>
              )}
            </span>
          );
        })}
      </nav>

      {product && (
        <div className={styles.back} onClick={() => navigate(-1)}>
          <img
            src="./img/icons/VectorPrev.svg"
            className={styles.Prev}
            alt="PrevVector"
          />
          <button className={styles.backButton}>Back</button>
        </div>
      )}
    </>
  );
};

export default Breadcrumbs;
