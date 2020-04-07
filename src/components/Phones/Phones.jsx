import React from 'react';

export const Phones = (props) => {
  const { phones } = props;

  return (
    <>
      <h2>Phones</h2>
      <ul>
        {phones.map(phone => (
          <li key={phone.id}>
            {phone.id}
            <img src={phone.imageUrl} alt="/" />
          </li>
        ))}
      </ul>
    </>
  );
};
