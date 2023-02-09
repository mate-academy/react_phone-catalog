import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.scss';
import { ProductsSlider } from '../../components/ProductsSlider/ProductsSlider';
import { Slider } from '../../components/Slider/Slider';
import { Product } from '../../types/Product';
import { getProducts } from '../../helpers/api';

export const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [hotPricesProducts, setHotPricesProducts]
    = useState<Product[] | null>(null);
  const [brandNewProducts, setBrandNewProducts]
    = useState<Product[] | null>(null);

  const phonesQuantity
    = products?.filter(product => product.type === 'phone').length;
  const tabletsQuantity
    = products?.filter(product => product.type === 'tablet').length;
  const accessoriesQuantity
    = products?.filter(product => product.type === 'accessory').length;

  const loadProducts = async () => {
    const productsFromServer = await getProducts();

    setProducts(productsFromServer);
  };

  const getHotPricesProducts = () => {
    if (products) {
      const discountedProducts = products.filter(product => product.discount);

      discountedProducts.sort((a, b) => b.discount - a.discount);

      setHotPricesProducts(discountedProducts);
    }
  };

  const getBrandNewProducts = () => {
    if (products) {
      const noDiscountProducts = products.filter(product => !product.discount);

      noDiscountProducts.sort((a, b) => b.price - a.price);

      setBrandNewProducts(noDiscountProducts);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    getHotPricesProducts();
    getBrandNewProducts();
  }, [products]);

  const images = [
    './slider/banner-phones.png',
    './slider/banner-tablets.png',
    './slider/banner-accessories.png',
    './slider/banner-iphone.png',
    './slider/banner-galaxy.png',
  ];

  return (
    <>
      <div className="container">
        <section className="home-page__slider">
          <Slider images={images} infinite />
        </section>

        <section className="home-page__section">
          <ProductsSlider
            title="Hot prices"
            products={hotPricesProducts}
          />
        </section>

        <section className="home-page__section categories">
          <h1 className="title title--h1">
            Shop by category
          </h1>

          <div className="categories__list">
            <Link
              to="/phones"
              className="categories__card"
              data-cy="categoryLinksContainer"
            >
              <div className="categories__image">
                <img
                  src="./categories/category-phones.png"
                  alt="category"
                  className="categories__photo"
                />
              </div>
              <h3 className="title__h3 title__h3--primary categories__title">
                Mobile Phones
              </h3>
              <p className="text__body--primary categories__quantity">
                {`${phonesQuantity} models`}
              </p>
            </Link>
            <Link
              to="/tablets"
              className="categories__card"
              data-cy="categoryLinksContainer"
            >
              <div className="categories__image">
                <img
                  src="./categories/category-tablets.png"
                  alt="category"
                  className="categories__photo"
                />
              </div>
              <h3 className="title__h3 title__h3--primary categories__title">
                Tablets
              </h3>
              <p className="text__body--primary categories__quantity">
                {`${tabletsQuantity} models`}
              </p>
            </Link>
            <Link
              to="/accessories"
              className="categories__card"
              data-cy="categoryLinksContainer"
            >
              <div className="categories__image">
                <img
                  src="./categories/category-accessories.png"
                  alt="category"
                  className="categories__photo"
                />
              </div>
              <h3 className="title__h3 title__h3--primary categories__title">
                Accessories
              </h3>
              <p className="text__body--primary categories__quantity">
                {`${accessoriesQuantity} models`}
              </p>
            </Link>
          </div>
        </section>

        <section className="home-page__section">
          <ProductsSlider
            title="Brand new models"
            products={brandNewProducts}
          />
        </section>
      </div>
    </>
  );
};
