import React from 'react';
import Loader from '../../components/Loader/Loader';
import Phones from './phones';
import PropTypes from 'prop-types';

class LoaderOfPhones extends React.Component {
  componentDidMount = () => {
    this.props.loadDataPhones();
  };

  render() {
    const {
      phones,
      isLoading,
      isLoaded,
      addItemToBasket,
      location,
      history,
      itemsInBasket
    } = this.props;

    console.log(itemsInBasket);

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
  }
}

LoaderOfPhones.propTypes = {
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
