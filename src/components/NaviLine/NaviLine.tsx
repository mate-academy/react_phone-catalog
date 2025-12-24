import { Link } from 'react-router-dom';
import './NaviLine.scss';

type Props = {
  category: string;
  productName?: string;
}

export const NaviLine: React.FC<Props> = ({ category, productName }) => {
  return (
    <div className="navi__line">
      <Link
        to={'/#'}
        className="navi__icon"
      ></Link>
      <span className="navi__arrow" />
      
      {productName
        ? (
          <>
            <Link
              to={`/${category}`}
              className="navi__item"
            >
              <span>{category}</span>
            </Link>
            <span className="navi__arrow" />
            <div className="navi__item">
              <span>{productName}</span>
            </div>
          </>
        ) : (
          <span
            className="navi__item"
          >
            <span>{category}</span>
          </span>
        )
      }
    </div>
  )
}
