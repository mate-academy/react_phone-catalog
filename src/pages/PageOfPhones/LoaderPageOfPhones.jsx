import React from 'react';
import Loader from '../../components/Loader/Loader';
import PageOfPhones from './PageOfPhones';
import PropTypes from 'prop-types';

class LoaderPageOfPhones extends React.Component {
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
              <PageOfPhones
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

LoaderPageOfPhones.propTypes = {
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

export default LoaderPageOfPhones;
