import './ShopByCategory.scss';
import { Link } from 'react-router-dom';

export const ShopByCategory = ({ phones }) => {
  const categories = [
    {
      title: 'Mobile phones',
      image: '/_new/img/category-phones.png',
      amount: phones.length,
      background: '#fcdbc1',
    },
    {
      title: 'Tablets',
      image: '/_new/img/category-tablets.png',
      amount: 24,
      background: '#8d8d92',
    },
    {
      title: 'Accessories',
      image: '/_new/img/category-accessories.png',
      amount: 100,
      background: '#D53C51',
    }];

  const getLink = () => {
    switch (phones.category) {
      case 'Mobile phones':
        return 'phones';
      case 'Tablets':
        return 'tablets';
      case 'Accessories':
        return 'accessories';
      default:
        return 'home';
    }
  };

  return (
    <div className="category">
      <h1 className="category__title">
        Shop by category
      </h1>
      <div className="category__block">
        <ul className="category__list">
          {
            categories.map(({
              title, amount, image, background,
            }) => {
              return (
                <Link
                  to={`../${getLink()}`}
                  key={title}
                >
                  <li className="category__item">
                    <div className="category__image-block">
                      <img
                        className="category__image"
                        src={image}
                        alt={String(amount)}
                        style={{ background }}
                      />
                    </div>
                    <div className="category__info">
                      <h3 className="category__title">
                        {title}
                      </h3>
                      <div className="category__models-number body14">
                        {`${amount} models`}
                      </div>
                    </div>
                  </li>
                </Link>
              );
            })
          }
        </ul>
      </div>
    </div>
  );
};
