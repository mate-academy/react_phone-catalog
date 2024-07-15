import { Product } from '../../types/Product';
import { ItemForSlider } from '../ItemForSlider/ItemForSlider';
import './ProductSlider.scss';

type Props = {
  title: string;
  products: Product[];
};

export const ProductSlider: React.FC<Props> = ({ title, products }) => {
  return (
    <div className="ProductSlider">
      <div className="ProductSlider__container">
        <div className="ProductSlider__top">
          <h2 className="ProductSlider__top-title">{title}</h2>
          <div className="ProductSlider__buttons"></div>
        </div>
        <div className="ProductSlider__content">
          {products.map(product => (
            <div
              key={product.id}
              // style={translateStyle}
              className="ProductSlider__content-wrap"
            >
              <ItemForSlider product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
