import { Product, Phone } from '../interface/Product';
import { useState } from 'react';
import ProductInfo from './ProductInfo';
import ProductCarousel from './ProductCarousel';
import { LocalProduct } from '../interface/Product';

interface ProductDataProps {
  product: Product;
  realProduct: Phone;
  changeEffect: (nam: string) => void;
  currentCapacity: string | undefined;
  setCurrentCapacity: React.Dispatch<React.SetStateAction<string | undefined>>;
  currentColor: string | undefined;
  setCurrentColor: React.Dispatch<React.SetStateAction<string | undefined>>;
  productName: () => string | undefined;
  favorites: string[];
  setFavorites: (list: string[]) => void;
  products: LocalProduct[];
  setProducts: (list: LocalProduct[]) => void;
  getImage: (nam: string | undefined) => string | undefined;
}

const ProductData = ({
  product,
  realProduct,
  changeEffect,
  currentCapacity,
  currentColor,
  setCurrentCapacity,
  setCurrentColor,
  productName,
  products,
  setProducts,
  favorites,
  setFavorites,
  getImage,
}: ProductDataProps) => {
  const [imageActive, setImageActive] = useState(0);

  const [currentImage, setCurrentImage] = useState<string | undefined>(
    realProduct.images?.[0],
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
            getImage={getImage}
          />
          <img
            className="product__image"
            src={`${import.meta.env.VITE_PUBLIC_URL}/${getImage(currentImage)}`}
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
            productName={productName}
            products={products}
            setProducts={setProducts}
            favorites={favorites}
            setFavorites={setFavorites}
          />
        </div>
        <span className="product__id">ID: {product.id}</span>
      </div>
    </div>
  );
};

export default ProductData;
