import { Link } from 'react-router-dom';
import products from '../../features/products';
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
    <section>
      <div className="slider__heading">
      <h2 className="text_above_slider">Shop by category</h2>
      </div>
    <div className="categories__container">
      {categoryLinks.map(({ image, title, path }) => (
        <Link to={path} className="categories__card" key={title}>
          <img src={image} alt={title} className="category__image" />
          <h3 className="category__name">{title}</h3>
          <p className="models__quantity">{products.length} models</p>
        </Link>
      ))}
      </div>
      
    </section>
  );
};
