/* eslint-disable max-len */
import { useEffect, useMemo, useState } from 'react';
import { getNewProducts, getProductsWithDiscount } from '../../api/getProducts';
import SectionTopBar from '../SectionTopBar';
import ProductCard from '../ProductCard';
import { Product } from '../../types/Phone';

const Main = () => {
  const [
    productsWithDiscount,
    setProductsWithDiscount,
  ] = useState<Product[] | null>(null);

  const [
    newProducts,
    setNewProducts,
  ] = useState<Product[] | null>(null);

  const [currentIndexOfHot, setCurrentIndexOfHot] = useState(0);
  const [currentIndexOfNew, setCurrentIndexOfNew] = useState(0);
  const productsPerPage = 4;

  useEffect(() => {
    getProductsWithDiscount().then((productsFromAPI) => setProductsWithDiscount(productsFromAPI));
    getNewProducts().then((productsFromAPI) => setNewProducts(productsFromAPI));
  }, []);

  const visibleHotPrices = useMemo(() => productsWithDiscount?.slice(
    currentIndexOfHot, currentIndexOfHot + productsPerPage,
  ),
  [productsWithDiscount, currentIndexOfHot]);

  const visibleNew = useMemo(() => newProducts?.slice(
    currentIndexOfNew, currentIndexOfNew + productsPerPage,
  ),
  [newProducts, currentIndexOfNew]);

  return (
    <main className="main container">
      <section className="section">
        <SectionTopBar
          title="Hot prices"
          // productsLength={productsWithDiscount?.length || 0}
          currentIndex={currentIndexOfHot}
          setCurrentIndex={setCurrentIndexOfHot}
          productsPerPage={productsPerPage}
          filteredProducts={productsWithDiscount || []}
        />

        <div className="browse-products">
          {visibleHotPrices?.map((product: Product) => {
            return <ProductCard key={product.id} product={product} />;
          })}
        </div>
      </section>

      <section className="section">
        <h2 className="section__title categories-title">Shop by category</h2>

        <div className="categories">
          <article className="categories__mobile">
            <div className="categories__mobile--photo category-photo" />

            <h3 className="categories__title">Mobile phones</h3>

            <p className="categories__amount">
              95 models
            </p>
          </article>

          <article className="categories__tablets">
            <div className="categories__tablets--photo category-photo" />

            <h3 className="categories__title">Tablets</h3>

            <p className="categories__amount">
              24 models
            </p>
          </article>

          <article className="categories__accessories">
            <div className="categories__accessories--photo category-photo" />

            <h3 className="categories__title">Accessories</h3>

            <p className="categories__amount">
              100 models
            </p>
          </article>
        </div>
      </section>

      <section className="section">
        <SectionTopBar
          title="Brand new models"
          // productsLength={newProducts?.length || 0}
          currentIndex={currentIndexOfNew}
          setCurrentIndex={setCurrentIndexOfNew}
          productsPerPage={productsPerPage}
          filteredProducts={newProducts || []}
        />

        <div className="browse-products">
          {visibleNew?.slice(0, 4).map((product: Product) => {
            return <ProductCard key={product.id} product={product} />;
          })}
        </div>
      </section>
    </main>
  );
};

export default Main;
