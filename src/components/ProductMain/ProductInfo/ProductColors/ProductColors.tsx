import { ProductDetails } from '../../../../pages/productPage/ProductPage';
import './ProductColors.scss';
import { ProductColor } from '../../ProductMain';

type ProductColorsProps = {
  someProduct: ProductDetails;
  selectedColor: string;
  setSelectedColor: React.Dispatch<React.SetStateAction<ProductColor>>;
};

const ProductColors = ({
  someProduct,
  selectedColor,
  setSelectedColor,
}: ProductColorsProps) => {
  return (
    <>
      <div className="product-info__colors">
        <p className="prduct-info__color--title">Available colors</p>

        <div className="product-info__color-list">
          {someProduct.colorsAvailable.map(color => {
            const normalizedColor = color.toLowerCase().replace(/ /g, '-');

            return (
              <button
                key={color}
                className={`product-info__color product-info__color--${normalizedColor} ${
                  selectedColor === color ? 'active' : ''
                }`}
                onClick={() => setSelectedColor(color)}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ProductColors;
