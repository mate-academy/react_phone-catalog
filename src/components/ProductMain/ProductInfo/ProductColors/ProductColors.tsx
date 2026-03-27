import { ProductDetails } from '../../../../pages/productPage/ProductPage';
import { useState } from 'react';
import './ProductColors.scss';

type ProductColorsProps = {
  someProduct: ProductDetails;
};

const ProductColors = ({ someProduct }: ProductColorsProps) => {
  const [selectedColor, setSelectedColor] = useState(
    someProduct.colorsAvailable[0],
  );

  return (
    <>
      <div className="product-info__colors">
        <p>Available colors</p>

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
