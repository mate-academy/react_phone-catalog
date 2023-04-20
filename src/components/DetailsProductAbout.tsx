import { Description } from '../types/Description';

type Props = {
  description?: Description[];
};

export const DetailsProductAbout: React.FC<Props> = ({ description }) => (
  <ul className="details-about-container" data-cy="productDescription">
    <li>
      <h2 className="details-about-container__title">
        About
      </h2>
      <div className="details-about-container__underline" />
    </li>
    {description?.map(option => (
      <li key={option.title}>
        <h3 className="details-about-container__subtitle">
          {option.title}
        </h3>
        <div className="details-about-container__paragraph">
          {option.text}
        </div>
      </li>
    ))}
  </ul>
);
