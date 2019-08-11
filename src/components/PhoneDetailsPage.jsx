import React from 'react'
import Loader from './Loader'
import PhoneDetails from './PhoneDetails'

class PhoneDetailsPage extends React.Component {
  componentDidMount = () => {
    this.props.loadDataPhones()
    this.props.loadDataDetails()
  }

  render() {
    const {
      id,
      phones,
      details,
      isLoading,
      isLoaded
    } = this.props;

    return (
      <section>
        {
          isLoaded
            ? <>
              {
                id === details.id
                  ? <>
                    {
                      phones
                        .filter(phone => phone.id === id)
                        .map(phone =>
                          <PhoneDetails
                            phone={phone}
                            details={details}
                          />
                        )
                    }
                  </>
                  : 'No any data for this phone'
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