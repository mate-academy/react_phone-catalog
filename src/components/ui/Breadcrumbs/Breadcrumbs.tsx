import { Link, useLocation, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import s from './Breadcrumbs.module.scss';
import homeDarkIcon from '@/assets/icons/home.svg';

export const Breadcrumbs = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { productId } = useParams<{ productId: string }>();

  const pathParts = location.pathname.split('/').filter(Boolean);

  if (pathParts.length === 0) return null;

  const categoryName = pathParts[0];

  const getTranslationKey = (category: string) => {
    if (category === 'phones') return 'nav.phones';
    if (category === 'tablets') return 'nav.tablets';
    if (category === 'accessories') return 'nav.accessories';
    if (category === 'favourites') return 'nav.favourites';

    if (category === 'profile') return 'profile.title';
    if (category === 'cart') return 'cart.title';
    if (category === 'checkout') return 'checkout.title';
    if (category === 'orders') return 'orders.title';
    if (category === 'admin') return 'admin.title';

    return category;
  };

  const formatProductName = (id: string) => {
    return id
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <nav className={s.breadcrumbs}>
      <Link
        to="/"
        className={s.breadcrumbs__home}
      >
        <img
          src={homeDarkIcon}
          alt="Home"
          className={s.breadcrumbs__icon}
        />
      </Link>

      <span className={s.breadcrumbs__separator}>&gt;</span>

      {productId ?
        <Link
          to={`/${categoryName}`}
          className={s.breadcrumbs__link}
        >
          {t(getTranslationKey(categoryName))}
        </Link>
      : <span className={s.breadcrumbs__current}>
          {t(getTranslationKey(categoryName))}
        </span>
      }

      {productId && (
        <>
          <span className={s.breadcrumbs__separator}>&gt;</span>
          <span className={s.breadcrumbs__current}>
            {formatProductName(productId)}
          </span>
        </>
      )}
    </nav>
  );
};
