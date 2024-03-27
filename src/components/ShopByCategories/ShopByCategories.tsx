import { Link } from 'react-router-dom';
import './ShopByCategories.scss';
import { ShopByCategoryDataItem } from '../../types/ShopByCategoryItem';

type Props = {
  ShopByCatData: ShopByCategoryDataItem[];
};

export const ShopByCategories: React.FC<Props> = ({ ShopByCatData }) => {
  return (
    <div
      className="home-page__categories categories"
      data-cy="categoryLinksContainer"
    >
      <h2 className="categories__title">Shop by category</h2>
      <div className="categories__links">
        {ShopByCatData.map(el => (
          <Link
            to={el.catLink}
            className={`categories__link categories__link--${el.catName}`}
            key={el.catName}
          >
            <img
              src={`img/${el.catName}.png`}
              alt=""
              className="categories__link--img"
            />
            <div className="categories__info categories__info--tablets">
              <p className="categories__info--title">{el.catName}</p>
              <p className="categories__info--count">
                {el.catItemCount} models
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
