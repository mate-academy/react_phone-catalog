import { Link, useLocation, useParams } from 'react-router-dom';
import './BreadCrumbs.scss';
import home from '../../img/Home.svg';
import rightIcon from '../../img/icon-right-for-nav.svg';
import { useAppSelector } from '../../app/hooks';

type BreadCrumbsProps = {
  title: string;
  link: string;
};

export const BreadCrumbs: React.FC<BreadCrumbsProps> = ({ title, link }) => {
  const location = useLocation();
  const { productId } = useParams<string>();
  const productDetails = useAppSelector((state) => state.productDetails.data);

  return (
    <div
      className="breadcrumbs"
      data-cy="breadCrumbs"
    >
      <Link to="/">
        <img src={home} alt="home-icon" className="breadcrumbs__icon" />
      </Link>
      <img src={rightIcon} alt="right_vektor" className="breadcrumbs__vektor" />
      <Link to={link} className="breadcrumbs__name">
        {title}
      </Link>
      {location.pathname === `/phones/${productId}` && (
        <>
          <img
            src={rightIcon}
            alt="right_vektor"
            className="breadcrumbs__vektor"
          />
          <Link to={`/phones/${productId}`} className="breadcrumbs__name">
            {productDetails?.name}
          </Link>
        </>
      )}
    </div>
  );
};
