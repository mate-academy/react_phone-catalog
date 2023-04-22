import './CardAbout.scss';
import { CardDescription } from '../../../types/CardDescription';

type Props = {
  description: CardDescription[];
};

const CardAbout: React.FC<Props> = ({ description }) => (
  <div className="card-about">
    <h3 className="card-about__title">About</h3>

    <div className="line card-about__line" />

    <div className="card-about__info__list">
      {description.map(({ title, text }) => (
        <div key={title} className="card-about__info">
          <h4 className="card-about__info__title">
            {title}
          </h4>
          <p className="card-about__info__text">
            {text}
          </p>
        </div>
      ))}
    </div>
  </div>
);

export default CardAbout;
