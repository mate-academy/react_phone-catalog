import { useParams } from 'react-router-dom';

import { useProductsContext } from 'contexts/ProductsContext';
import { NotFoundPage } from 'modules/NotFoundPage';
import { ProductCategory } from 'shared/constants/productCategory';

export const ProductDetailsPage: React.FC = () => {
  const { productsByCategory } = useProductsContext();
  const { category, id } = useParams();

  const product = productsByCategory[category as ProductCategory].find(
    p => p.itemId === id,
  );

  if (!product) {
    return (
      <NotFoundPage
        message="Product not found"
        imageSrc="img/product-not-found.png"
      />
    );
  }

  return (
    <div>
      <div>
        <p>{product?.name}</p>
      </div>
    </div>
  );
};
