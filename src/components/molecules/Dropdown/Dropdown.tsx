import { useId } from 'react';

import classNames from 'classnames';
import { Select } from 'radix-ui';
import { useTranslation } from 'react-i18next';

import { ArrowIcon, Typography } from '@/components/atoms';

import styles from './Dropdown.module.scss';

type DropdownOption =
  | string
  | {
      label: string;
      value: string;
    };

type Props = {
  options: DropdownOption[];
  optionLabels?: Record<string, string>;
  description?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
};

export const Dropdown = ({
  options,
  optionLabels,
  description,
  value,
  defaultValue,
  onChange,
  className,
  placeholder,
  disabled = false,
}: Props) => {
  const { t } = useTranslation();
  const labelId = useId();

  const normalizedOptions = options.map((option) =>
    typeof option === 'string' ? { label: option, value: option } : option,
  );

  return (
    <div className={styles.container}>
      {description && (
        <Typography
          variant="smalltext"
          className={styles.description}
          id={labelId}
        >
          {description}
        </Typography>
      )}

      <Select.Root
        value={value}
        defaultValue={defaultValue}
        onValueChange={onChange}
        disabled={disabled}
      >
        <Select.Trigger
          className={classNames(styles.trigger, className)}
          aria-labelledby={description ? labelId : undefined}
        >
          <Typography
            variant="button"
            className="min-w-0"
          >
            <Select.Value placeholder={placeholder ?? t('dropdownChoose')} />
          </Typography>

          <Select.Icon className={`${styles.icon} shrink-0`}>
            <ArrowIcon direction="down" />
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content
            className={styles.content}
            position="popper"
            side="bottom"
            align="start"
            sideOffset={6}
            style={{
              minWidth: 'var(--radix-select-trigger-width)',
            }}
          >
            <Select.Viewport className={styles.viewport}>
              {normalizedOptions.map((option) => (
                <Select.Item
                  key={option.value}
                  value={option.value}
                  className={styles.item}
                >
                  <Select.ItemText>
                    <Typography variant="bodytext">
                      {optionLabels?.[option.label] ?? option.label}
                    </Typography>
                  </Select.ItemText>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
};
