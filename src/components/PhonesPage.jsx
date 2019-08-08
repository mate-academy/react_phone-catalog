import React from 'react'
import Loader from './Loader'
import PhoneCatalog from './PhoneCatalog'

class PhonesPage extends React.Component {
  componentDidMount = () => {
    this.props.loadDataPhones()
  }

  render() {
    const { 
      phones,
      isLoading, 
      isLoaded, 
    } = this.props;

    return (
      <div>
        {
          isLoaded
            ? <PhoneCatalog 
              phones={phones}
              isLoading={isLoading}
              isLoaded={isLoaded}
            />
            : <Loader
              isLoading={isLoading}
            />
        }
      </div>
    )
  }
}

export default PhonesPage