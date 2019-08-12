import React, { useState, useEffect } from 'react';

import url from './url';

const PhoneDetails = ({ phoneDetails }) => {
  const [image, setImage] = useState('');

  useEffect(() => {
    setImage(url + phoneDetails.images[0]);
  }, []);

  return (
    <section>
      <div>
        <img
          src={image}
          alt={phoneDetails.id}
        />
      </div>
      <div>
        <h1>{phoneDetails.name}</h1>
        <p>{phoneDetails.description}</p>
        <div>
          {phoneDetails.images.map(img => (
            <img
              src={url + img}
              alt=""
              onClick={() => setImage(url + img)}
              key={img}
            />
          ))
          }
        </div>

      </div>
      <div>
        <div>
          <h3>Availability</h3>
          <p>{phoneDetails.availability}</p>
        </div>
        <div>
          <h3>Battery</h3>
          <h4>Time</h4><p>{phoneDetails.battery.standbyTime}</p>
          <h4>Talk time</h4><p>{phoneDetails.battery.talkTime}</p>
          <h4>Standby time</h4><p>{phoneDetails.battery.type}</p>
        </div>
        <div>
          <h3>Storage and memory</h3>
          <h4>RAM</h4><p>{phoneDetails.storage.ram}</p>
          <h4>Internal Storage</h4><p>{phoneDetails.storage.flash}</p>
        </div>
        <div>
          <h3>Connectivity</h3>
          <h4>Network support</h4>
          <h4>WIFI</h4><p></p>
          <h4>Bluetooth</h4><p></p>
          <h4>Infrared</h4><p></p>
          <h4>GPS</h4><p></p>
        </div>
        <div>
          <h3>Android</h3>
          <h4>OS Version</h4><p></p>
          <h4>UI</h4><p></p>
        </div>
        <div>
          <h3>Size & weight</h3>
          <h4>Dimensions</h4><p></p>
          <h4>Weight</h4><p></p>
        </div>
        <div>
          <h3>Display</h3>
          <h4>Screen size</h4><p></p>
          <h4>Screen resolution</h4><p></p>
          <h4>Touch screen</h4><p></p>
        </div>
        <div>
          <h3>Hardware</h3>
          <h4>CPU</h4><p></p>
          <h4>USB</h4><p></p>
          <h4>Audio / headphone jack</h4><p></p>
          <h4>FM Radio</h4><p></p>
          <h4>Accelerometer</h4><p></p>
        </div>
        <div>
          <h3>Camera</h3>
          <h4>Primary</h4><p></p>
          <h4>Features</h4><p></p>
        </div>
        <div>
          <h3>Additional features</h3>
          <p></p>
        </div>
      </div>
    </section>
  );
};

export default PhoneDetails;
