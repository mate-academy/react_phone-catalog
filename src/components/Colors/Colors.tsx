import classNames from 'classnames';
import { Link } from 'react-router-dom';

type Props = {
  colours: string[],
  currColor: string,
  product: string,
  capacity: string,
};

export const Colors: React.FC<Props> = ({
  colours, currColor, product, capacity,
}) => {
  return (
    <div className="colours__content">
      {colours.map(colour => (
        <div className={classNames('colours__wrapper', {
          'colours__wrapper--current': colour === currColor,
        })}
        >
          <Link
            to={`/phones/${product}-${capacity.toLowerCase()}-${colour}`}
            className={`colours__colour colours__colour--${colour}`}
            key={colour}
          >
            <p hidden>
              {colour}
            </p>
          </Link>
        </div>
      ))}
    </div>
  );
};
