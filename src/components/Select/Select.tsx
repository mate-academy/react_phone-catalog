import {
  FunctionComponent,
  useState,
} from 'react';
import classNames from 'classnames';

// Styles
import './Select.scss';

// Types
import { ButtonCallback } from '../../types/ButtonCallback';

// Components
import { Button } from '../Button';
import { OptionsList } from '../OptionsList';

type Props = {
  title: string;
  selectedItem: string | null;
  items: string[];
  onChangeItem: (arg0: string) => void;
};

export const Select: FunctionComponent<Props> = ({
  title,
  selectedItem,
  items,
  onChangeItem,
}) => {
  const [isOpened, setIsOpened] = useState(false);

  const toogler: ButtonCallback = () => {
    setIsOpened(!isOpened);
  };

  const close = () => {
    setIsOpened(false);
  };

  return (
    <div className="Select">
      <p className="Select__title">
        {title}
      </p>

      <Button
        disablet={false}
        classModificator="Button--select"
        callback={toogler}
      >
        <span className={classNames(
          'Select__selectedItem',
          {
            'Select__selectedItem Select__selectedItem--opened': isOpened,
          },
        )}
        >
          {selectedItem}
        </span>
      </Button>

      {isOpened && (
        <OptionsList
          options={items}
          onChangeItem={onChangeItem}
          close={close}
        />
      )}
    </div>
  );
};
