/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Link, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getSearchWith } from '../utils/searchHelper';
import { toUpperCaseFirstLetter } from '../utils/helpers';

type Props = {
  list: string[];
  type: string;
  title: string;
};

export const Dropdown: React.FC<Props> = ({ list, type, title }) => {
  const [searchParams] = useSearchParams();
  const [value, setValue] = useState('');

  const { t, i18n } = useTranslation();

  useEffect(() => {
    setValue(toUpperCaseFirstLetter(t(`${searchParams.get(`${type}`) || list[0]}`)));
  }, [i18n.language]);

  return (
    <div>
      <span>{title}</span>
      <br />

      <div className="dropdown">
        <button className="dropbtn" type="button">
          {t(`${value}`)}
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
              key={`${item}`}
            >
              {t(`${item}`)}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
