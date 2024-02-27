/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { NewParamsProps } from '../../types/NewParams';

type DropdownProps = {
  addParam: (newParams: NewParamsProps) => void;
  param: string,
  info: {
    title: string,
    paramValue: string,
  }[];
};

export const Dropdown: React.FC<DropdownProps> = ({
  addParam,
  param,
  info,
}) => {
  const [isToggled, setIsToggled] = useState(false);
  const [searchParams] = useSearchParams();
  const [Title, setTitle] = useState(info
    .find(item => item.paramValue === searchParams.get(param))?.title
    || info[0].title);

  const handleTitleAndSortChange = (title: string, sortValue: string) => {
    setTitle(title);
    setIsToggled(false);

    if (param === 'perPage') {
      return addParam({
        [param]: sortValue,
        page: 1,
      });
    }

    return addParam({ [param]: sortValue });
  };

  return (
    <div className="dropdown">
      <div
        className="dropdown__name"
      >
        {param === 'perPage' ? 'Items on page' : 'Sort by'}
      </div>

      <div className="dropdown__container">
        <div
          tabIndex={0}
          className="dropdown__header"
          onClick={() => setIsToggled(!isToggled)}
          onBlur={() => setTimeout(() => {
            return setIsToggled(false);
          }, 250)}
        >
          {Title}
        </div>

        <div
          className={classNames(
            'dropdown__list',
            isToggled
              ? 'dropdown__list--on'
              : 'dropdown__list--off',
          )}
        >
          {info.map(item => {
            return (
              <div
                key={item.title}
                className="dropdown__item"
                onClick={() => {
                  handleTitleAndSortChange(item.title, item.paramValue);
                }}
              >
                {item.title}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
