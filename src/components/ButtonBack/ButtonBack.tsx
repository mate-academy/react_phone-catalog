/* eslint-disable import/no-extraneous-dependencies */
import { Link } from 'react-router-dom';
import './ButtonBack.scss';

type Props = {
  back?: string,
};

export const ButtonBack: React.FC<Props> = ({ back }) => {
  return (
    <div className="button-back">
      <div className="icon icon--arrow-left" />

      <Link
        type="button"
        data-cy="backButton"
        className="button-back__link"
        to={back ? `/${back}` : '/'}
      >
        Back
      </Link>
    </div>
  );
};
