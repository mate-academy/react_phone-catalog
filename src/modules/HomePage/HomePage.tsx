import ProductsSlider from '../../ProductsSlider';
import { ProductType } from '../../types/product';
import SliderHeader from '../../SliderHeader';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getDevices } from '../../services/device';

function sortByPrice(products: ProductType[], sortBy: string) {
  const readyProducts = [...products];

  if (sortBy) {
    readyProducts.sort((product1, product2) => {
      switch (sortBy) {
        case 'fullPrice':
          return (product2.fullPrice ?? 0) - (product1.fullPrice ?? 0);

        case 'discount':
          return +product2.price - +product1.price;

        default:
          return 0;
      }
    });
  }

  return readyProducts;
}

function filteredBy(products: ProductType[], filterBy: string) {
  const readyProducts = [...products];

  const filterProducts = readyProducts.filter(
    product => product.category === filterBy,
  );

  return filterProducts;
}

export const HomePage = () => {
  const [devices, setDevices] = useState<ProductType[]>([]);

  useEffect(() => {
    getDevices()
      .then(products => {
        setDevices(products);
      })
      .catch(() => {})
      .finally(() => {});
  }, []);
  const sortedProductsByPrice = sortByPrice(devices, 'fullPrice');
  const sortedProductsByDiscount = sortByPrice(devices, 'discount');
  const filteredPhones = filteredBy(devices, 'phones');
  const filteredTablets = filteredBy(devices, 'tablets');
  const filteredAccessories = filteredBy(devices, 'accessories');

  return (
    <main className="main">
      <section className="slider-header">
        <div className="container">
          <h1 className="slider-header__title title--biggest">
            Welcome to Nice Gadgets store!
          </h1>
        </div>

        <div className="slider-header__bottom">
          <div className="container container--hide">
            <SliderHeader />
          </div>
        </div>
      </section>
      <section className="new-models">
        <div className="slider-product">
          <div className="container container--relative">
            <h2 className="new-models__title title">Brand new models</h2>
            <ProductsSlider products={sortedProductsByPrice} />
          </div>
        </div>
      </section>

      <section className="category">
        <div className="container">
          <h2 className="category__title title">Shop by category</h2>
          <div className="category__container">
            <div className="category__card types">
              <Link to="/phones" className="types__link types__link--phones">
                <img
                  src="img/category-phones.webp"
                  alt=""
                  className="types__foto"
                />
              </Link>
              <Link to="/phones" className="types__name title-h3">
                Mobile phones
              </Link>
              <p
                className="
                body-text-600 
                body-text-600--gray 
                body-text-600--gray-homepage"
              >
                {`${filteredPhones.length} models`}
              </p>
            </div>
            <div className="category__card types">
              <Link to="/tablets" className="types__link types__link--tablets">
                <img
                  src="img/category-tablets.webp"
                  alt=""
                  className="types__foto"
                />
              </Link>
              <Link to="/tablets" className="types__name title-h3">
                Tablets
              </Link>
              <p
                className="
                body-text-600 
                body-text-600--gray 
                body-text-600--gray-homepage"
              >
                {`${filteredTablets.length} models`}
              </p>
            </div>
            <div className="category__card types">
              <Link
                to="/accessories"
                className="types__link types__link--tablets"
              >
                <img
                  src="img/category-accessories.png"
                  alt=""
                  className="types__foto"
                />
              </Link>
              <Link to="/accessories" className="types__name title-h3">
                Accessories
              </Link>
              <p
                className="
                body-text-600 
                body-text-600--gray 
                body-text-600--gray-homepage"
              >
                {`${filteredAccessories.length} models`}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="hot-prices">
        <div className="slider-product">
          <div className="container container--relative">
            <h2 className="hot-prices__title title">Hot prices</h2>
            <ProductsSlider
              products={sortedProductsByDiscount}
              isHotPrices={true}
            />
          </div>
        </div>
      </section>
    </main>
  );
};
