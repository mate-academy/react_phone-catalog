import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Loader from '../../components/Loader/Loader';
import Phones from './phones';

const LoaderOfPhones = ({
  phones,
  isLoading,
  isLoaded,
  addItemToBasket,
  location,
  history,
  itemsInBasket,
  loadDataPhones,
}) => {
  useEffect(() => {
    loadDataPhones();
  }, [loadDataPhones]);

  return (
    <main className="wrapper__main">
      {
        isLoaded
          ? (
            <Phones
              addItemToBasket={addItemToBasket}
              phones={phones}
              isLoading={isLoading}
              isLoaded={isLoaded}
              location={location}
              history={history}
              itemsInBasket={itemsInBasket}
            />
          )
          : (
            <Loader
              isLoading={isLoading}
            />
          )
      }
    </main>
  );
};

LoaderOfPhones.propTypes = {
  loadDataPhones: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isLoaded: PropTypes.bool.isRequired,
  phones: PropTypes.arrayOf(PropTypes.shape({
    age: PropTypes.number,
    id: PropTypes.string,
    imageURL: PropTypes.string,
    name: PropTypes.string,
    snippet: PropTypes.string,
  })).isRequired,
  addItemToBasket: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
  itemsInBasket: PropTypes.arrayOf(PropTypes.shape({
    age: PropTypes.number,
    id: PropTypes.string,
    imageURL: PropTypes.string,
    name: PropTypes.string,
    snippet: PropTypes.string,
  })).isRequired,
};

export default LoaderOfPhones;
