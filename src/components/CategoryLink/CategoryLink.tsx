import { Link } from 'react-router-dom';

import './style.scss';
import { LinksByCategory } from '../../types/linksByCategory';

type Props = {
  category: LinksByCategory,
};

export const CategoryLink: React.FC<Props> = ({ category }) => {
  const {
    pathTo,
    title,
    subtitle,
    imgPath,
    bgColorImg,
    width,
    height,
    top,
    left,
  } = category;

  return (
    <Link to={pathTo} className="item__link">
      <div
        className="item__imgContainer"
        style={{ backgroundColor: bgColorImg }}
      >
        <img
          src={imgPath}
          alt={title}
          style={{
            width,
            height,
            top,
            left,
          }}
          className="item__img"
        />
      </div>

      <h3 className="item__title">
        {
          `${title.charAt(0).toUpperCase()}${title.slice(1)}`
        }
      </h3>

      <span className="item__subtitle">{subtitle}</span>
    </Link>
  );
};
