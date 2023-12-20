import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ProductsContext } from '../../store/ProductsContext';
import { getProductsByKey } from '../../helpers/utils/getFilteredProducts';
import './Category.scss';
import { capitalize } from '../../helpers/utils/capitalize';

type Props = {
  image: string;
};

export const Category: React.FC<Props> = ({ image }) => {
  const { products } = useContext(ProductsContext);
  const category = image.slice(
    image.lastIndexOf('-') + 1, image.lastIndexOf('.'),
  );

  const productsInCategory = getProductsByKey(products, 'category', category);

  return (
    <Link to="/" className="category">
      <img
        src={image}
        alt={`${category} category`}
        className="category__img"
      />

      <h3 className="category__title">{capitalize(category)}</h3>
      <p className="category__count">
        {productsInCategory.length > 0 ? (
          `${productsInCategory.length} models`
        ) : (
          `${productsInCategory.length} model`
        )}
      </p>
    </Link>
  );
};
