import { Link } from 'react-router-dom';
import './NaviLine.scss';
import classNames from 'classnames';

type Props = {
  category: string;
  productName?: string;
}

const normalize = (str: string) => {
  return str[0].toUpperCase() + str.slice(1);
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
              className={classNames(
                'navi__item',
                { 'navi__item--bold': productName },
              )}
            >
              <span>{normalize(category)}</span>
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
            <span>{normalize(category)}</span>
          </span>
        )
      }
    </div>
  )
}
