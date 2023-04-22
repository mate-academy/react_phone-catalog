import './BreadCrumbs.scss';
import { Link } from 'react-router-dom';

type Props = {
  path: string[];
};

const BreadCrumbs: React.FC<Props> = ({ path }) => (
  <div className="bread-crumbs">
    <div className="container">
      <div className="bread-crumbs__wrapper">
        <Link to="/" className="bread-crumbs__name">
          <img src="./icons/home.svg" alt="icon" />
        </Link>
        {path.map(value => (
          <Link
            to={`/${value}`}
            key={value}
            className="bread-crumbs__link"
          >
            <img src="./icons/rightDis.svg" alt="icon" />
            {value}
          </Link>
        ))}
      </div>
    </div>
  </div>
);

export default BreadCrumbs;
