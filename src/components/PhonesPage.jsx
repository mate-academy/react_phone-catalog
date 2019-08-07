import React from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import getData from '../api/utils';

class PhonesPage extends React.Component {
  state = {
    phones: [],
    isLoading: false,
  }

  async componentDidMount() {
    this.setState({
      isLoading: true,
    });

    const phonesFromApi = await getData();

    this.setState({
      phones: phonesFromApi,
      isLoading: false,
    });
  }

  render() {
    const { isLoading, phones } = this.state;

    return (
      <div>
        {isLoading && (
          <Loader
            type="Oval"
            color="blue"
            height="50"
            width="50"
          />
        )}

        <h1>Phones page</h1>
        <ul>
          {phones.map(phone => (
            <li>{phone.name}</li>
          ))}
        </ul>

      </div>
    );
  }
}

export default PhonesPage;
