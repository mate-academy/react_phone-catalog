import { Link } from 'react-router-dom';
import './Categories.scss';

import phoneImage from '../../../images/Categories/Phones.png';
import tabletsImage from '../../../images/Categories/Tablets.png';
import accessoriesImage from '../../../images/Categories/Accessories.png';

import { Product } from '../../../types/Product';

type Props = {
  products: Product[];
};

const CATEGORIES = ['phones', 'tablets', 'accessories'];

export const Categories: React.FC<Props> = ({ products }) => {
  const amountProducts = (category: string) => {
    return products.filter(currentProduct => (
      currentProduct.category === category
    )).length;
  };

  const handleImageCategory = (category: string) => {
    switch (category) {
      case 'phones':
        return phoneImage;

      case 'tablets':
        return tabletsImage;

      case 'accessories':
        return accessoriesImage;

      default:
        return '';
    }
  };

  const handleTitleCategory = (category: string): string => {
    if (category === 'phones') {
      return handleTitleCategory('mobile phones');
    }

    return category[0].toUpperCase() + category.slice(1);
  };

  return (
    <div className="categories">
      <h1 className="categories--title">
        Shop by category
      </h1>

      <div className="categories__content">
        {CATEGORIES.map(currentCategory => (
          <Link
            className="categories__category"
            to={`/${currentCategory}`}
          >
            <img
              src={handleImageCategory(currentCategory)}
              alt={` ${currentCategory} category`}
              className="categories__category--image"
            />

            <div className="categories__description">
              <h3 className="categories__description--title">
                {handleTitleCategory(currentCategory)}
              </h3>

              <p className="categories__description--subtitle">
                {`${amountProducts(currentCategory)} models`}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
