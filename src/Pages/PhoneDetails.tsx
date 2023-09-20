import { Link, useParams } from 'react-router-dom';
import '../style/main.scss';
import { Phone } from '../Type/Phone';
import { Navigation } from '../Components/Navigation';
import { HotPrices } from '../Components/HotPrices';

type Props = {
  phones: Phone[];
};

export const PhoneDetails: React.FC<Props> = ({ phones }) => {
  const { phoneId } = useParams<{ phoneId: string }>();
  const phone = phones.find(currentPhone => currentPhone.phoneId === phoneId);

  return (
    <>
      <Navigation />
      <main>
        <div className="details">
          <section className="breadcrumbs">
            <Link
              to="/"
              className="breadcrumbs__button breadcrumbs__icon"
            />
            <div className="breadcrumbs__arrow breadcrumbs__icon" />
            <Link to="/Phones" className="breadcrumbs__pages">
              <p>Phones</p>
            </Link>
            <div className="breadcrumbs__arrow breadcrumbs__icon" />
            <p className="breadcrumbs--phoneId">{phoneId}</p>
          </section>

          <section className="details__title">
            <Link to="-1" className="details__back">
              <div className="details__back--icon icon" />

              <p className="details__back--title">Back</p>
            </Link>

            <h1 className="details__back--h1">{phone?.name}</h1>
          </section>

          <section className="details__main">
            <div className="details__main--photos">
              photos
            </div>
            <div className="details__main--photo">
              main photo
            </div>
            <div className="details__main--params">
              parameters
            </div>
          </section>

          <section className="details__description">
            <div className="details__description--about">
              <h2 className="details__description--h2">About</h2>

              <h3 className="details__description--about--h3">
                And then there was Pro
              </h3>

              <p className="details__description--about--title">
                A transformative triple‑camera
                system that adds tons of capability without
                <br />
                complexity.

                An unprecedented leap in battery life.
                And a mind‑blowing chip that doubles
                <br />
                down on machine learning and pushes
                the boundaries of what a smartphone
                <br />

                can do. Welcome to the first iPhone
                powerful enough to be called Pro.
              </p>

              <h3 className="details__description--about--h3">
                Camera
              </h3>

              <p className="details__description--about--title">
                Meet the first triple‑camera system
                to combine cutting‑edge technology with
                <br />
                the legendary simplicity of iPhone.
                Capture up to four times more scene. Get
                <br />
                beautiful images in drastically lower
                light. Shoot the highest‑quality video in a
                <br />
                smartphone — then edit with the same
                tools you love for photos. You’ve never
                <br />
                shot with anything like it.
              </p>

              <h3 className="details__description--about--h3">
                Shoot it. Flip it. Zoom it. Crop it. Cut it. Light it. Tweak it.
                <br />
                Love it.
              </h3>

              <p className="details__description--about--title">
                iPhone 11 Pro lets you capture videos that
                are beautifully true to life, with
                <br />
                greater detail and smoother motion. Epic processing
                power means it can
                <br />
                shoot 4K video with extended dynamic range and
                cinematic video stabilization
                <br />
                — all at 60 fps. You get more creative control,
                too, with four times more scene
                <br />
                and powerful new editing tools to play with.
              </p>

            </div>

            <div className="details__description--tech">
              <h2 className="details__description--h2">Tech specs</h2>

              <div className="details__description--tech--specs">
                <p className="details__description--tech--name">
                  Screen
                </p>

                <p className="details__description--tech--value">
                  {phone?.screen}
                </p>
              </div>

              <div className="details__description--tech--specs">
                <p className="details__description--tech--name">
                  Resolution
                </p>

                <p className="details__description--tech--value">
                  2688x1242
                </p>
              </div>

              <div className="details__description--tech--specs">
                <p className="details__description--tech--name">
                  Processor
                </p>

                <p className="details__description--tech--value">
                  Apple A12 Bionic
                </p>
              </div>

              <div className="details__description--tech--specs">
                <p className="details__description--tech--name">
                  RAM
                </p>

                <p className="details__description--tech--value">
                  {phone?.ram}
                </p>
              </div>

              <div className="details__description--tech--specs">
                <p className="details__description--tech--name">
                  Built in memory
                </p>

                <p className="details__description--tech--value">
                  {phone?.capacity}
                </p>
              </div>

              <div className="details__description--tech--specs">
                <p className="details__description--tech--name">
                  Camera
                </p>

                <p className="details__description--tech--value">
                  12 Mp + 12 Mp + 12 Mp (Triple)
                </p>
              </div>

              <div className="details__description--tech--specs">
                <p className="details__description--tech--name">
                  Zoom
                </p>

                <p className="details__description--tech--value">
                  Optical, 2x
                </p>
              </div>

              <div className="details__description--tech--specs">
                <p className="details__description--tech--name">
                  Cell
                </p>

                <p className="details__description--tech--value">
                  GSM, LTE, UMTS
                </p>
              </div>
            </div>
          </section>

          <section className="details__like">
            <h1>You may also like</h1>

            <HotPrices phones={phones} />
          </section>
        </div>
      </main>
    </>
  );
};
