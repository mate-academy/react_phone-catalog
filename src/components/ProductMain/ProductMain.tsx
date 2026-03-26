import './ProductMain.scss';
import { ProductDetails } from '../../pages/productPage/ProductPage';

type ProductMainProps = {
  someProduct: ProductDetails;
};

const ProductMain = ({ someProduct }: ProductMainProps) => {
  return (
    <div className="product-main">
      {someProduct.images.map(img => (
  <img key={img} src={img} />
))}
      <h1 className="product__name">{someProduct.name}</h1>
      <span className="product__price">${someProduct.priceRegular}</span>
      <span className="product__sreen">{someProduct.screen}</span>
      <span className="product__capacity">{someProduct.capacity}</span>
      <span className="product__ram">{someProduct.ram}</span>
    </div>
  );
};

export default ProductMain;
