import React from 'react'
import Loader from './Loader'
import PhoneCatalog from './PhoneCatalog'

class PhonesPage extends React.Component {
  componentDidMount = () => {
    this.props.loadData()
  }

  render() {
    const { phones, isLoading, isLoaded } = this.props;
    console.log(phones);
    return (
      <div>
        {
          isLoaded
            ? <PhoneCatalog 
              phones={phones}
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