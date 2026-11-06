import { Product, Phone } from '../interface/Product';
import { useState } from 'react';
import ProductInfo from './ProductInfo';
import ProductCarousel from './ProductCarousel';

interface ProductDataProps {
  product: Product;
  realProduct: Phone;
}

const ProductData = ({ product, realProduct }: ProductDataProps) => {
  const [imageActive, setImageActive] = useState(0);

  const [currentImage, setCurrentImage] = useState<string | undefined>(
    realProduct.images?.[0],
  );
  const [currentCapacity, setCurrentCapacity] = useState<string | undefined>(
    realProduct.capacityAvailable?.[0],
  );

  const [currentColor, setCurrentColor] = useState<string | undefined>(
    realProduct.colorsAvailable?.[0],
  );

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
          />
        </div>
        <span className="product__id">ID: {product.id}</span>
      </div>
    </div>
  );
};

export default ProductData;
