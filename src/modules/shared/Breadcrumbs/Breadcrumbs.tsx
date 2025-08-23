import breadcrumbs from './Breadcrumbs.module.scss';
import { useLocation } from 'react-router-dom';

export const Breadcrumbs: React.FC = () => {
  const { pathname } = useLocation();
  const categories = ['phones', 'tablets', 'accessories'];
  const currentCategory = categories.find(category =>
    pathname.includes(category),
  );
  const currentCategoryNormalized = currentCategory
    ? currentCategory[0].toUpperCase() + currentCategory.slice(1)
    : '';

  return (
    <div className={breadcrumbs.breadcrumbs}>
      <a href="/" className={breadcrumbs.breadcrumbs__link}>
        <img
          src="/img/icons/home.svg"
          alt="Home icon"
          className={breadcrumbs.breadcrumbs__icon}
        />
      </a>
      <img
        src="/img/icons/arrows/arrow-right-breadcrumbs.svg"
        alt="Arrow icon"
      />
      <span className={breadcrumbs.breadcrumbs__category}>
        {currentCategoryNormalized}
      </span>
    </div>
  );
};
