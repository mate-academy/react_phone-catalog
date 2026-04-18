import './ProductMain.scss';
import { ProductDetails } from '../../pages/productPage/ProductPage';
import ProductGallery from './ProductGallery/ProductGallery';
import ProductInfo from './ProductInfo/ProductInfo';
import ProductAbout from './ProductAbout/ProductAbout';
import { useEffect, useState } from 'react';
import ProductTechSpecs from './ProductTechSpecs/ProductTechSpecs';
import { Link, useNavigate } from 'react-router-dom';
import { FavoriteProduct } from '../../types/FavoriteProduct';
import { BasketProduct } from '../../types/BasketProduct';

export type ProductMainProps = {
  someProduct: ProductDetails;
  models: ProductDetails[];
  setFavorites: React.Dispatch<React.SetStateAction<FavoriteProduct[]>>;
  favorites: FavoriteProduct[];
  baskets: BasketProduct[];
  setBaskets: React.Dispatch<React.SetStateAction<BasketProduct[]>>;
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

const ProductMain = ({
  someProduct,
  models,
  setFavorites,
  favorites,
  baskets,
  setBaskets,
}: ProductMainProps) => {
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
      const existing = prev.find(p => p.itemId === basketOfProduct.itemId);

      if (existing) {
        return prev.map(p =>
          p.itemId === basketOfProduct.itemId
            ? { ...p, quantity: p.quantity + 1 }
            : p,
        );
      }

      return [...prev, basketOfProduct];
    });
  };

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
        <span className="product-main__icon--back"></span>
      </Link>
      <p className="product-main__text--back">Back</p>
      <h1 className="product-main__title">{currentProduct.name}</h1>
      <ProductGallery currentProduct={currentProduct} />
      <ProductInfo
        currentProduct={currentProduct}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
        selectedCapacity={selectedCapacity}
        setSelectedCapacity={setSelectedCapacity}
        setFavorites={setFavorites}
        isFavorite={isFavorite}
        isBasket={isBasket}
        handleToggleFavorite={handleToggleFavorite}
        handleToggleBasket={handleToggleBasket}
      />
      <ProductAbout currentProduct={currentProduct} />
      <ProductTechSpecs currentProduct={currentProduct} />
    </div>
  );
};

export default ProductMain;
