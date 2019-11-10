import React from 'react';
import Loader from '../components/Loader';
import PageOfPhones from './PageOfPhones';

class LoaderPagePhones extends React.Component {
  componentDidMount = () => {
    this.props.loadDataPhones();
  };

  render() {
    const {
      phones,
      isLoading,
      isLoaded,
      addItemToBasket,
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

export default LoaderPagePhones;
