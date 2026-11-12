import { Product, Phone } from '../interface/Product';
import { useState, useEffect } from 'react';
import ProductInfo from './ProductInfo';
import ProductCarousel from './ProductCarousel';

interface ProductDataProps {
  product: Product;
  realProduct: Phone;
  changeEffect: (nam: string) => void;
}

const ProductData = ({
  product,
  realProduct,
  changeEffect,
}: ProductDataProps) => {
  const [imageActive, setImageActive] = useState(0);

  const [currentImage, setCurrentImage] = useState<string | undefined>(
    realProduct.images?.[0],
  );
  const [currentCapacity, setCurrentCapacity] = useState<string | undefined>(
    realProduct.capacityAvailable?.[0],
  );

  const colors = ['Black', 'Red', 'White', 'Yellow', 'Gold', 'Purple', 'Green'];

  /* 
  const colorCurr = colors.find(col => {
    return realProduct.name.includes(col);
  });
  */

  const [currentColor, setCurrentColor] = useState<string | undefined>(
    // colorCurr,
    realProduct.colorsAvailable?.[0],
  );

  useEffect(() => {
    const colorCurr = colors.find(col => realProduct.name.includes(col));

    setCurrentColor(colorCurr);
  }, [realProduct.name]);

  return (
    <div className="product__data">
      <div className="product__column">
        <div className="product__images">
          <ProductCarousel
            product={product}
            realProduct={realProduct}
            imageActive={imageActive}
            setImageActive={setImageActive}
            setCurrentImage={setCurrentImage}
          />
          <img
            className="product__image"
            src={`${import.meta.env.VITE_PUBLIC_URL}/${currentImage}`}
            alt={product.name}
          />
        </div>
      </div>
      <div className="product__column">
        <div className="product__specification">
          <ProductInfo
            realProduct={realProduct}
            currentCapacity={currentCapacity}
            setCurrentCapacity={setCurrentCapacity}
            currentColor={currentColor}
            setCurrentColor={setCurrentColor}
            changeEffect={changeEffect}
          />
        </div>
        <span className="product__id">ID: {product.id}</span>
      </div>
    </div>
  );
};

export default ProductData;
