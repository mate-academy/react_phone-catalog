/* eslint-disable max-len */
import './AboutDetails.scss';

type Props = {
  productDescription: string;
};

export const AboutDetails: React.FC<Props> = ({ productDescription }) => {
  return (
    <div className="AboutDetails">
      <h3 className="AboutDetails__title">About</h3>
      <p className="AboutDetails__paragraph">
        {productDescription}
      </p>
    </div>

  );
};
