import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import Title from './Title';
import { Phone } from '../interfaces/interfaces';
import { RootState, getCurrentPhone } from '../store';

type Props = {
  phone: Phone;
};

const PhonePage: FC<Props> = ({ phone }) => {
  return (
    <div className="phone">
      <NavLink to="/phones" className="phone__button--back">
        <img src="img/icons/back-arrow.svg" alt="Back" />
        <p>Back</p>
      </NavLink>
      <Title title={phone.name} />
      <div className="phone__container">
        <div className="phone__images">
          map images
        </div>
        <div className="phone__image">
          main image
        </div>
        <div className="phone__info">
          <div className="phone__colors">
            <small className="phone__available-text">Available phones</small>
            <div className="phone__available-colors">
              colored circles
            </div>
          </div>
          <div className="phone__capacity">
            <small>Select capacity</small>
            <div>
              capacites
            </div>
          </div>
          <div className="phone__price">
            <h2>Discount</h2>
            <p>Price</p>
          </div>
          <div className="phone__actions">
            <button type="button">Add to cart</button>
            <button type="button">Like</button>
          </div>
          <div className="phone__characteristics">
            <div>
              <p>Screen</p>
              <p />
            </div>
            <div>
              <p>Resolution</p>
              <p />
            </div>
            <div>
              <p>Processor</p>
              <p />
            </div>
            <div>
              <p>RAM</p>
              <p />
            </div>
          </div>
        </div>
        <div className="phone__id">Id</div>
      </div>
      <div className="phone__container--about">
        <div className="phone__about">
          <h2>About</h2>
          <h3>
            <p>text</p>
          </h3>
          <h3>
            <p>text</p>
          </h3>
          <h3>
            <p>text</p>
          </h3>
        </div>
        <div className="phone__specs">
          <h2>Tech Specs</h2>
          <div>
            <div>
              <p>Screen</p>
              <p />
            </div>
            <div>
              <p>Resolution</p>
              <p />
            </div>
            <div>
              <p>Processor</p>
              <p />
            </div>
            <div>
              <p>RAM</p>
              <p />
            </div>
            <div>
              <p>Built in memory</p>
              <p />
            </div>
            <div>
              <p>Camera</p>
              <p />
            </div>
            <div>
              <p>Zoom</p>
              <p />
            </div>
            <div>
              <p>Cell</p>
              <p />
            </div>
          </div>
        </div>
      </div>
      <Title title="You may also like" />
    </div>
  );
};

const mapState = (state: RootState) => ({
  phone: getCurrentPhone(state),
});

export default connect(mapState)(PhonePage);
