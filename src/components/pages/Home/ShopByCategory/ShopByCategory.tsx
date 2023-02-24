import './ShopByCategory.scss';
import { Link } from 'react-router-dom';
import { Product } from '../../../../types/types';

type Props = {
  phones: Product[],
};

export const ShopByCategory:React.FC<Props> = ({ phones }) => {
  const categories = [
    {
      title: 'Mobile phones',
      image: 'new/img/category-phones.png',
      amount: phones.length,
      background: '#fcdbc1',
      category: 'phones',
    },
    {
      title: 'Tablets',
      image: 'new/img/category-tablets.png',
      amount: 0,
      background: '#8d8d92',
      category: 'tablets',
    },
    {
      title: 'Accessories',
      image: 'new/img/category-accessories.png',
      amount: 0,
      background: '#D53C51',
      category: 'accessories',
    }];

  return (
    <div className="category">
      <h1 className="category__title">
        Shop by category
      </h1>
      <div className="category__block">
        <ul className="category__list">
          {
            categories.map(({
              title, amount, image, background, category,
            }) => {
              return (
                <li className="category__item">
                  <Link
                    to={`../${category}`}
                    key={title}
                  >
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
                  </Link>
                </li>
              );
            })
          }
        </ul>
      </div>
    </div>
  );
};
