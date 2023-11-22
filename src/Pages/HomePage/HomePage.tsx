import './HomePage.scss';
import { Product } from '../../types/productType';
import { Carousel } from '../../components/Carousel/Carousel';
import { ProductSlider } from '../../components/ProductSlider/ProductSlider';
import { Category } from '../../components/Category/Category';
import { CartItem } from '../../types/cartType';

type Props = {
  products: Product[],
  phones: Product[],
  tablets: Product[],
  accessories: Product[],
  setFavorites: React.Dispatch<React.SetStateAction<Product[]>>,
  favorites: Product[],
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>
};

export const HomePage: React.FC<Props> = ({
  products,
  phones,
  tablets,
  accessories,
  setFavorites,
  favorites,
  cartItems,
  setCartItems,
}) => {
  const brandNewProducts = [...products].sort((a, b) => b.price - a.price);

  return (
    <div className="home-page">
      <div className="home-page__carousel">
        <Carousel />
      </div>
      <div className="home-page__hot-price">
        <ProductSlider
          products={products}
          title="Hot Price"
          step={1}
          itemWidth={286}
          animationDuration={500}
          infinite={false}
          setFavorites={setFavorites}
          favorites={favorites}
          cartItems={cartItems}
          setCartItems={setCartItems}
        />
      </div>
      <Category
        phones={phones}
        tablets={tablets}
        accessories={accessories}
      />

      <div className="home-page__new-brend">
        <ProductSlider
          products={brandNewProducts}
          title="Brand new models"
          step={1}
          itemWidth={286}
          animationDuration={500}
          infinite={false}
          setFavorites={setFavorites}
          favorites={favorites}
          cartItems={cartItems}
          setCartItems={setCartItems}
        />
      </div>
    </div>
  );
};
