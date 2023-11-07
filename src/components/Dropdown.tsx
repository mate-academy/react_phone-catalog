import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { getSearchWith } from '../utils/helpers/searchParamsHelper';
import { ArrowRightIcon } from '../assets/images/icons/ArrowRightIcon';
import '../styles/blocks/Dropdown.scss';

type Props = {
  params: string;
  items: Array<{ name: string, title: string }>;
};

export const Dropdown: React.FC<Props> = ({ params, items }) => {
  const [expanded, setExpanded] = useState(false);
  const [searchParams] = useSearchParams();
  const currentParams = searchParams.get(params) || items[0].name;
  const { title }
    = items.find((item) => item.name === currentParams) || items[0];

  useEffect(() => {
    if (!expanded) {
      return () => {};
    }

    const handleDocumentClick = () => {
      setExpanded(false);
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [expanded]);

  return (
    <div className={cn('dropdown', { isActive: expanded })}>
      <button
        type="button"
        className="dropdown__button"
        onClick={() => {
          setExpanded((current) => !current);
        }}
      >
        <span className="dropdown__text">{title}</span>

        <ArrowRightIcon className="dropdown__arrow" />
      </button>

      <div className="dropdown__menu">
        <div className="dropdown__content">
          {items.map((item) => (
            <Link
              key={item.name}
              to={{
                search: getSearchWith(searchParams, {
                  [params]: item.name,
                  page: '1',
                }),
              }}
              className="dropdown__item"
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
