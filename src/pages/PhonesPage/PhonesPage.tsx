import './PhonesPage.scss';

import { Product } from '../../types/Product';
import { ProductList } from '../../components/ProductList';
import { Breadcrumbs } from '../../components/Breadcrumbs';

type Props = {
  phones: Product[],
  addProductToCart: (product: Product) => void,
};

export const PhonesPage: React.FC<Props> = ({
  phones,
  addProductToCart,
}) => {
  return (
    <>
      <section className="page__section phones-page">
        <div className="phones-page__container">
          <div className="phones-page__navigate">
            <Breadcrumbs />
          </div>

          <h1 className="phones-page__title">
            Mobile phones
          </h1>

          <div className="phones-page__description">
            {`${phones.length} models`}
          </div>

          <div className="phones-page__product-list">
            <ProductList
              products={phones}
              addProductToCart={addProductToCart}
              data-cy="productList"
            />
          </div>
        </div>
      </section>
    </>
  );
};
