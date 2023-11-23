import { Link, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getSearchWith } from '../helpers/searchHelper';

type Props = {
  list: string[];
  type: string;
  title: string;
};

export const Dropdown: React.FC<Props> = ({ list, type, title }) => {
  const [searchParams] = useSearchParams();
  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(searchParams.get(type) || list[0]);
  }, []);

  return (
    <div>
      <span>{title}</span>
      <br />

      <div className="dropdown">
        <button className="dropbtn" type="button">
          {value}
        </button>
        <div className="dropdown-content">
          {list.map((item: string) => (
            <Link
              to={{
                search: getSearchWith(searchParams, { [type]: `${item}` }),
              }}
              onClick={() => {
                setValue(item);
              }}
              key={item}
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
