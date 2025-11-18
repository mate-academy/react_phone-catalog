import './ProductPage.scss';
import { ProductName } from '../../types/prodName';

type Props = {
  type: ProductName;
};

export const ProductPage: React.FC<Props> = ({ type }) => {
  return (
    <div className="productPage">
      <div className="container">
        <div className="productPage__content">
          <h1 className="page__title">Welcome to Nice Gadgets store!</h1>
          <div className="page__sections"></div>
        </div>
      </div>
    </div>
  );
};
