import React from 'react';

const PhoneDetailsPage = () => (
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
  </>
);

export default PhoneDetailsPage;
