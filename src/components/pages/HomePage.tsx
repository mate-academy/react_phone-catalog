import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import SectionTopBar from '../Blocks/SectionTopBar';
import BrowseProducts from '../Blocks/BrowseProducts';

import { ProductType, getProducts } from '../../api/getProducts';

import { Product } from '../../types/Phone';

const productsAmountInfo = (products: Product[] | undefined) => {
  if (products?.length === 0 || !products) {
    return 'No models yet';
  }

  if (products.length === 1) {
    return '1 model';
  }

  return `${products.length} models`;
};

const HomePage = () => {
  const [products, setProducts] = useState<Product[] | null>(null);

  const [currentIndexOfHot, setCurrentIndexOfHot] = useState(0);
  const [currentIndexOfNew, setCurrentIndexOfNew] = useState(0);
  const productsPerPage = 4;

  useEffect(() => {
    getProducts().then((productsFromAPI) => setProducts(productsFromAPI));
  }, []);

  const productsWithDiscount = useMemo(
    () => products?.filter((product) => product.discount > 0),
    [products],
  );

  const newProducts = useMemo(
    () => products?.filter((product) => product.discount === 0),
    [products],
  );

  const phones = useMemo(
    () => products?.filter((product) => product.type === ProductType.PHONE),
    [products],
  );

  const tablets = useMemo(
    () => products?.filter((product) => product.type === ProductType.TABLET),
    [products],
  );

  const accessories = useMemo(
    () => products?.filter((product) => product.type === ProductType.ACCESSORY),
    [products],
  );

  return (
    <main className="main container">
      <section className="section">
        <SectionTopBar
          title="Hot prices"
          currentIndex={currentIndexOfHot}
          setCurrentIndex={setCurrentIndexOfHot}
          productsPerPage={productsPerPage}
          filteredProducts={productsWithDiscount || []}
        />

        <BrowseProducts
          visibleProducts={productsWithDiscount || []}
          index={currentIndexOfHot}
        />
      </section>

      <section className="section">
        <h2 className="section__title categories-title">Shop by category</h2>

        <div className="categories" data-cy="categoryLinksContainer">
          <article className="categories__mobile">
            <Link to="/phones">
              <div className="categories__mobile--photo category-photo" />
            </Link>

            <h3 className="categories__title">Mobile phones</h3>

            <p className="categories__amount">
              {productsAmountInfo(phones as Product[])}
            </p>
          </article>

          <article className="categories__tablets">
            <Link to="/tablets">
              <div className="categories__tablets--photo category-photo" />
            </Link>

            <h3 className="categories__title">Tablets</h3>

            <p className="categories__amount">
              {productsAmountInfo(tablets as Product[])}
            </p>
          </article>

          <article className="categories__accessories">
            <Link to="/accessories">
              <div className="categories__accessories--photo category-photo" />
            </Link>

            <h3 className="categories__title">Accessories</h3>

            <p className="categories__amount">
              {productsAmountInfo(accessories as Product[])}
            </p>
          </article>
        </div>
      </section>

      <section className="section">
        <SectionTopBar
          title="Brand new models"
          currentIndex={currentIndexOfNew}
          setCurrentIndex={setCurrentIndexOfNew}
          productsPerPage={productsPerPage}
          filteredProducts={newProducts || []}
        />

        <BrowseProducts
          visibleProducts={newProducts || []}
          index={currentIndexOfNew}
        />
      </section>
    </main>
  );
};

export default HomePage;
