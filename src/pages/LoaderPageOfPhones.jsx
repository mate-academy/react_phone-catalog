import React from 'react';
import Loader from '../components/Loader';
import PageOfPhones from './PageOfPhones';

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
      history
    } = this.props;

    return (
      <div>
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
              />
            )
            : (
              <Loader 
                isLoading={isLoading}
              />
            )
        }
      </div>
    );
  }
}

export default LoaderPageOfPhones;
