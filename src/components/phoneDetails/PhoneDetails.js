import React from 'react';
import PropTypes from 'prop-types';
import './phoneDetails.css';

const PhoneDetails = ({ phone }) => {
  const propertys = [
    'android',
    'battery',
    'camera',
    'connectivity',
    'storage',
    'hardware',
    'sizeAndWeight',
  ];

  const typeOfValues = (value) => {
    switch (typeof value) {
      case 'boolean':
        return (value && 'Yes') || (!value && 'No');
      case 'object':
        return value.join(', ');
      default:
        return value;
    }
  };

  return (
    <div className="phone-details">
      <h3>Specification</h3>
      {
        phone.length !== 0
          && (
            <table className="phone-details__tabl">
              {
                propertys.map(prop => (
                  <>
                    <th
                      className="phone-details__tabl--property"
                      colSpan="2"
                    >
                      {prop}
                    </th>

                    {
                      Object.entries(phone[prop]).map(values => (
                        <tr>
                          <td>{values[0]}</td>
                          <td>{typeOfValues(values[1])}</td>
                        </tr>
                      ))
                    }
                  </>
                ))
              }
            </table>
          )
      }
    </div>
  );
};

PhoneDetails.propTypes = {
  phone: PropTypes.shape({
    android: PropTypes.object,
    battery: PropTypes.object,
    camera: PropTypes.object,
    connectivity: PropTypes.object,
    storage: PropTypes.object,
    hardware: PropTypes.object,
    sizeAndWeight: PropTypes.object,
  }).isRequired,
};

export default PhoneDetails;
