/*eslint-disable*/
import React from 'react';

const PhoneInfoDetails = ({ phoneInfo }) => (
  <div className="Phone-info-main__discription-details">
    <div>
      <h5>-Additional Features</h5>
      <p>{phoneInfo.additionalFeatures}</p>
    </div>
    <div>
      <h5>-Operation system</h5>
      <div>
        {Object.entries(phoneInfo.android).map(item => (
          <p key={item[0]}>{item.join(': ')}</p>
        ))}
      </div>
    </div>
    <div>
      <h5>-Availability</h5>
      <p>{phoneInfo.availability}</p>
    </div>
    <div>
      <h5>Battery</h5>
      <div>
        {Object.entries(phoneInfo.battery).map(item => (
          <p key={item[0]}>{item.join(': ')}</p>
        ))}
      </div>
    </div>
    <div>
      <h5>Camera</h5>
      <div>
        {Object.entries(phoneInfo.camera).map(item => (
          <p key={item[0]}>{item.join(': ')}</p>
        ))}
      </div>
    </div>
    <div>
      <h5>Connectivity</h5>
      <div>
        {Object.entries(phoneInfo.connectivity).map(item => (
          <p key={item[0]}>{item.join(': ')}</p>
        ))}
      </div>
    </div>
    <div>
      <h5>Hardware</h5>
      <div>
        {Object.entries(phoneInfo.hardware).map(item => (
          <p key={item[0]}>{item.join(': ')}</p>
        ))}
      </div>
    </div>
    <div>
      <h5>Size and weight</h5>
      <div>
        {Object.entries(phoneInfo.sizeAndWeight).map(item => (
          <p key={item[0]}>{item.join(': ')}</p>
        ))}
      </div>
    </div>
    <div>
      <h5>Storage</h5>
      <div>
        {Object.entries(phoneInfo.storage).map(item => (
          <p key={item[0]}>{item.join(': ')}</p>
        ))}
      </div>
    </div>
  </div>
);

export default PhoneInfoDetails;
