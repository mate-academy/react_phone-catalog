import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import './Dropdown.scss';
import { ArrowRight } from '../../assets/icons/ArrowRight';
import { normalizeUrlParams }
  from '../../helpers/funcService/normalizeUrlParams';

type Props = {
  params: string;
  items: Array<{ name: string; title: string }>;
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

        <ArrowRight className="dropdown__arrow" />
      </button>

      <div className="dropdown__menu">
        <div className="dropdown__content">
          {items.map((item) => (
            <Link
              key={item.name}
              to={{
                search: normalizeUrlParams(searchParams, {
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
