import { Link } from 'react-router-dom';
import products from '../../features/products';
import './CategoryLinks.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
const categoryLinks = [
  {
    image: 'img/category-phones1.png',
    title: 'Mobile Phones',
    path: '/phones',
    count: 'phones',
  },
  {
    image: 'img/category-tablets1.png',
    title: 'Tablets',
    path: '/tablets',
    count: 'tablets',
  },
  {
    image: 'img/category-accessories1.png',
    title: 'Accessories',
    path: '/accessories',
    count: 'accessories',
  },
];

export const CategoryLinks = () => {
  const products = useSelector((state: RootState) => state.products.items);

  return (
    <section>
      <div className="slider__heading">
        <h2 className="text_above_slider">Shop by category</h2>
      </div>
      <div className="categories__container">
        {categoryLinks.map(({ image, title, path, count }) => {

          const chosenProducts = products.filter(
            product => product.category === count,
          );
          const models = chosenProducts.length;

          return (
            <Link to={path} className="categories__card" key={title}>
              <img src={image} alt={title} className="category__image" />
              <h3 className="category__name">{title}</h3>
              <p className="models__quantity">{models} models</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};
