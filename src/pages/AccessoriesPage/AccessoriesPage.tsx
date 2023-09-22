import { useProducts } from 'context';
import {
  BackButton,
  BreadCrumbs,
  Loader,
  Sorry,
  Wrapper,
} from 'components';
import './AccessoriesPage.scss';

export const AccessoriesPage = () => {
  const { filteredAccessories, loading } = useProducts();

  return (
    <Wrapper>
      {loading
        ? (
          <Loader />
        )
        : (
          <div className="accessories">
            <div className="accessories__path-container">
              <BreadCrumbs />
            </div>

            <div className="accessories__back-button-container">
              <BackButton />
            </div>

            <div className="accessories__heading">
              <h1 className="accessories__title">Accessories</h1>
              <p
                className="accessories__quantity"
              >
                {`${filteredAccessories.length} items`}
              </p>
            </div>

            {filteredAccessories && !filteredAccessories.length && (
              <Sorry type="accessories" />
            )}
          </div>
        )}
    </Wrapper>
  );
};
