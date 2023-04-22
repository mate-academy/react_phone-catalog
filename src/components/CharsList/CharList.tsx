import './CharList.scss';

import { Char } from '../../types/Char';

type Props = {
  list: Char[];
  classes?: string;
};

const CharsList: React.FC<Props> = ({ list, classes }) => (
  <ul className={`${classes} chars`}>
    {list.map(({ key, value }) => (
      <li key={key} className="char">
        <span className="char__key">{key}</span>
        {Array.isArray(value)
          ? (
            <>
              <span className="char__value">
                {value.join(', ')}
              </span>
            </>
          )
          : (
            <span className="char__value">
              {value}
            </span>
          )}
      </li>
    ))}
  </ul>
);

export default CharsList;
