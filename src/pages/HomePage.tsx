import { NavLink } from 'react-router-dom';
import { HOT_PRICE, NEW_MODELS } from '../helpers/SliderTitle';
import { Product } from '../types/Product';
import { ProductSlider } from '../components/ProductsSlider';
import { BannerSlider } from '../components/BannerSlider';
import { CartItem } from '../types/CartItem';

type Props = {
  products: Product[];
  productsWithDiscount: Product[];
  productsWithoutDiscount: Product[];
  setCartItems: (item: CartItem[]) => void;
  cartItems: CartItem[];
  favourites: Product[];
  setFavourites: (products: Product[]) => void;
};
export const HomePage: React.FC<Props> = ({
  products,
  productsWithDiscount,
  productsWithoutDiscount,
  setCartItems,
  cartItems,
  favourites,
  setFavourites,
}) => {
  const tablets = products.filter((product) => product.type === 'tablet');
  const mobiles = products.filter((product) => product.type === 'phone');
  const accessories = products.filter(
    (product) => product.type === 'accessory',
  );

  return (
    <div className="homepage">
      <div className="homepage__banner">
        <BannerSlider />
      </div>

      <div className="homepage__slider-hot-prices">
        <ProductSlider
          products={productsWithDiscount}
          sliderTitle={HOT_PRICE}
          setCartItems={setCartItems}
          cartItems={cartItems}
          favourites={favourites}
          setFavourites={setFavourites}
        />
      </div>

      <div className="homepage__shop-by-category">
        <div className="shop-by-category" data-cy="categoryLinksContainer">
          <h1 className="shop-by-category__title">Shop by category</h1>
          <nav className="shop-by-category__nav">
            <NavLink to="/phones" className="shop-by-category__link">
              <img
                src="img/category-phones.png"
                className="shop-by-category__photo"
                alt="category-mobile"
              />
              <div className="shop-by-category__description">
                <h3 className="shop-by-category__description-title">
                  Mobile phones
                </h3>
                <p className="shop-by-category__description-count">{`${mobiles.length} models`}</p>
              </div>
            </NavLink>

            <NavLink to="/tablets" className="shop-by-category__link">
              <img
                src="img/category-tablets.png"
                className="shop-by-category__photo"
                alt="category-tablets"
              />
              <div className="shop-by-category__description">
                <h3 className="shop-by-category__description-title">Tablets</h3>
                <p className="shop-by-category__description-count">{`${tablets.length} models`}</p>
              </div>
            </NavLink>

            <NavLink to="/accessories" className="shop-by-category__link">
              <img
                src="img/category-accessories.png"
                className="shop-by-category__photo"
                alt="category-accessories"
              />
              <div className="shop-by-category__description">
                <h3 className="shop-by-category__description-title">
                  Accessories
                </h3>
                <p className="shop-by-category__description-count">{`${accessories.length} models`}</p>
              </div>
            </NavLink>
          </nav>
        </div>
      </div>

      <div className="homepage__slider-new-brand">
        <ProductSlider
          products={productsWithoutDiscount}
          sliderTitle={NEW_MODELS}
          setCartItems={setCartItems}
          cartItems={cartItems}
          favourites={favourites}
          setFavourites={setFavourites}
        />
      </div>
    </div>
  );
};
