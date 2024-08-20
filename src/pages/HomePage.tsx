import { useCallback, useEffect, useState } from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { ProductsSlider } from '../components/ProductsSlider';
import { Product } from '../types/Product';
import { fetchProducts } from '../helper/fetchProducts';

export const HomePage: React.FC = () => {
  const [hotPricesProducts, setHorPricesProducts] = useState<Product[]>([]);
  const [brandNewProducts, setBrandNewProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  const [startBannerIndex, setStartBannerIndex] = useState(0);

  const fetchDataHome = async () => {
    try {
      const fetchedProducts = await fetchProducts();

      const hotPricesProductsData = fetchedProducts.filter(
        product => product.fullPrice - product.price > 0,
      );
      const brandNewProductsData = fetchedProducts.filter(
        product => product.year === 2019,
      );

      hotPricesProductsData.sort((a, b) => {
        const absDiscountValue = (item: Product) => {
          return item.fullPrice - item.price;
        };

        return absDiscountValue(b) - absDiscountValue(a);
      });

      brandNewProductsData.sort(
        (product1, product2) => product2.price - product1.price,
      );

      setHorPricesProducts(hotPricesProductsData);
      setBrandNewProducts(brandNewProductsData);
      setAllProducts(fetchedProducts);
    } catch (error: any) {
      throw new Error(`Error fetching hot price products: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchDataHome();
  }, []);

  const amount = (category: string) => {
    const categoryRow = allProducts.filter(item => item.category === category);

    return categoryRow.length;
  };

  const goLeft = () => {
    if (startBannerIndex === 0) {
      setStartBannerIndex(2);
    } else {
      setStartBannerIndex(prevIndex => prevIndex - 1);
    }
  };

  const goRight = () => {
    if (startBannerIndex === 2) {
      setStartBannerIndex(0);
    } else {
      setStartBannerIndex(prevIndex => prevIndex + 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (startBannerIndex === 2) {
        setStartBannerIndex(0);
      } else {
        setStartBannerIndex(prevIndex => prevIndex + 1);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [startBannerIndex]);

  const handleChangeBanner = useCallback(
    (index: number) => {
      setStartBannerIndex(index);
    },
    [setStartBannerIndex],
  );

  return (
    <>
      <h1 className="main__title title">Welcome to Nice Gadgets store!</h1>
      <div className="main__home">
        <section className="banner">
          <div className="banner__container">
            <button
              type="button"
              className="banner__arrow banner__arrow--left"
              onClick={goLeft}
              aria-label="previous"
            />

            <div className="banner__images">
              <div className="banner__image">
                {startBannerIndex === 0 && (
                  <>
                    <img
                      src="./img/Bannerjpg.jpg"
                      alt="banner-1"
                      className="banner__picture banner__picture--first"
                    />
                    <img
                      src="./img/Banner--mobile.jpg"
                      alt="banner-1"
                      className="banner__picture banner__picture--first-mobile"
                    />
                  </>
                )}
                {startBannerIndex === 1 && (
                  <img
                    src="./img/banner-accessories.png"
                    alt="banner-1"
                    className="banner__picture"
                  />
                )}
                {startBannerIndex === 2 && (
                  <img
                    src="./img/banner-tablets.png"
                    alt="banner-1"
                    className="banner__picture"
                  />
                )}
              </div>
            </div>

            <button
              type="button"
              className="banner__arrow banner__arrow--right"
              onClick={goRight}
              aria-label="previous"
            />
          </div>

          <div className="banner__lines">
            <button
              type="button"
              onClick={() => handleChangeBanner(0)}
              className={cn('banner__line', {
                'banner__line--active': startBannerIndex === 0,
              })}
            />
            <button
              type="button"
              onClick={() => handleChangeBanner(1)}
              className={cn('banner__line', {
                'banner__line--active': startBannerIndex === 1,
              })}
            />
            <button
              type="button"
              onClick={() => handleChangeBanner(2)}
              className={cn('banner__line', {
                'banner__line--active': startBannerIndex === 2,
              })}
            />
          </div>
        </section>

        <section className="slider">
          <ProductsSlider products={hotPricesProducts} unitName="Hot Prices" />
        </section>

        <section className="shop">
          <h2 className="title-subtitle shop__name">Shop by category</h2>
          <div className="shop__container" data-cy="categoryLinksContainer">
            <Link
              to="/phones"
              className="shop__category shop__category--phones"
            >
              <img
                src="./img/Phones.png"
                alt="Mobile-category-img"
                className="shop__image"
              />
              <h3 className="shop__category-name">Mobile phones</h3>
              <p className="shop__category-amount">{`${amount('phones')} models`}</p>
            </Link>

            <Link
              to="/tablets"
              className="shop__category shop__category--tablets"
            >
              <img
                src="./img/Tablets.png"
                alt="Mobile-category-img"
                className="shop__image"
              />
              <h3 className="shop__category-name">Tablets</h3>
              <p className="shop__category-amount">{`${amount('tablets')} models`}</p>
            </Link>

            <Link
              to="/accessories"
              className="shop__category shop__category--accessories"
            >
              <img
                src="./img/Accessories.png"
                alt="Mobile-category-img"
                className="shop__image"
              />
              <h3 className="shop__category-name">Accessories</h3>
              <p className="shop__category-amount">{`${amount('accessories')} models`}</p>
            </Link>
          </div>
        </section>

        <section className="slider">
          <ProductsSlider
            products={brandNewProducts}
            unitName="Brand new models"
          />
        </section>
      </div>
    </>
  );
};
