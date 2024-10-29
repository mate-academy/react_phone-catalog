import { Link } from 'react-router-dom';
import './BreadCrumbs.scss';

type Props = {
  pageName: string;
};

export const BreadCrumbs: React.FC<Props> = ({ pageName }) => {
  return (
    <div className="bread-crumbs">
      <Link to="/" className="bread-crumbs__icon">
        <img src="img/svg/home.svg" alt="home" />
      </Link>
      <div className="bread-crumbs__arrow">
        <img src="img/svg/arrow-left.svg" alt="arrow-left" />
      </div>
      <div className="bread-crumbs__name">{pageName}</div>
    </div>
  );
};
