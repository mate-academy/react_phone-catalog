import React from 'react';

const Details = () => (
  <>
    <img
      className="phone"
      src="img/phones/motorola-xoom-with-wi-fi.0.jpg"
      alt="phone preview"
    />

    <h1>Motorola XOOM™ with Wi-Fi</h1>
    <p>
      Motorola XOOM with Wi-Fi has a super-powerful dual-core processor and
      Android™ 3.0 (Honeycomb) — the Android platform designed specifically
      for tablets. With its 10.1-inch HD widescreen display, you’ll enjoy HD
      video in a thin, light, powerful and upgradeable tablet
    </p>

    <button type="button" className="btn btn-success">
      Add
    </button>

    <ul className="phone-thumbs">
      <li>
        <img
          src="img/phones/motorola-xoom-with-wi-fi.0.jpg"
          alt="thumbnail"
        />
      </li>
      <li>
        <img
          src="img/phones/motorola-xoom-with-wi-fi.1.jpg"
          alt="thumbnail"
        />
      </li>
      <li>
        <img
          src="img/phones/motorola-xoom-with-wi-fi.2.jpg"
          alt="thumbnail"
        />
      </li>
      <li>
        <img
          src="img/phones/motorola-xoom-with-wi-fi.3.jpg"
          alt="thumbnail"
        />
      </li>
      <li>
        <img
          src="img/phones/motorola-xoom-with-wi-fi.4.jpg"
          alt="thumbnail"
        />
      </li>
      <li>
        <img
          src="img/phones/motorola-xoom-with-wi-fi.5.jpg"
          alt="thumbnail"
        />
      </li>
    </ul>

    <ul className="specs">
      <li>
        <span>Availability and Networks</span>
        <dl>
          <dt>Availability</dt>
          <dd> </dd>
        </dl>
      </li>
      <li>
        <span>Battery</span>
        <dl>
          <dt>Type</dt>
          <dd>Other ( mAH)</dd>
          <dt>Talk Time</dt>
          <dd>24 hours</dd>
          <dt>Standby time (max)</dt>
          <dd>336 hours</dd>
        </dl>
      </li>
      <li>
        <span>Storage and Memory</span>
        <dl>
          <dt>RAM</dt>
          <dd>1000MB</dd>
          <dt>Internal Storage</dt>
          <dd>32000MB</dd>
        </dl>
      </li>
      <li>
        <span>Connectivity</span>
        <dl>
          <dt>Network Support</dt>
          <dd> </dd>
          <dt>WiFi</dt>
          <dd>802.11 b/g/n</dd>
          <dt>Bluetooth</dt>
          <dd>Bluetooth 2.1</dd>
          <dt>Infrared</dt>
          <dd>✘</dd>
          <dt>GPS</dt>
          <dd>✓</dd>
        </dl>
      </li>
      <li>
        <span>Android</span>
        <dl>
          <dt>OS Version</dt>
          <dd>Android 3.0</dd>
          <dt>UI</dt>
          <dd>Honeycomb</dd>
        </dl>
      </li>
      <li>
        <span>Size and Weight</span>
        <dl>
          <dt>Dimensions</dt>
          <dd>249.1 mm (w)</dd>
          <dd>167.8 mm (h)</dd>
          <dd>12.9 mm (d)</dd>
          <dt>Weight</dt>
          <dd>708.0 grams</dd>
        </dl>
      </li>
      <li>
        <span>Display</span>
        <dl>
          <dt>Screen size</dt>
          <dd>10.1 inches</dd>
          <dt>Screen resolution</dt>
          <dd>WXGA (1200 x 800)</dd>
          <dt>Touch screen</dt>
          <dd>✓</dd>
        </dl>
      </li>
      <li>
        <span>Hardware</span>
        <dl>
          <dt>CPU</dt>
          <dd>1 GHz Dual Core Tegra 2</dd>
          <dt>USB</dt>
          <dd>USB 2.0</dd>
          <dt>Audio / headphone jack</dt>
          <dd>3.5mm</dd>
          <dt>FM Radio</dt>
          <dd>✘</dd>
          <dt>Accelerometer</dt>
          <dd>✓</dd>
        </dl>
      </li>
      <li>
        <span>Camera</span>
        <dl>
          <dt>Primary</dt>
          <dd>5.0 megapixels</dd>
          <dt>Features</dt>
          <dd>Flash, Video</dd>
        </dl>
      </li>
      <li>
        <span>Additional Features</span>
        <dd>Sensors: proximity, ambient light, barometer, gyroscope</dd>
      </li>
    </ul>
  </>
);

export default Details;
