/* eslint-disable max-len */
import './detailedDescription.scss';
import { Details } from '../../type/details';
import { Product } from '../../type/product';

type Props = {
  details: Details,
  generalData: Product,
};

export const DetailedDescription: React.FC<Props> = ({ details, generalData }) => {
  const { snippet } = generalData;
  const {
    battery,
    camera,
    connectivity,
    description,
    display,
    hardware,
    sizeAndWeight,
    storage,
  } = details;

  return (
    <section className="detiled-description">
      <section
        data-cy="productDescription"
        className="detiled-description__about"
      >
        <h3 className="detiled-description__title-about title">
          About
        </h3>

        <div className="detiled-description__about-block">
          <div>
            <h4 className="detiled-description__title-description">
              {snippet}
            </h4>

            <p className="detiled-description__text">
              {description}
            </p>
          </div>
        </div>
      </section>

      <section className="detiled-description__tech-specs">
        <h3 className="detiled-description__title-tech-specs title">
          Tech specs
        </h3>

        <table className="detiled-description__tech-specs-table">
          <tbody>
            <tr>
              <td>Screen</td>
              <td>{display.screenSize || '-'}</td>
            </tr>
            <tr>
              <td>Resolution</td>
              <td>{display.screenResolution || '-'}</td>
            </tr>
            <tr>
              <td>Processor</td>
              <td>{hardware.cpu || '-'}</td>
            </tr>
            <tr>
              <td>RAM</td>
              <td>{storage.ram || '-'}</td>
            </tr>
            <tr>
              <td>Battery</td>
              <td>{battery.type || '-'}</td>
            </tr>
            <tr>
              <td>Camera</td>
              <td>{camera.primary || '-'}</td>
            </tr>
            <tr>
              <td>Weight</td>
              <td>{sizeAndWeight.weight || '-'}</td>
            </tr>
            <tr>
              <td>Cell</td>
              <td>{connectivity.cell || '-'}</td>
            </tr>
          </tbody>
        </table>
      </section>
    </section>
  );
};
