import './DetailsAbout.scss';

import { ProductDetails } from '../../types/ProductDetails';

type Props = {
  details?: ProductDetails;
};

export const DetailsAbout: React.FC<Props> = ({ details }) => {
  return (
    <>
      <h2 className="about__title">
        About
      </h2>

      <ul
        className="about__blocks"
        data-cy="productDescription"
      >
        {details?.description.map(({ title, text }) => (
          <li
            key={title}
            className="about__block"
          >
            <h3 className="about__subtitle">
              {title}
            </h3>

            {text.map(pharagraph => (
              <p className="about__description">
                {pharagraph}
              </p>
            ))}
          </li>
        ))}
      </ul>
    </>
  );
};
