import React from 'react';
import Loader from '../components/Loader';
import PhoneCatalog from './PageOfPhones';

class PhonesPage extends React.Component {
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
              <PhoneCatalog
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

export default PhonesPage;
