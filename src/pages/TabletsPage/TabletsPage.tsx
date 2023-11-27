import './TabletsPage.scss';

import { Product } from '../../types/Product';

type Props = {
  tablets: Product[];
};

export const TabletsPage: React.FC<Props> = ({ tablets }) => {
  return (
    <section className="page__section tablets-page">
      <div className="tablets-page__container">
        <h1 className="tablets-page__title">
          Tablets page
        </h1>

        <div className="tablets-page__description">
          {`${tablets.length} models`}
        </div>

        {!tablets.length && (
          <h2 className="tablets-page__notification">
            Products not found
          </h2>
        )}
      </div>
    </section>
  );
};
