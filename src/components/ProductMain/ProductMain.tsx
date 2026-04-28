import './ProductMain.scss';
import { ProductDetails } from '../../pages/productPage/ProductPage';
import ProductGallery from './ProductGallery/ProductGallery';
import ProductInfo from './ProductInfo/ProductInfo';
import ProductAbout from './ProductAbout/ProductAbout';
import { useEffect, useState } from 'react';
import ProductTechSpecs from './ProductTechSpecs/ProductTechSpecs';
import { useNavigate } from 'react-router-dom';
import { FavoriteProduct } from '../../types/FavoriteProduct';
import { BasketProduct } from '../../types/BasketProduct';
import useAppContext from '../../useAppContext';
import ProductTopIcons from './ProductTopIcons/ProductTopIcons';
import { ProductColor } from '../../types/ProductColor';

export type ProductMainProps = {
  someProduct: ProductDetails;
  models: ProductDetails[];
};

const ProductMain = ({ someProduct, models }: ProductMainProps) => {
  const navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState(
    someProduct.colorsAvailable[0] as ProductColor,
  );
  const [selectedCapacity, setSelectedCapacity] = useState(
    someProduct.capacityAvailable[0],
  );

  const [currentProduct, setCurrentProduct] = useState(someProduct);

  const { favorites, baskets, setBaskets, setFavorites } = useAppContext();

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

  const stateProduct: FavoriteProduct = {
    category: currentProduct.category,
    itemId: currentProduct.id,
    name: currentProduct.name,
    fullPrice: currentProduct.priceRegular,
    price: currentProduct.priceDiscount,
    screen: currentProduct.screen,
    capacity: currentProduct.capacity,
    color: currentProduct.color as ProductColor,
    ram: currentProduct.ram,
    image: currentProduct.images[0],
  };

  const isFavorite = favorites.some(p => p.itemId === stateProduct.itemId);
  const isBasket = baskets.some(p => p.itemId === stateProduct.itemId);

  const handleToggleFavorite = () => {
    setFavorites(prev => {
      const exists = prev.some(p => p.itemId === stateProduct.itemId);

      return exists
        ? prev.filter(p => p.itemId !== stateProduct.itemId)
        : [...prev, stateProduct];
    });
  };

  const basketOfProduct: BasketProduct = {
    category: currentProduct.category,
    itemId: currentProduct.id,
    name: currentProduct.name,
    fullPrice: currentProduct.priceRegular,
    price: currentProduct.priceDiscount,
    screen: currentProduct.screen,
    capacity: currentProduct.capacity,
    color: currentProduct.color as ProductColor,
    ram: currentProduct.ram,
    image: currentProduct.images[0],
    quantity: 1,
  };

  const handleToggleBasket = () => {
    setBaskets(prev => {
      const exists = prev.find(p => p.itemId === basketOfProduct.itemId);

      if (exists) {
        return prev.filter(p => p.itemId !== basketOfProduct.itemId);
      }

      return [...prev, { ...basketOfProduct, quantity: 1 }];
    });
  };

  return (
    <div className="product-main">
      <div className="product-main__container">
        <ProductTopIcons currentProduct={currentProduct} />
        <div className="product-main__back-buttons">
          <div
            onClick={() => navigate(-1)}
            className="product-main__icon--back"
          ></div>
          <span className="product-main__text--back">Back</span>
        </div>
        <h1 className="product-main__title">{currentProduct.name}</h1>
        <ProductGallery currentProduct={currentProduct} />
        <ProductInfo
          currentProduct={currentProduct}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          selectedCapacity={selectedCapacity}
          setSelectedCapacity={setSelectedCapacity}
          isFavorite={isFavorite}
          isBasket={isBasket}
          handleToggleFavorite={handleToggleFavorite}
          handleToggleBasket={handleToggleBasket}
        />
        <ProductAbout currentProduct={currentProduct} />
        <ProductTechSpecs currentProduct={currentProduct} />
      </div>
    </div>
  );
};

export default ProductMain;
