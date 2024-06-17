/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { DropdownParam } from '../../types/DropdownParam';
import { useSearchParams } from 'react-router-dom';

type Props = {
  srcParam: string;
  params: DropdownParam[];
  parentClassName?: string;
  coClass?: string;
  textTitle: string;
  noParams?: string;
};

export const Dropdown: React.FC<Props> = ({
  srcParam,
  params,
  parentClassName = '',
  coClass = '',
  textTitle,
  noParams = 'None',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [title, setTitle] = useState<string>();

  const handleToggleOpen = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setTitle(
      params.find(param => param.searchParam === searchParams.get(srcParam))
        ?.title ?? noParams,
    );
  }, [noParams, searchParams, params, srcParam]);

  return (
    <div
      className={classNames(
        'dropdown',
        {
          [`${parentClassName}__dropdown`]: parentClassName,
        },
        { [coClass]: coClass },
      )}
    >
      <p className="dropdown__text small-text">{textTitle}</p>
      <div
        className={classNames('dropdown__params button-text', {
          'dropdown__params-active': isOpen,
        })}
        onClick={handleToggleOpen}
      >
        {title}
        {isOpen && (
          <div className="dropdown__param-block">
            {params.map(param => (
              <p
                key={param.id}
                className="dropdown__param body-text"
                onClick={() => {
                  if (!param.searchParam) {
                    searchParams.delete(srcParam);
                  } else {
                    searchParams.set(srcParam, param.searchParam);
                  }

                  setSearchParams(searchParams);
                  setIsOpen(false);
                  setTitle(param.title);
                }}
              >
                {param.title}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
