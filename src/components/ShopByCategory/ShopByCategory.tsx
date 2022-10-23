import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import './ShopByCategory.scss';
import { ShopImages } from './ShopImages';

type Props = {
  products: Product[];
};

export const ShopByCategory: React.FC<Props> = ({ products }) => {
  const countPhones = (type: string) => {
    return products.filter(product => product.type === type);
  };

  return (
    <>
      <h1 className="page__sectionTitle ShopByCategory__title">
        Shop by Category
      </h1>
      <div className="ShopByCategory__cards">
        {ShopImages.map(image => (
          <div
            className="ShopByCategory__card"
            key={image.id}
          >
            <Link to={image.title}>
              <div
                className="ShopByCategory__imgContainer"
                style={{ backgroundColor: image.backColor }}
              >
                <img
                  src={image.url}
                  alt={image.title}
                  className="ShopByCategory__img"
                />
              </div>
            </Link>
            <Link
              to={image.title}
              className="ShopByCategory__name"
            >
              {image.name}
            </Link>
            <p className="ShopByCategory__countModels">
              {`${countPhones(image.type).length} models`}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};
