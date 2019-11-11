import React, { useState, useEffect } from 'react';
import './PhoneDetailsPage.css';
import { getPhoneDetailsById } from '../../Api';

const loadPhoneDetails = async (phoneId, setPhoneDetails, setLargeImgSrc) => {
  const phoneDetails = await getPhoneDetailsById(phoneId);

  setPhoneDetails(phoneDetails);
};

const PhoneDetailsPage = ({ phone }) => {
  const [phoneDetails, setPhoneDetails] = useState(null);
  const [largeImgSrc, setLargeImgSrc] = useState(`/${phone.imageUrl}`);
  const LargeImg = React.createRef();

  const imgOnClick = (event) => {
    const { target } = event;

    console.log(LargeImg.current);
    setLargeImgSrc(`/img/${target.src.split('img')[1]}`);
  };

  useEffect(() => {
    loadPhoneDetails(phone.id, setPhoneDetails);
  }, []);

  return phoneDetails && (
    <>
      <div className="phoneDetails">
        <img className="phoneDetails__largeImg" src={largeImgSrc} ref={LargeImg} />
        <div className="phoneDetails__content">
          <h1>{phone.name}</h1>
          <hr />
          <p className="phoneDetails__describe">{phoneDetails.description}</p>
          <div className="phoneDetails_images">
            {phoneDetails && phoneDetails.images.map(imgUrl => <img src={`/${imgUrl}`} onClick={imgOnClick} />)}
          </div>
        </div>
      </div>
      <div className="phoneCharacteristics">
        <div className="characteristic__item">
          <h3>Battery</h3>
          <h4>Type</h4>
          <p>{phoneDetails.battery.type}</p>
          <h4>Standby time (max)</h4>
          <p>{phoneDetails.battery.standbyTime}</p>
          <h4>Talk time</h4>
          <p>{phoneDetails.battery.talkTime}</p>
        </div>
        <div className="characteristic__item">
          <h3>Camera</h3>
          <h4>Features</h4>
          <p>{phoneDetails.camera.features}</p>
          <h4>Primary</h4>
          <p>{phoneDetails.camera.primary}</p>
        </div>
        <div className="characteristic__item">
          <h3>Storage</h3>
          <h4>Flash</h4>
          <p>{phoneDetails.storage.flash}</p>
          <h4>Ram</h4>
          <p>{phoneDetails.storage.ram}</p>
        </div>
        <div className="characteristic__item">
          <h3>Display</h3>
          <h4>Screen resolution</h4>
          <p>{phoneDetails.display.screenResolution}</p>
          <h4>Screen size</h4>
          <p>{phoneDetails.display.screenSize}</p>
          <h4>touchScreen</h4>
          <p>{phoneDetails.display.touchScreen ? '✓' : '✘'}</p>
        </div>
        <div className="characteristic__item">
          <h3>Android</h3>
          <h4>Os</h4>
          <p>{phoneDetails.android.os}</p>
          <h4>Ui</h4>
          <p>{phoneDetails.android.ui}</p>
        </div>
        <div className="characteristic__item">
          <h3>Connectivity</h3>
          <h4>Bluetooth</h4>
          <p>{phoneDetails.connectivity.bluetooth}</p>
          <h4>Wifi</h4>
          <p>{phoneDetails.connectivity.wifi}</p>
          <h4>Infrared</h4>
          <p>{phoneDetails.connectivity.infrared ? '✓' : '✘'}</p>
          <h4>Gps</h4>
          <p>{phoneDetails.connectivity.gps ? '✓' : '✘'}</p>
        </div>
        <div className="characteristic__item">
          <h3>Hardware</h3>
          <h4>Cpu</h4>
          <p>{phoneDetails.hardware.cpu}</p>
          <h4>Audio jack</h4>
          <p>{phoneDetails.hardware.audioJack}</p>
          <h4>Usb</h4>
          <p>{phoneDetails.hardware.usb}</p>
          <h4>Accelerometer</h4>
          <p>{phoneDetails.hardware.accelerometer ? '✓' : '✘'}</p>
          <h4>Fm radio</h4>
          <p>{phoneDetails.hardware.fmRadio ? '✓' : '✘'}</p>
          <h4>Physical keyboard</h4>
          <p>{phoneDetails.hardware.physicalKeyboard ? '✓' : '✘'}</p>
        </div>
        <div className="characteristic__item">
          <h3>Size and weight</h3>
          <h4>Dimensions</h4>
          <p>{phoneDetails.sizeAndWeight.dimensions[0]}</p>
          <p>{phoneDetails.sizeAndWeight.dimensions[1]}</p>
          <p>{phoneDetails.sizeAndWeight.dimensions[2]}</p>
          <h4>Weight</h4>
          <p>{phoneDetails.sizeAndWeight.weight}</p>
        </div>
        {
          phoneDetails.additionalFeatures && <div className="characteristic__item">
            <h3>Additional features</h3>
            <p>{phoneDetails.additionalFeatures}</p>
          </div>
        }
      </div>
    </>
  );
};

export default PhoneDetailsPage;
