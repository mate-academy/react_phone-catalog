import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IconWithArrow } from '../UIKit/IconWithErrow';
import styles from './Breadcrumb.module.scss';
type Props = {
  productName?: string;
};

export const Breadcrumb: React.FC<Props> = ({ productName = '' }) => {
  const { pathname } = useLocation();
  const [category] = pathname.slice(1).split('/');
  const categoryName = category[0].toUpperCase() + category.slice(1);

  return (
    <div className={`${styles.container} text--grey text--small`}>
      <Link to="/" className="icon">
        <div className=" icon icon--home"></div>
      </Link>

      <IconWithArrow />
      <Link
        to={`/${category}`}
        className="link link--underline text--grey"
      >{`${categoryName}`}</Link>

      {productName && (
        <>
          <IconWithArrow />
          <span className={styles.text}>{`${productName}`}</span>
        </>
      )}
    </div>
  );
};

export const BreadcrumbBack: React.FC<Props> = () => {
  const navigate = useNavigate();

  return (
    <div className={`${styles.container} text--grey text--small`}>
      <div className="icon icon--arrow-black"></div>
      <p
        className="link link--underline text--grey"
        onClick={() => {
          navigate(-1);
        }}
      >
        Back
      </p>
    </div>
  );
};
