import './ProductAbout.scss';
import { ProductDetails } from '../../../pages/productPage/ProductPage';

type ProductAboutProps = {
  currentProduct: ProductDetails;
};

const ProductAbout = ({ currentProduct }: ProductAboutProps) => {
  return (
    <>
      <div className="product-about">
        <h2 className="product-about__title">About</h2>
        {currentProduct.description.map(item => (
          <div key={item.title} className="product-about__section">
            <h3 className="product-about__subtitle">{item.title}</h3>
            {item.text.map((paragraph, index) => (
              <p key={index} className="product-about__text">
                {paragraph}
              </p>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductAbout;
