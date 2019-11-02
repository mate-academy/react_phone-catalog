import React from 'react';
import Loader from './Loader';
import PhoneDetails from './PhoneDetails';

class PhoneDetailsPage extends React.Component {
  state = {
    details: {},
    isLoading: false,
    isLoaded: false,
  }

  loadDataDetails = async(currentId) => {
    this.setState({
      isLoading: true,
    });

    const responseDetails = await
    fetch(`https://mate-academy.github.io/phone-catalogue-static/api/phones/${currentId}.json`);
    const details = await responseDetails.json();

    this.setState({
      details,
      isLoading: false,
      isLoaded: true,
    });
  }

  componentDidMount = () => {
    this.props.loadDataPhones();
    this.loadDataDetails(this.props.id);
  };

  render() {
    const { id, phones } = this.props;
    const { details, isLoading, isLoaded } = this.state;

    console.log(details);

    return (
      <section>
        {
          isLoaded
            ? (
              <>
                {
                  id === details.id
                    ? (
                      <>
                        {
                          phones
                            .filter(phone => phone.id === id)
                            .map(phone => (
                              <PhoneDetails
                                details={details}
                              />
                            ))
                        }
                      </>
                    )
                    : 'No any data for this phone'
                }
              </>
            )
            : (
              <Loader
                isLoading={isLoading}
              />
            )
        }
      </section>
    );
  }
}

export default PhoneDetailsPage;
