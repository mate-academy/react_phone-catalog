import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Banner } from '../Banner/Banner';
import { getProducts } from '../../api/products';
import { ProductSlider } from '../ProductsSlider/ProductsSlider';
import { Category } from '../Category/Category';

export const HomePage = ({ phonesQuantity, tabletsQuantity }) => {

  const [hotPrices, setHotPrices] = useState([]);
  const [brandNew, setBrandNew] = useState([])
  const calculateDiscount = useCallback((price, discount) => {
    return price * (discount / 100);
  }, []);

  useEffect(() => {
    getProducts().then(response => (
      setHotPrices(response.filter(product => product.discount)
        .sort((a, b) => (
          calculateDiscount(b.price, b.discount) -
          calculateDiscount(a.price, a.discount)))
      ),
      setBrandNew(response.filter(product => !product.discount)
        .sort((a, b) => b.price - a.price))));

  }, []);

  const categories = useMemo(
    () => [
      {
        category: "mobile phones",
        quantity: phonesQuantity,
      },
      {
        category: "tablets",
        quantity: tabletsQuantity,
      },
      {
        category: "accessories",
        quantity: 0,
      }],
    []);

  return (
    <div className="home-page">
      <Banner />
      <section className="section section_hot-prices">
        <div className="section__top">
          <h2 className="section__heading heading">Hot prices</h2>
        </div>
        <div className="container container_products">
          <ProductSlider products={hotPrices} />
        </div>
      </section>

      <section className="section section_categories">
        <h2 className="heading section__heading section__heading_categories">Shop by category</h2>
        <div className="container container_category">
          {categories.map((item, index) => (
            <React.Fragment key={item.category}>
              <Category
                name={item.category}
                quantity={item.quantity}
                position={index + 1}
              />
            </React.Fragment>
          ))}
        </div>
      </section>
      <section className="section section_new-models">
        <div className="section__top">
          <h2 className="section__heading heading">Brand new models</h2>
        </div>
        <div className="container container_products">
          <ProductSlider products={brandNew} />
        </div>
      </section>
    </div>
  );
}