/* eslint-disable max-len */
import { DropdownIndicatorProps, GroupBase, components } from 'react-select';

export const DropdownIndicator = (
  props: JSX.IntrinsicAttributes &
  DropdownIndicatorProps<unknown, boolean, GroupBase<unknown>>,
) => {
  const { menuIsOpen } = props.selectProps;

  const caretClass = menuIsOpen ? 'caret-up' : 'caret-down';

  return (
    <components.DropdownIndicator {...props}>
      <div className={`${caretClass}`} />
    </components.DropdownIndicator>
  );
};
