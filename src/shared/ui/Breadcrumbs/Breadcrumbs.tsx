import { Link, useLocation, useParams } from 'react-router-dom';
import style from './Breadcrumbs.module.scss';
import { Icons } from '../Icons/Icons';
import { Directions, IconId } from '../../../types/icons';
import { ProductDetails } from '../../../types/Product';

type Props = {
  productDetails?: ProductDetails;
};

export const Breadcrumbs: React.FC<Props> = ({ productDetails }) => {
  const location = useLocation();
  const { productId } = useParams();
  const pathParts = location.pathname.split('/');
  const category = pathParts[1];
  const validProductName = productDetails?.name ? productDetails.name : '';

  const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <div className={style.breadcrumbs}>
      <Link to="/" className={style.iconLink}>
        <Icons id={IconId.Home} />
      </Link>
      {location.pathname.includes(`/${category}`) &&
        !location.pathname.includes('favourites') && (
          <>
            <Icons
              id={IconId.Chevron}
              directions={Directions.Right}
              className={style.chevron}
            />
            <Link to={`/${category}`} className={style.iconLink}>
              <p className={style.iconText}>{categoryTitle}</p>
            </Link>
          </>
        )}
      {location.pathname.includes(`${category}/${productId}`) && (
        <>
          <Icons
            id={IconId.Chevron}
            directions={Directions.Right}
            className={style.chevron}
          />
          <p className={style.text}>{validProductName}</p>
        </>
      )}
      {location.pathname.includes('favourites') && (
        <>
          <Icons
            id={IconId.Chevron}
            directions={Directions.Right}
            className={style.chevron}
          />
          <p className={style.text}>Favourites</p>
        </>
      )}
    </div>
  );
};
