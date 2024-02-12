import cn from 'classnames';

import { PageSmallNav } from '../PageSmallNav';
import { SectionHeader } from '../SectionHeader';
import { BackButton } from '../BackButton/BackButton';
import { SectionWithCards } from '../SectionWithCards';
import { TechSpecs } from '../TechSpecs';
import { Price } from '../Price';
import { BuyButtons } from '../BuyButtons';
import './ModelPage.scss';

export const model = {
  additionalFeatures: 'Front Facing 1.3MP Camera',
  android: {
    os: 'Android 2.2',
    ui: 'Dell Stage',
  },
  availability: [
    'T-Mobile',
  ],
  battery: {
    standbyTime: '',
    talkTime: '',
    type: 'Lithium Ion (Li-Ion) (2780 mAH)',
  },
  camera: {
    features: [
      'Flash',
      'Video',
    ],
    primary: '5.0 megapixels',
  },
  connectivity: {
    bluetooth: 'Bluetooth 2.1',
    cell: 'T-mobile HSPA+ @ 2100/1900/AWS/850 MHz',
    gps: true,
    infrared: false,
    wifi: '802.11 b/g',
  },
  // eslint-disable-next-line max-len
  description: 'Introducing Dell\u2122 Streak 7. Share photos, videos and movies together. It\u2019s small enough to carry around, big enough to gather around. Android\u2122 2.2-based tablet with over-the-air upgrade capability for future OS releases.  A vibrant 7-inch, multitouch display with full Adobe\u00ae Flash 10.1 pre-installed.  Includes a 1.3 MP front-facing camera for face-to-face chats on popular services such as Qik or Skype.  16 GB of internal storage, plus Wi-Fi, Bluetooth and built-in GPS keeps you in touch with the world around you.  Connect on your terms. Save with 2-year contract or flexibility with prepaid pay-as-you-go plans',
  display: {
    screenResolution: 'WVGA (800 x 480)',
    screenSize: '7.0 inches',
    touchScreen: true,
  },
  hardware: {
    accelerometer: true,
    audioJack: '3.5mm',
    cpu: 'nVidia Tegra T20',
    fmRadio: false,
    physicalKeyboard: false,
    usb: 'USB 2.0',
  },
  id: 'dell-streak-7',
  images: [
    'img/products/dell-streak-7.0.jpg',
    'img/products/dell-streak-7.1.jpg',
    'img/products/dell-streak-7.2.jpg',
    'img/products/dell-streak-7.3.jpg',
    'img/products/dell-streak-7.4.jpg',
  ],
  name: 'Dell Streak 7',
  sizeAndWeight: {
    dimensions: [
      '199.9 mm (w)',
      '119.8 mm (h)',
      '12.4 mm (d)',
    ],
    weight: '450.0 grams',
  },
  storage: {
    flash: '16000MB',
    ram: '512MB',
  },
};

const colors = ['#FCDBC1', '#5F7170', '#4C4C4C', '#F0F0F0'];
const capacities = [64, 256, 512];

export const ModelPage = () => {
  return (
    <div className="model-page">
      <PageSmallNav classNames="model-page__small-nav" />
      <BackButton classNames="model-page__back-button" />
      <SectionHeader
        title={model.name}
        classNames="model-page__title"
      />

      <div className="model-page__container">
        <div className="model-page__images model-images">
          <div className="model-images__side-images">
            {
              model.images.slice(1).map((el, i) => (
                <img
                  src={`${el}`}
                  alt={model.name}
                  className={cn(
                    'model-images__side-image',
                    {
                      'model-images__side-image--selected': i === 0,
                    },
                  )}
                  key={el}
                />
              ))
            }
          </div>

          <img
            src={`${model.images[0]}`}
            alt="del"
            className="model-images__main-images"
          />
        </div>

        <div className="model-page__main-info model-info">
          <div className="model-info__main">
            <div className="model-info__available-colors">
              <p className="model-info__title">
                Available colors
              </p>
              <div className="available-colors">
                {
                  colors.map(color => (
                    <span
                      key={color}
                      className={cn(
                        'available-colors__circle',
                        'available-colors__circle--big',
                        {
                          'available-colors__circle--selected':
                          color === '#FCDBC1',
                        },
                      )}
                    >
                      <span
                        className="
                        available-colors__circle
                        available-colors__circle--small
                        "
                        style={{ backgroundColor: color }}
                      />
                    </span>
                  ))
                }
              </div>
            </div>

            <div className="model-info__capacity">
              <p className="model-info__title">
                Select capacity
              </p>

              <div className="capacities">
                {
                  capacities.map(el => (
                    <span
                      key={el}
                      className={cn(
                        'capacities__item',
                        { 'capacities__item--selected': el === 64 },
                      )}
                    >
                      {`${el} GB`}
                    </span>
                  ))
                }
              </div>
            </div>

            <div className="model-info__buy">
              <Price discount={9} price={1099} priceSize={32} />
              <BuyButtons containerHeight={48} />
            </div>

            <TechSpecs classNames="model-info__specs" />
          </div>

          <div className="model-info__id">
            {`ID: ${model.id.toUpperCase()}`}
          </div>
        </div>

        <div className="model-page__about">
          <h2 className="model-page__subtitle model-page__subtitle--about">
            About
          </h2>

          <article className="about-model">
            <p className="about-model__text">
              {model.description}
            </p>

          </article>
        </div>
        <div className="model-page__specs">
          <h2 className="model-page__subtitle model-page__subtitle--specs">
            Tech specs
          </h2>

          <TechSpecs classNames="model-page__specs-table" />
        </div>
      </div>

      <SectionWithCards
        title="You may also like"
        hasSectionButtons
      />
    </div>
  );
};
