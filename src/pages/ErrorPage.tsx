import React from 'react';

export const ErrorPage = () => {
  return (
    <div className="container">
      <h3
        style={{
          textAlign: 'center',
          textTransform: 'uppercase',
          opacity: '0.4',
          marginTop: '40px',
        }}
      >
        Oops... Something went wrong here
      </h3>
      <h4
        style={{
          textAlign: 'center',
          opacity: '0.4',
          marginTop: '20px',
        }}
      >
        The link you followed probably broken
      </h4>
      <img
        alt="Guess i'll die"
        src="https://i.kym-cdn.com/photos/images/original/001/285/460/8b6.jpg"
        style={{
          width: '100%',
          height: '100%',
          marginTop: '30px',
        }}
      />
    </div>
  );
};
