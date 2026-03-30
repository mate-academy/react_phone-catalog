import './ProductMain.scss';
import { ProductDetails } from '../../pages/productPage/ProductPage';
import ProductGallery from './ProductGallery/ProductGallery';
import ProductInfo from './ProductInfo/ProductInfo';
import ProductAbout from './ProductAbout/ProductAbout';
import { useEffect, useState } from 'react';
import ProductTechSpecs from './ProductTechSpecs/ProductTechSpecs';
import { Link, useNavigate } from 'react-router-dom';

export type ProductMainProps = {
  someProduct: ProductDetails;
  models: ProductDetails[];
};

export type ProductColor =
  | 'black'
  | 'green'
  | 'yellow'
  | 'white'
  | 'purple'
  | 'red'
  | 'spacegray'
  | 'silver'
  | 'gold'
  | 'spaceblack'
  | 'sierrablue'
  | 'graphite'
  | 'midnight'
  | 'coral'
  | 'starlight'
  | 'skyblue';

const ProductMain = ({ someProduct, models }: ProductMainProps) => {
  const [selectedColor, setSelectedColor] = useState(
    someProduct.colorsAvailable[0] as ProductColor,
  );
  const [selectedCapacity, setSelectedCapacity] = useState(
    someProduct.capacityAvailable[0],
  );

  const [currentProduct, setCurrentProduct] = useState(someProduct);
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentProduct(someProduct);
  }, [someProduct]);

  useEffect(() => {
    const foundProduct = models.find(p => {
      return p.color === selectedColor && p.capacity === selectedCapacity;
    });

    if (foundProduct) {
      setCurrentProduct(foundProduct);
      navigate(`/${foundProduct.category}/${foundProduct.id}`);
    }
  }, [selectedColor, selectedCapacity, models, navigate]);

  return (
    <div className="product-main">
      <div className="product-main__icons">
        <Link to="/" className="product-main__icon--home"></Link>
        <Link to="/" className="product-main__icon--slider--right--gray"></Link>
        <Link
          to={`/${currentProduct.category}`}
          className="product-main__top--category"
        >
          {currentProduct.category}
        </Link>
        <Link to="/" className="product-main__icon--slider--right--gray"></Link>
        <p className="product-main__top--name">{currentProduct.name}</p>
      </div>
      <Link to="/" className="product-main__buttons--back">
        <Link to="/" className="product-main__icon--back"></Link>
        <p className="product-main__text--back">Back</p>
      </Link>
      <h1 className="product-main__title">{currentProduct.name}</h1>
      <ProductGallery currentProduct={currentProduct} />
      <ProductInfo
        currentProduct={currentProduct}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
        selectedCapacity={selectedCapacity}
        setSelectedCapacity={setSelectedCapacity}
      />
      <ProductAbout currentProduct={currentProduct} />
      <ProductTechSpecs currentProduct={currentProduct} />
    </div>
  );
};

export default ProductMain;
