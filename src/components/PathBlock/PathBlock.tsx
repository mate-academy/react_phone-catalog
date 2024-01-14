import { Link } from 'react-router-dom';
import './path-block.scss';

type Props = {
  currentPage: string,
  item?: string
};

export const PathBlock:React.FC<Props> = ({ currentPage, item }) => {
  return (
    <div className="path-box">
      <Link
        to="/home"
        className="home__link icon"
      />
      <div className="arrow-path icon" />
      {item ? (
        <>
          <Link className="current-page__link" to={`/${currentPage.toLowerCase()}`}>{currentPage}</Link>
          <div className="arrow-path icon" />
          <p className="current-item">
            {item}
          </p>

        </>
      ) : (
        <>
          <p className="current-page">{currentPage}</p>
          <p className="current-item">
            {item}
          </p>

        </>
      )}

    </div>
  );
};
