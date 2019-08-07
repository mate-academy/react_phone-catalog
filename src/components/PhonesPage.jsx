import React from 'react'
import Loader from './Loader'

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
            ? <h2>Phones page</h2>
            : <Loader
              isLoading={isLoading}
            />
        }
      </div>
    )
  }
}

export default PhonesPage