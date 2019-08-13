import React from 'react'

const Specifications = ({ currentPhone }) => (
  <section className="section-specefication">
    <div className="specifications_sign">
      Specifications
    </div>
    <div className="specifications">
    <div className="specifications_details">
        <p className="specifications_details-sign">Connectivity</p>
        <p>
          Bluetooth: {currentPhone.connectivity.bluetooth}
        </p>
        <p>
          Cell: {currentPhone.connectivity.cell}
        </p>
        <p>
          Gps: {currentPhone.connectivity.gps ? 'Yes' : 'No'}
        </p>
        <p>
          Infrared: {currentPhone.connectivity.infrared ? 'Yes' : 'No'}
        </p>
        <p>
          Wifi: {currentPhone.connectivity.wifi}
        </p>
      </div>
      <div className="specifications_details">
        <p className="specifications_details-sign">Operating system</p>
        <p>
          Os: {currentPhone.android.os}
        </p>
        <p>
          Ui: {currentPhone.android.ui}
        </p>
      </div>
      <div className="specifications_details">
        <p className="specifications_details-sign">Camera</p>
        <p>
          Primary: {currentPhone.camera.primary}
        </p>
        <p>
          Features: {currentPhone.camera.features.join(', ')}
        </p>
      </div>
      <div className="specifications_details">
        <p className="specifications_details-sign">Battary</p>
        <p>
          Stand by Time: {currentPhone.battery.standbyTime}
        </p>
        <p>
          Talking Time: {currentPhone.battery.talkTime}
        </p>
        <p>
          Type: {currentPhone.battery.type}
        </p>
      </div>
      <div className="specifications_details">
        <p className="specifications_details-sign">Display</p>
        <p>
          Screen Resolution: {currentPhone.display.screenResolution}
        </p>
        <p>
          Screen Size: {currentPhone.display.screenSize}
        </p>
        <p>
          Touc hScreen: {currentPhone.display.touchScreen ? 'Yes' : 'No'}
        </p>
      </div>
      <div className="specifications_details">
        <p className="specifications_details-sign">Hardware</p>
        <p>
          Accelerometer: {currentPhone.hardware.accelerometer ? 'Yes' : 'No'}
        </p>
        <p>
          Audio Jack: {currentPhone.hardware.audioJack}
        </p>
        <p>
          Cpu: {currentPhone.hardware.cpu}
        </p>
        <p>
          Fm-Radio: {currentPhone.hardware.fmRadio ? 'Yes' : 'No'}
        </p>
        <p>
          Physical Keyboard: {currentPhone.hardware.physicalKeyboard ? 'Yes' : 'No'}
        </p>
        <p>
          Usb: {currentPhone.hardware.usb}
        </p>
      </div>
      <div className="specifications_details">
        <p className="specifications_details-sign">Storage</p>
        <p>
          Flash: {currentPhone.storage.flash}
          {' '}
        </p>
        <p>
          Ram: {currentPhone.storage.ram}
        </p>
      </div>
      <div className="specifications_details">
        <p className="specifications_details-sign">Size and weight </p>
        <p>{currentPhone.sizeAndWeight.dimensions.join(', ')}</p>
        <p>
          Weight: {currentPhone.sizeAndWeight.weight}
        </p>
      </div>
    </div>
  </section>
)

export default Specifications
