import { useContext, useEffect } from 'react';
import { WelcomeSlider } from './components/WelcomeSlider';
import homePage from './HomePage.module.scss';
import { ProductsContext } from '../../context/ProductsContext';
import { ProductsSlider } from './components/ProductsSlider';
import { getAllProducts } from '../../api/getProducts';
import { BlockTitle } from '../../types/BlockTitle';

export const HomePage: React.FC = () => {
  const { allProducts, setAllProducts } = useContext(ProductsContext);

  useEffect(() => {
    getAllProducts()
      .then(response => setAllProducts(response))
      .catch(() => {
        'error';
      })
      .finally(() => {
        // eslint-disable-next-line no-console
        console.log('Products fetched successfully');
      });
  }, [setAllProducts]);

  const gadgetsCount = (category: string) => {
    return allProducts.filter(product => product.category === category).length;
  };

  return (
    <div className={homePage['home-page']}>
      <WelcomeSlider />
      <div
        className={`${homePage['new-models']} ${homePage['home-page__block']}`}
      >
        <ProductsSlider
          products={allProducts}
          title={BlockTitle.BrandNewModels}
          sortBy="year"
        />
      </div>
      <div className={homePage.categories}>
        <h2 className={homePage.subtitle}>Shop by category</h2>
        <ul className={homePage.categories__list}>
          <li className={homePage.categories__item}>
            <div
              className={`${homePage['image-wrapper']} ${homePage['image-wrapper--phones']}`}
            >
              <a href="/phones" className={homePage.link}>
                <img
                  src={'img/category-phones.webp'}
                  alt="Category Phones"
                  className={`${homePage.image} ${homePage['image--phones']}`}
                />
              </a>
            </div>
            <a href="/phones" className={homePage['link-category-info']}>
              <span className={homePage['category-name']}>Mobile phones</span>
              <span
                className={homePage['category-quantity']}
              >{`${gadgetsCount('phones')} models`}</span>
            </a>
          </li>
          <li className={homePage.categories__item}>
            <div
              className={`${homePage['image-wrapper']} ${homePage['image-wrapper--tablets']}`}
            >
              <a href="/tablets" className={homePage.link}>
                <img
                  src={'img/category-tablets.png'}
                  alt="Category Tablets"
                  className={`${homePage.image} ${homePage['image--tablets']}`}
                />
              </a>
            </div>
            <a href="/tablets" className={homePage['link-category-info']}>
              <span className={homePage['category-name']}>Tablets</span>
              <span
                className={homePage['category-quantity']}
              >{`${gadgetsCount('tablets')} models`}</span>
            </a>
          </li>
          <li className={homePage.categories__item}>
            <div
              className={`${homePage['image-wrapper']} ${homePage['image-wrapper--accessories']}`}
            >
              <a href="/accessories" className={homePage.link}>
                <img
                  src={'img/category-accessories.png'}
                  alt="Category Accessories"
                  className={`${homePage.image} ${homePage['image--accessories']}`}
                />
              </a>
            </div>
            <a href="/accessories" className={homePage['link-category-info']}>
              <span className={homePage['category-name']}>Mobile phones</span>
              <span
                className={homePage['category-quantity']}
              >{`${gadgetsCount('accessories')} models`}</span>
            </a>
          </li>
        </ul>
      </div>
      <div
        className={`${homePage['hot-prices']} ${homePage['home-page__block']}`}
      >
        <ProductsSlider
          products={allProducts}
          title={BlockTitle.HotPrices}
          sortBy="hot-price"
          showDiscount={true}
        />
      </div>
    </div>
  );
};
