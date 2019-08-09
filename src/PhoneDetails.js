import React from 'react';

import './styles/details.css';

const PhoneDetails = ({ phone }) =>
  <div className="Details_List">
    <ul className="Details_Li-ul">
      <b>Description: </b>
      <li>
        {phone.description}
      </li>
      <b>Display:</b>
      <ul className="Details_Li-ul">
        <li><b>ScreenResolution: </b>{phone.display.screenResolution}</li>
        <li><b>ScreenSize: </b>{phone.display.screenSize}</li>
        <li><b>TouchScreen: </b>{phone.display.touchScreen ? 'Yes' : 'No'}</li>
      </ul>
      <li>{phone.additionalFeatures}</li>
      <li>
        <b>Battery:</b>
      </li>
      <ul className="Details_Li-ul">
        <li><b>StandbyTime: </b>{phone.battery.standbyTime}</li>
        <li><b>TalkTime: </b>{phone.battery.talkTime}</li>
        <li><b>Type: </b>{phone.battery.type}</li>
      </ul>
      <li>
        <b>Connectivity:</b>
      </li>
      <ul className="Details_Li-ul">
        <li><b>Bluetooth: </b>{phone.connectivity.bluetooth}</li>
        <li><b>Cell: </b>{phone.connectivity.cell}</li>
        <li><b>GPS: </b>{phone.connectivity.gps ? 'Yes' : 'No'}</li>
        <li><b>infrared: </b>{phone.connectivity.infrared ? 'Yes' : 'No'}</li>
        <li><b>Wi-Fi: </b>{phone.connectivity.wifi}</li>
      </ul>
      <li>
        <b>Hardware: </b>
        <ul className="Details_Li-ul">
          <li><b>Accelerometer: </b>{phone.hardware.accelerometer ? 'Yes' : 'No'}</li>
          <li><b>AudioJack: </b>{phone.hardware.audioJack ? phone.hardware.audioJack : 'NO'}</li>
          <li><b>CPU: </b>{phone.hardware.cpu}</li>
          <li><b>Radio: </b>{phone.hardware.fmRadio ? 'Yes' : 'No'}</li>
          <li><b>Keyboard: </b>{phone.hardware.physicalKeyboard ? 'Yes' : 'No'}</li>
          <li><b>USB: </b>{phone.hardware.usb}</li>
        </ul>
      </li>
    </ul>
  </div>

export default PhoneDetails;
