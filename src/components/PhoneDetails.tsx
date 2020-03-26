import React, { useEffect, FC, useState } from 'react';

import { GetDetailsURL } from '../api/constants';
import { NotFoundProne } from './NotFoundPhone';

interface Props {
  id: string;
}

export const PhoneDetails: FC<Props> = ({ id }) => {
  const [phone, setPhone] = useState<Details|null>(null);
  const [error, setError] = useState<string|null>(null);
  const [currentImg, setCurrentImg] = useState<string|undefined>(undefined);

  useEffect(() => {
    setError(null);
    fetch(GetDetailsURL(id))
      .then(async response => {
        if (response.ok) {
          setPhone(await response.json());
        } else {
          throw new Error(response.statusText);
        }
      })
      .catch(err => setError(err));
  }, []);

  useEffect(() => {
    setCurrentImg(phone?.images[0]);
  }, [phone]);

  const handlePhotoClick = (photo: string): void => {
    setCurrentImg(photo);
  };

  if (!error && phone) {
    return (
      <section className="details">
        <div className="info">
          <div className="info__slider">
            <img
              src={currentImg}
              alt="phone_img"
              className="info__slider-img"
            />
          </div>
          <div className="info__base">
            <h3 className="info__header">{phone.id}</h3>
            <p className="info__description">{phone.description}</p>
            <ul className="info__list">
              {phone.images.map(photo => (
                <li key={photo} className="info__item">
                  <button
                    type="button"
                    className="info__button"
                    onClick={() => handlePhotoClick(photo)}
                  >
                    <img
                      src={photo}
                      alt="device"
                      className="info__item-img"
                    />
                  </button>

                </li>
              ))}
            </ul>
          </div>
        </div>

        <ul className="details__list">
          <li className="details__item">
            <h4>Availability and Networks</h4>
            <p>{phone.availability}</p>
          </li>

          <li className="details__item">
            <h4>Battery</h4>
            <h5>Type</h5>
            <p>{phone.battery.type}</p>
            <h5>Talk time</h5>
            <p>{phone.battery.talkTime}</p>
            <h5>Standby time (max)</h5>
            <p>{phone.battery.standbyTime}</p>
          </li>

          <li className="details__item">
            <h4>Storage and Memory</h4>
            <p>{phone.storage.flash}</p>
            <h4>RAM</h4>
            <p>{phone.storage.ram}</p>
          </li>

          <li className="details__item">
            <h4>Connectivity</h4>
            <h5>Network support</h5>
            <p>{phone.connectivity.cell}</p>
            <h5>WI-FI</h5>
            <p>{phone.connectivity.wifi}</p>
            <h5>Bluetooth</h5>
            <p>{phone.connectivity.bluetooth}</p>
            <h5>Infrared</h5>
            <p>{phone.connectivity.infrared ? 'yes' : 'no'}</p>
            <h5>GPS</h5>
            <p>{phone.connectivity.gps ? 'yes' : 'no'}</p>
          </li>

          <li className="details__item">
            <h4>Android</h4>
            <h5>OS Version</h5>
            <p>{phone.android.os}</p>
            <h5>UI</h5>
            <p>{phone.android.ui}</p>
          </li>

          <li className="details__item">
            <h4>Size and Weight</h4>
            <h5>Dimensions</h5>
            {phone.sizeAndWeight.dimensions.map(item => (
              <p key={item}>{item}</p>
            ))}
            <h5>Weight</h5>
            <p>{phone.sizeAndWeight.weight}</p>
          </li>

          <li className="details__item">
            <h4>Display</h4>
            <h5>Screen size</h5>
            <p>{phone.display.screenSize}</p>
            <h5>Screen resolution</h5>
            <p>{phone.display.screenResolution}</p>
            <h5>TouchScreen</h5>
            <p>{phone.display.touchScreen ? 'yes' : 'no'}</p>
          </li>

          <li className="details__item">
            <h4>Hardware</h4>
            <h5>CPU</h5>
            <p>{phone.hardware.cpu}</p>
            <h5>USB</h5>
            <p>{phone.hardware.usb}</p>
            <h5>Audio / headphone jack</h5>
            <p>{phone.hardware.audioJack}</p>
            <h5>FM Radio</h5>
            <p>{phone.hardware.fmRadio ? 'yes' : 'no'}</p>
            <h5>Accelerometer</h5>
            <p>{phone.hardware.accelerometer ? 'yes' : 'no'}</p>
          </li>

          <li className="details__item">
            <h4>Camera</h4>
            <h5>Primary</h5>
            <p>{phone.camera.primary}</p>
            <h5>Features</h5>
            {phone.camera.features.map(item => (
              <p key={item}>{item}</p>
            ))}
          </li>

          <li className="details__item">
            <h4>Additional features</h4>
            <p>{phone.additionalFeatures}</p>
          </li>

        </ul>
      </section>
    );
  }

  return <NotFoundProne />;
};
