import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Banner } from '../../components/Banner';
import { ProductsSlider } from '../../components/ProductsSlider';
import * as productsService from '../../services/productsService';
import { Product } from '../../types/Product';
import './HomePage.scss';

export const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [hotPriceProducts, setHotPriceProducts] = useState<Product[]>([]);
  const [brandNewProducts, setBrandNewProducts] = useState<Product[]>([]);

  const [phones, tablets, accessories] = useMemo(() => {
    const phonesCount = products
      .filter(product => product.type === 'phone').length;
    const tabletsCount = products
      .filter(product => product.type === 'tablet').length;
    const accessoriesCount = products
      .filter(product => product.type === 'accessory').length;

    return [phonesCount, tabletsCount, accessoriesCount];
  }, [products]);

  useEffect(() => {
    productsService.getProducts()
      .then(setProducts);

    productsService.getHotPriceProducts()
      .then(setHotPriceProducts);

    productsService.getBrandNewProducts()
      .then(setBrandNewProducts);
  }, []);

  return (
    <>
      <section className="HomePage__banner">
        <Banner />
      </section>

      <section className="HomePage__section">
        <h1 className="HomePage__section-title">Hot prices</h1>
        <ProductsSlider products={hotPriceProducts} />
      </section>

      <section className="HomePage__section">
        <h1 className="HomePage__section-title">Shop by category</h1>

        <div className="categories" data-cy="categoryLinksContainer">
          <div className="categories__category">
            <Link to="/phones" className="categories__link">
              <img
                src="./img/products/phones.png"
                alt="Mobile phones"
                className="categories__link-image"
              />

              <h3 className="categories__title">Mobile phones</h3>
              <p className="categories__text">{`${phones} models`}</p>
            </Link>
          </div>

          <div className="categories__category">
            <Link to="/tablets" className="categories__link">
              <img
                src="./img/products/tablets.png"
                alt="Tablets"
                className="categories__link-image"
              />

              <h3 className="categories__title">Tablets</h3>
              <p className="categories__text">{`${tablets} models`}</p>
            </Link>
          </div>

          <div className="categories__category">
            <Link to="/accessories" className="categories__link">
              <img
                src="./img/products/accessories.png"
                alt="Accessories"
                className="categories__link-image"
              />

              <h3 className="categories__title">Accessories</h3>
              <p className="categories__text">{`${accessories} models`}</p>
            </Link>
          </div>
        </div>
      </section>

      <section className="HomePage__section">
        <h1 className="HomePage__section-title">Brand new models</h1>
        <ProductsSlider products={brandNewProducts} />
      </section>
    </>
  );
};
