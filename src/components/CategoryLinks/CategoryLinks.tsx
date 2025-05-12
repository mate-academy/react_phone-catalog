import { Link } from 'react-router-dom';
import './CategoryLinks.scss';

const categoryLinks = [
  {
    image: 'img/category-phones1.png',
    title: 'Mobile Phones',
    path: '/phones',
  },
  {
    image: 'img/category-tablets1.png',
    title: 'Tablets',
    path: '/tablets',
  },
  {
    image: 'img/category-accessories1.png',
    title: 'Accessories',
    path: '/accessories',
  },
];
export const CategoryLinks = () => {
  return (
    <div className="categories__container">
      {categoryLinks.map(({ image, title, path }) => (
        <Link to={path} className="categories__card" key={title}>
          <img src={image} alt={title} className="category-image" />
          <p className="name">{title}</p>
          <p className="count">models</p>
        </Link>
      ))}
    </div>
  );
};
