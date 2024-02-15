import './PhonesPage.scss';
import { useContext } from 'react';
import { BreadCrumbs } from '../../components/BreadCrumbs';
import { ProductCard } from '../../components/ProductCard';
import { StateContext } from '../../store/State';
import { getPhones } from '../../helpers/productsHelpers';

export const PhonesPage = () => {
  const { allProducts } = useContext(StateContext);

  const phones = getPhones(allProducts);

  return (
    <div className="phones-page">
      <header className="phones-page__header">
        <div className="phones-page__breadcrumb">
          <BreadCrumbs />
        </div>

        <h1 className="phones-page__title">Mobile phones</h1>

        <p className="phones-page__counter">95 models</p>
      </header>

      <main>
        <section className="product-list" data-cy="productList">
          <div> Filters</div>

          <div className="product-list__item">
            {phones.map(item => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>

          <nav className="pagination" data-cy="pagination">
            <ul className="pagination-list">
              <li>
                {/* <a className="pagination-link is-current">1</a> */}
              </li>
              <li>
                {/* <a className="pagination-link" aria-label="Goto page 2">2</a> */}
              </li>
              <li>
                {/* <a className="pagination-link" aria-label="Goto page 3">3</a> */}
              </li>
            </ul>
          </nav>
        </section>
      </main>
    </div>
  );
};
