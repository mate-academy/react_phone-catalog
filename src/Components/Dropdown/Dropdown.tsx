import classNames from 'classnames';
import { useContext, useState } from 'react';
import { ProductContext } from '../../store/ProductContext';
import './Dropdown.scss';

type Props = {
  title: string;
  items: string[];
  initialItem: string;
  isForItemsOnPage: boolean;
};

export const Dropdown: React.FC<Props> = ({
  title,
  items,
  initialItem,
  isForItemsOnPage,
}) => {
  const [selectedItem, setSelectedItem] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const { onSetItemsOnPage, onSortBy } = useContext(ProductContext);

  const handleItemClick = (value: string) => {
    setSelectedItem(value);
    setIsVisible(false);

    if (isForItemsOnPage) {
      onSetItemsOnPage(value);
    } else {
      onSortBy(value);
    }
  };

  return (
    <div className="dropdown">
      <p className="dropdown__title">{title}</p>
      <div className="dropdown__triger">
        <button
          className="dropdown__button"
          onClick={() => setIsVisible(!isVisible)}
        >
          <span className="dropdown__text">
            {selectedItem ? selectedItem : initialItem}
          </span>
          <div className="dropdown__icon">
            <div className="dropdown__icon__down"></div>
          </div>
        </button>
      </div>

      <div
        className={classNames('dropdown__menu', {
          'dropdown__menu--is-active': isVisible,
        })}
      >
        <div className="dropdown__menu--content">
          {items.map(content => (
            <p
              className="dropdown__menu--item"
              key={content}
              onClick={() => handleItemClick(content)}
            >
              {content}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};
