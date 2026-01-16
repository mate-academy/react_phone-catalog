import { ProductDetails } from '../../shared/types/ProductDetails';
import './ProductDetailsView.module.scss';

type Props = {
  productDetails: ProductDetails;
};

export const ProductDetailsView: React.FC<Props> = ({ productDetails }) => {
  return <div className="">{productDetails.id}</div>;
};
