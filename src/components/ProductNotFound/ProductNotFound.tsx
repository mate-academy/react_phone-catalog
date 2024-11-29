import themeStyles from '../../styles/utils/themeStyles';
import { Category } from '../../types/category';
import './ProductNotFound.scss';

type Props = {
  category?: Category;
};

export const ProductNotFound: React.FC<Props> = ({ category }) => {
  const { notFoundProduct } = themeStyles(true);

  return (
    <div className="product-not-found">
      {category ? (
        <h2>There are no {`${category}`} matching the query!</h2>
      ) : (
        <h2>Not Found</h2>
      )}

      <img
        className="product-not-found__image"
        src={notFoundProduct}
        alt="NotFoundProduct"
      />
    </div>
  );
};
