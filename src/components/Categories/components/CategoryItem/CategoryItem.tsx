import { Link } from 'react-router-dom';
import './CategoryItem.scss';
import { useProducts } from '../../../../context';

type Props = {
  category: string,
  link: string,
  quantity?: number,
};

export const CategoryItem: React.FC<Props> = ({
  category,
  link,
  quantity = 0,
}) => {
  const { products } = useProducts();

  const phonesQuantity = products.length;

  return (
    <div className="category">
      <Link
        to={`/${category}`}
        key={category}
      >
        <img
          className="category__img"
          alt={category}
          src={link}
        />
      </Link>
      <h3 className="category__title">
        {category === 'phones' ? 'Mobile phones' : category}
      </h3>
      <p className="category__quantity">
        {category === 'phones'
          ? `${phonesQuantity} models`
          : `${quantity} models`}
      </p>
    </div>
  );
};
