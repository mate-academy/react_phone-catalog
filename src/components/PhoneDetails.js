/* eslint-disable react/no-did-update-set-state */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loader from "./Loader";

import { getExtraDetails } from '../api/getPhones';
import NotFoundPage from './NotFoundPage';


class PhoneDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      extraData: {},
    };
  }

  async componentDidMount() {
    const { id } = this.props;
    const extraData = await getExtraDetails(id);

    this.setState({ extraData });
  }

  // async componentDidUpdate() {
  //   const { id } = this.props;
  //   const extraData = await getExtraDetails(id);

  //   if (this.state.extraData.id !== id) {
  //     this.setState({ extraData });
  //   }
  // }

  render() {
    console.log(this.props.id);
    console.log(this.state.extraData);
    const { extraData } = this.state;
    const { id } = this.props;

    return (
      <>
        {id === extraData.id ? (
          <div className="extra-details">
            <h2>THIS IS PhoneDetails Page</h2>
            <Link to="/phones">
              <button className="btn btn-back" type="button">
                {"<<- Back to all phones <<-"}
              </button>
            </Link>
            <ul>
              <li>
                <h3>{extraData.name}</h3>
                <p>{extraData.description}</p>
                <section>
                  <img src={extraData.images} alt={extraData.name} />
                </section>
              </li>
            </ul>
          </div>
        ) : (
          <>
            <Loader />
            <p>
              {'Maybe this page is not available, '}
              <Link to="/phones">
                go back
              </Link>
              {' and try checking late'}
            </p>
          </>
        )}
      </>
    );
  }
}

export default PhoneDetails;
