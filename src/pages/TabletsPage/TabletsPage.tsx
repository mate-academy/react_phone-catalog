import { useProducts } from 'context';
import {
  BackButton,
  BreadCrumbs,
  Loader,
  Sorry,
  Wrapper,
} from 'components';
import './TabletsPage.scss';

export const TabletsPage = () => {
  const { filteredTablets, loading } = useProducts();

  return (
    <Wrapper>
      {loading
        ? (
          <Loader />
        )
        : (
          <div className="tablets">
            <div className="tablets__path-container">
              <BreadCrumbs />
            </div>

            <div className="tablets__back-button-container">
              <BackButton />
            </div>

            <div className="tablets__heading">
              <h1 className="tablets__title">Tablets</h1>
              <p
                className="tablets__quantity"
              >
                {`${filteredTablets.length} items`}
              </p>
            </div>

            {filteredTablets && !filteredTablets.length && (
              <Sorry type="tablets" />
            )}
          </div>
        )}
    </Wrapper>
  );
};
