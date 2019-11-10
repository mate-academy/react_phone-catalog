import React from 'react';
import Loader from '../components/Loader';
import DetailsForPhone from './DetailsForPhone';
import { BASE_URL } from "../components/constants";

class LoaderDetailsForPhonePage extends React.Component {
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
      fetch(`${BASE_URL}/api/phones/${currentId}.json`);
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
                              <DetailsForPhone
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

export default LoaderDetailsForPhonePage;
