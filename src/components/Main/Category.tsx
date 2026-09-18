import { Link } from 'react-router-dom';
import './Category.scss';

export const Category = () => {
  const categories = [
    {
      id: 1,
      photo: 'img/IPhone.svg',
      alt: 'Mobile phones',
      title: 'Mobile phones',
      models: '124 models',
      bgColor: '#6D6474',
      link: '/phones',
    },
    {
      id: 2,
      photo: 'img/Ipads.svg',
      alt: 'Tablets',
      title: 'Tablets',
      models: '24 models',
      bgColor: '#8D8D92',
      link: '/tablets',
    },
    {
      id: 3,
      photo: 'img/Iphones.svg',
      alt: 'Accessories',
      title: 'Accessories',
      models: '100 models',
      bgColor: '#973456',
      link: '/accessories',
    },
  ];

  return (
    <div className="categories">
      <h2 className="categories__title">Shop by category</h2>

      <div className="categories__list">
        {categories.map(category => (
          <div key={category.id} className="categories__card">
            <div
              className="categories__picture-wrapper"
              style={{ backgroundColor: category.bgColor }}
            >
              <Link to={category.link}>
                <img
                  className="categories__photo"
                  src={category.photo}
                  alt={category.alt}
                />
              </Link>
            </div>

            <div className="categories__title2">{category.title}</div>
            <div className="categories__models">{category.models}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
