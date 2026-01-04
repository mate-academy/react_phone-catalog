import { Link } from 'react-router-dom';
import './CategoryBlock.scss';
const categoryItems = [
  {
    title: 'Mobile phones',
    imgSrc: '/public/img/cat-phones.png',
    countModels: 124,
    linkTo: '/phones',
  },
  {
    title: 'Tablets',
    imgSrc: '/public/img/cat-tablets.png',
    countModels: 36,
    linkTo: '/tablets',
  },
  {
    title: 'Accessories',
    imgSrc: '/public/img/cat-access.png',
    countModels: 34,
    linkTo: '/accessories',
  },
];

export default function CategoryBlock() {
  return (
    <div className="CategoryBlock">
      <h1 className="CategoryBlock__title">Shop by category</h1>
      <div className="CategoryBlock__items">
        {categoryItems.map(item => {
          return (
            <Link
              to={item.linkTo}
              key={item.title}
              className="CategoryBlock__link"
            >
              <div className="CategoryBlock__item">
                <img src={item.imgSrc} alt="" className="CategoryBlock__img" />
                <div className="CategoryBlock__desc">
                  <h4 className="CategoryBlock__item--title">{item.title}</h4>
                  <p className="CategoryBlock__item--count">
                    {item.countModels} models
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
