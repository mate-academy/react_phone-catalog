import { memo, useEffect, useMemo, useState } from 'react';
import { TitleTag, TitleTagType } from '../../../shared/ui/TitleTag';
import { Sceleton } from '../../../shared/ui/Sceleton/Sceleton';
import cls from './pagePartTop.module.scss';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { RoutePaths } from '../../../shared/config/routeConfig';
import icons from '../../../shared/styles/icons.module.scss';
import classNames from 'classnames';
import { capitalizeFirstLetter } from '../../../shared/lib/utils/capitalizeFirstLetter';

interface Props {
  isLoading?: boolean;
  isLoadingTitle?: boolean;
  productsCount?: number;
  title: string;
  tag?: TitleTagType;
  productName?: string; // Додаємо пропс для назви продукту
}

export const PagePartTop = memo(
  ({
    title,
    isLoadingTitle = false,
    isLoading = false,
    productsCount = 0,
    tag = 'h1',
    productName,
  }: Props) => {
    const { itemId } = useParams<{ itemId?: string }>();
    const location = useLocation();
    const navigate = useNavigate();
    const [showBackButton, setShowBackButton] = useState<boolean>(false);

    useEffect(() => {
      const isFromLocation = location.state?.fromLocation !== undefined;

      if (isFromLocation) {
        setShowBackButton(true);
      } else {
        setShowBackButton(false);
      }
    }, [location]);

    const handleBackClick = () => {
      navigate(-1);
    };

    const breadcrumbs = useMemo(() => {
      const locationParts = location.pathname.split('/');

      return locationParts.map((pathPart, index) => {
        const isLast = index === locationParts.length - 1;
        const linkPath = `${locationParts.slice(0, index + 1).join('/')}`;

        if (index === 0) {
          return (
            <Link
              to={RoutePaths.home}
              key={index}
              className={classNames(cls.breadcrumbs__link, icons['_icon-home'])}
            />
          );
        }

        if (pathPart === 'products') {
          return null;
        }

        if (isLast) {
          return (
            <span key={index} className={cls.currentBreadcrumb}>
              {itemId
                ? productName || 'Завантаження...'
                : capitalizeFirstLetter(pathPart)}
            </span>
          );
        }

        return (
          <Link to={linkPath} key={index} className={cls.breadcrumbs__link}>
            {capitalizeFirstLetter(pathPart)}
          </Link>
        );
      });
    }, [itemId, location.pathname, productName]);

    return (
      <>
        <nav className={cls.breadcrumbs}>{breadcrumbs.filter(Boolean)}</nav>
        {showBackButton && (
          <button
            className={classNames(cls.backButton, icons['_icon-arrow'])}
            onClick={handleBackClick}
          >
            Back
          </button>
        )}
        {isLoadingTitle ? (
          <Sceleton
            height={tag === 'h1' ? 56 : 41}
            width={'100%'}
            className={cls.title}
          />
        ) : (
          <TitleTag Tag={tag} title={title} className={cls.title} />
        )}
        {isLoading && <Sceleton height={21} width={'100%'} />}
        {!isLoading && productsCount !== 0 && (
          <p className={cls.label}>{`${productsCount} models`}</p>
        )}
      </>
    );
  },
);
