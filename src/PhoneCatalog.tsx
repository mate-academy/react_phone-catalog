import React from 'react';

const PhoneCatalog = () => (
  <>
    <h1>Phone catalog</h1>

    <ul className="phones">
      <li className="thumbnail">
        <a href="#!/phones/motorola-xoom-with-wi-fi" className="thumb">
          <img
            alt="Motorola XOOM™ with Wi-Fi"
            src="img/phones/motorola-xoom-with-wi-fi.0.jpg"
          />
        </a>

        <div className="phones__btn-buy-wrapper">
          <button type="button" className="btn btn-success">
            Add
          </button>
        </div>

        <a href="#!/phones/motorola-xoom-with-wi-fi">
          Motorola XOOM™ with Wi-Fi
        </a>
        <p>
          The Next, Next Generation Experience the future with Motorola XOOM
          with Wi-Fi, the world&apos;s first tablet powered by Android 3.0
          (Honeycomb).
        </p>
      </li>

      <li className="thumbnail">
        <a href="#!/phones/motorola-xoom" className="thumb">
          <img alt="MOTOROLA XOOM™" src="img/phones/motorola-xoom.0.jpg" />
        </a>
        <a href="#!/phones/motorola-xoom">MOTOROLA XOOM™</a>
        <p>
          The Next, Next Generation Experience the future with MOTOROLA XOOM,
          the world&apos;s first tablet powered by Android 3.0 (Honeycomb).
        </p>
      </li>

      <li className="thumbnail">
        <a href="#!/phones/motorola-atrix-4g" className="thumb">
          <img
            alt="MOTOROLA ATRIX™ 4G"
            src="img/phones/motorola-atrix-4g.0.jpg"
          />
        </a>
        <a href="#!/phones/motorola-atrix-4g">MOTOROLA ATRIX™ 4G</a>
        <p>MOTOROLA ATRIX 4G the world&apos;s most powerful smartphone.</p>
      </li>
      <li className="thumbnail">
        <a href="#!/phones/dell-streak-7" className="thumb">
          <img alt="Dell Streak 7" src="img/phones/dell-streak-7.0.jpg" />
        </a>
        <a href="#!/phones/dell-streak-7">Dell Streak 7</a>
        <p>
          Introducing Dell™ Streak 7. Share photos, videos and movies
          together. It’s small enough to carry around, big enough to gather
          around.
        </p>
      </li>
      <li className="thumbnail">
        <a href="#!/phones/samsung-gem" className="thumb">
          <img alt="Samsung Gem™" src="img/phones/samsung-gem.0.jpg" />
        </a>
        <a href="#!/phones/samsung-gem">Samsung Gem™</a>
        <p>
          The Samsung Gem™ brings you everything that you would expect and
          more from a touch display smart phone – more apps, more features
          and a more affordable price.
        </p>
      </li>
      <li className="thumbnail">
        <a href="#!/phones/dell-venue" className="thumb">
          <img alt="Dell Venue" src="img/phones/dell-venue.0.jpg" />
        </a>
        <a href="#!/phones/dell-venue">Dell Venue</a>
        <p>The Dell Venue; Your Personal Express Lane to Everything</p>
      </li>
      <li className="thumbnail">
        <a href="#!/phones/nexus-s" className="thumb">
          <img alt="Nexus S" src="img/phones/nexus-s.0.jpg" />
        </a>
        <a href="#!/phones/nexus-s">Nexus S</a>
        <p>
          Fast just got faster with Nexus S. A pure Google experience,
          Nexus&nbsp;S is the first phone to run Gingerbread (Android 2.3),
          the fastest version of Android yet.
        </p>
      </li>
      <li className="thumbnail">
        <a href="#!/phones/lg-axis" className="thumb">
          <img alt="LG Axis" src="img/phones/lg-axis.0.jpg" />
        </a>
        <a href="#!/phones/lg-axis">LG Axis</a>
        <p>
          Android Powered, Google Maps Navigation, 5 Customizable Home Screens
        </p>
      </li>
      <li className="thumbnail">
        <a href="#!/phones/samsung-galaxy-tab" className="thumb">
          <img
            alt="Samsung Galaxy Tab™"
            src="img/phones/samsung-galaxy-tab.0.jpg"
          />
        </a>
        <a href="#!/phones/samsung-galaxy-tab">Samsung Galaxy Tab™</a>
        <p>
          Feel Free to Tab™. The Samsung Galaxy Tab™ brings you an
          ultra-mobile entertainment experience through its 7” display,
          high-power processor and Adobe® Flash® Player compatibility.
        </p>
      </li>
      <li className="thumbnail">
        <a
          href="#!/phones/samsung-showcase-a-galaxy-s-phone"
          className="thumb"
        >
          <img
            alt="Samsung Showcase™ a Galaxy S™ phone"
            src="img/phones/samsung-showcase-a-galaxy-s-phone.0.jpg"
          />
        </a>
        <a href="#!/phones/samsung-showcase-a-galaxy-s-phone">
          Samsung Showcase™ a Galaxy S™ phone
        </a>
        <p>
          The Samsung Showcase™ delivers a cinema quality experience like
          you’ve never seen before. Its innovative 4” touch display
          technology provides rich picture brilliance, even outdoors
        </p>
      </li>
      <li className="thumbnail">
        <a href="#!/phones/droid-2-global-by-motorola" className="thumb">
          <img
            alt="DROID™ 2 Global by Motorola"
            src="img/phones/droid-2-global-by-motorola.0.jpg"
          />
        </a>
        <a href="#!/phones/droid-2-global-by-motorola">
          DROID™ 2 Global by Motorola
        </a>
        <p>
          The first smartphone with a 1.2 GHz processor and global
          capabilities.
        </p>
      </li>
      <li className="thumbnail">
        <a href="#!/phones/droid-pro-by-motorola" className="thumb">
          <img
            alt="DROID™ Pro by Motorola"
            src="img/phones/droid-pro-by-motorola.0.jpg"
          />
        </a>
        <a href="#!/phones/droid-pro-by-motorola">DROID™ Pro by Motorola</a>
        <p>The next generation of DOES.</p>
      </li>
      <li className="thumbnail">
        <a href="#!/phones/motorola-bravo-with-motoblur" className="thumb">
          <img
            alt="MOTOROLA BRAVO™ with MOTOBLUR™"
            src="img/phones/motorola-bravo-with-motoblur.0.jpg"
          />
        </a>
        <a href="#!/phones/motorola-bravo-with-motoblur">
          MOTOROLA BRAVO™ with MOTOBLUR™
        </a>
        <p>An experience to cheer about.</p>
      </li>
      <li className="thumbnail">
        <a href="#!/phones/motorola-defy-with-motoblur" className="thumb">
          <img
            alt="Motorola DEFY™ with MOTOBLUR™"
            src="img/phones/motorola-defy-with-motoblur.0.jpg"
          />
        </a>
        <a href="#!/phones/motorola-defy-with-motoblur">
          Motorola DEFY™ with MOTOBLUR™
        </a>
        <p>Are you ready for everything life throws your way?</p>
      </li>
      <li className="thumbnail">
        <a href="#!/phones/t-mobile-mytouch-4g" className="thumb">
          <img
            alt="T-Mobile myTouch 4G"
            src="img/phones/t-mobile-mytouch-4g.0.jpg"
          />
        </a>
        <a href="#!/phones/t-mobile-mytouch-4g">T-Mobile myTouch 4G</a>
        <p>
          The T-Mobile myTouch 4G is a premium smartphone designed to deliver
          blazing fast 4G speeds so that you can video chat from practically
          anywhere, with or without Wi-Fi.
        </p>
      </li>
      <li className="thumbnail">
        <a
          href="#!/phones/samsung-mesmerize-a-galaxy-s-phone"
          className="thumb"
        >
          <img
            alt="Samsung Mesmerize™ a Galaxy S™ phone"
            src="img/phones/samsung-mesmerize-a-galaxy-s-phone.0.jpg"
          />
        </a>
        <a href="#!/phones/samsung-mesmerize-a-galaxy-s-phone">
          Samsung Mesmerize™ a Galaxy S™ phone
        </a>
        <p>
          The Samsung Mesmerize™ delivers a cinema quality experience like
          you’ve never seen before. Its innovative 4” touch display
          technology provides rich picture brilliance,even outdoors
        </p>
      </li>
      <li className="thumbnail">
        <a href="#!/phones/sanyo-zio" className="thumb">
          <img alt="SANYO ZIO" src="img/phones/sanyo-zio.0.jpg" />
        </a>
        <a href="#!/phones/sanyo-zio">SANYO ZIO</a>
        <p>
          The Sanyo Zio by Kyocera is an Android smartphone with a
          combination of ultra-sleek styling, strong performance and
          unprecedented value.
        </p>
      </li>
      <li className="thumbnail">
        <a href="#!/phones/samsung-transform" className="thumb">
          <img
            alt="Samsung Transform™"
            src="img/phones/samsung-transform.0.jpg"
          />
        </a>
        <a href="#!/phones/samsung-transform">Samsung Transform™</a>
        <p>
          The Samsung Transform™ brings you a fun way to customize your
          Android powered touch screen phone to just the way you like it
          through your favorite themed “Sprint ID Service Pack”.
        </p>
      </li>
      <li className="thumbnail">
        <a href="#!/phones/t-mobile-g2" className="thumb">
          <img alt="T-Mobile G2" src="img/phones/t-mobile-g2.0.jpg" />
        </a>
        <a href="#!/phones/t-mobile-g2">T-Mobile G2</a>
        <p>
          The T-Mobile G2 with Google is the first smartphone built for 4G
          speeds on T-Mobile&apos;s new network. Get the information you need,
          faster than you ever thought possible.
        </p>
      </li>
      <li className="thumbnail">
        <a href="#!/phones/motorola-charm-with-motoblur" className="thumb">
          <img
            alt="Motorola CHARM™ with MOTOBLUR™"
            src="img/phones/motorola-charm-with-motoblur.0.jpg"
          />
        </a>
        <a href="#!/phones/motorola-charm-with-motoblur">
          Motorola CHARM™ with MOTOBLUR™
        </a>
        <p>
          Motorola CHARM fits easily in your pocket or palm. Includes
          MOTOBLUR service.
        </p>
      </li>
    </ul>
  </>
);

export default PhoneCatalog;
