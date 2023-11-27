import './AccessoriesPage.scss';
import { Product } from '../../types/Product';

type Props = {
  accessories: Product[];
};

export const AccessoriesPage: React.FC<Props> = ({ accessories }) => {
  return (
    <section className="page__section accessories-page">
      <div className="accessories-page__container">
        <h1 className="accessories-page__title">
          Accessosies page
        </h1>

        <div className="accessories-page__description">
          {`${accessories.length} models`}
        </div>

        {!accessories.length && (
          <h2 className="accessories-page__notification">
            Products not found
          </h2>
        )}
      </div>
    </section>
  );
};
