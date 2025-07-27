import * as React from 'react';
import { Select } from 'radix-ui';
import './Dropdown.scss';
import classNames from 'classnames';
import { useTranslationState } from '../../stateManagers/languageState';
import { useThemeState } from '../../stateManagers/themeState';

interface DropdownProps {
  title?: string;
  value: string | number;
  onChange: (v: string) => void;
  variants: (string | number)[];
  cl: string;
  chewron?: boolean;
}

export const Dropdown: React.FC<DropdownProps> = ({
  title,
  value,
  onChange,
  variants,
  cl,
  chewron = true,
}) => {
  const { translate } = useTranslationState();
  const [isOpen, setIsOpen] = React.useState(false);
  const { theme } = useThemeState();

  return (
    <div className={`dropdown dropdown--${theme}`}>
      {title && <label className="dropdown__name small-text">{title}</label>}
      <Select.Root
        value={value.toString()}
        onValueChange={onChange}
        onOpenChange={setIsOpen}
      >
        <Select.Trigger
          className={classNames(
            'SelectTrigger',
            `SelectTrigger--${theme}`,
            cl,
            'btn-reset',
          )}
          aria-label="dropdown"
        >
          <Select.Value />

          {chewron &&
            (isOpen ?
              <div className="icon-chewron-up"></div>
            : <div className="icon-chewron-down"></div>)}
        </Select.Trigger>

        <Select.Portal>
          <Select.Content
            className={classNames(
              'SelectContent',
              `SelectContent--${theme}`,
              `${cl}-content`,
            )}
            position="popper"
            side="bottom"
            collisionPadding={-10}
          >
            <Select.Viewport className="SelectViewport">
              <Select.Group>
                {variants.map((variant) => (
                  <Select.Item
                    key={variant}
                    value={variant.toString()}
                    className={classNames('SelectItem', `SelectItem--${theme}`)}
                  >
                    <Select.ItemText>
                      {typeof variant === 'string' ?
                        translate(`${variant}`)
                      : variant}
                    </Select.ItemText>
                  </Select.Item>
                ))}
              </Select.Group>
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
};
