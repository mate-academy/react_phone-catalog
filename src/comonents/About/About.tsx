import './About.scss';

type Props = {
  description: string,
  screen: string,
  screenResolution: string,
  os: string,
  ram: string,
  type: string,
  primary: string,
  capacity: string,
};

export const About: React.FC<Props> = ({
  description,
  screen,
  screenResolution,
  os,
  ram,
  type,
  primary,
  capacity,
}) => {
  return (
    <div className="about">
      <div className="about__description">
        <h2 className="about__title">
          About
        </h2>

        <div
          className="about__text text"
          data-cy="productDescription"
        >
          {description}
        </div>
      </div>

      <div className="about__tech">
        <h2 className="about__title">
          Tech space
        </h2>
        <ul className="about__tech about__tech--container">
          <li className="about__info">
            <p className="text text--gray">Screen</p>
            <p className="text">{screen}</p>
          </li>
          <li className="about__info">
            <p className="text text--gray">
              Resolution
            </p>
            <p className="text">{screenResolution}</p>
          </li>
          <li className="about__info">
            <p className="text text--gray">OS</p>
            <p className="text">{os}</p>
          </li>
          <li className="about__info">
            <p className="text text--gray">Ram</p>
            <p className="text">{ram}</p>
          </li>
          <li className="about__info">
            <p className="text text--gray">
              Battery
            </p>
            <p className="text">
              {type}
            </p>
          </li>
          <li className="about__info">
            <p className="text text--gray">Camera</p>
            <p className="text">{primary}</p>
          </li>
          <li className="about__info">
            <p className="text text--gray">Capacity</p>
            <p className="text">{capacity}</p>
          </li>
        </ul>
      </div>
    </div>
  );
};
