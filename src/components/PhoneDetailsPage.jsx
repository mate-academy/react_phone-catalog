import React from 'react'
import Loader from './Loader'

class PhoneDetailsPage extends React.Component {
  componentDidMount = () => {
    this.props.loadDataDetails()
  }

  render() {
    const {
      id,
      details,
      isLoading,
      isLoaded
    } = this.props;

    console.log(details);

    return (
      <section>
      {
        isLoaded
          ? <>
              {
                id === details.id
                  ? 'I show the details!'
                  : 'Phone was not found'
              }
            </>
          : <Loader 
            isLoading={isLoading}
          />
      }
      </section>
    )
  }
}

export default PhoneDetailsPage