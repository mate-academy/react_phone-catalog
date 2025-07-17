import Select from 'react-select';

type Option = {
  value: string;
  label: string;
};

type Props = {
  options: Option[];
  selectedOption: Option;
  onChange: (o: string) => void;
};

export const CustomDropdown = ({
  options,
  selectedOption,
  onChange,
}: Props) => (
  <Select
    classNamePrefix="sortSelect"
    id="sortSelect"
    options={options}
    onChange={option => onChange(option.value)}
    defaultValue={selectedOption}
    styles={{
      control: (base, state) => ({
        ...base,
        backgroundColor: 'var(--color-surface2)',

        borderRadius: '0',
        padding: '0',
        boxSizing: 'border-box',
        paddingInline: '12px',
        boxShadow: 'none',
        cursor: 'pointer',
        border: state.isFocused
          ? '1px solid var(--color-accent)'
          : '1px solid var(--color-surface2)',
        '&:hover': {
          border: '1px solid var(--color-icons)',
        },
      }),
      valueContainer: base => ({
        ...base,
        paddingBottom: '11px',
        paddingTop: '6px',
        height: '40px',
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
      }),
      option: (base, state) => ({
        ...base,
        backgroundColor: state.isFocused
          ? 'var(--color-surface2)'
          : 'var(--color-black)',
        padding: '10px',
        cursor: 'pointer',
        color: 'var(--color-white)',
        fontFamily: 'var(--font-regular)',
        fontSize: '14px',
        lineHeight: '21px',
      }),
      menu: base => ({
        ...base,
        backgroundColor: 'var(--color-black)',
        marginTop: '4px',
        paddingBlock: '8px',
        border: '1px solid var(--color-elements)',
        borderRadius: '0',
        boxShadow: 'none',
      }),
      singleValue: base => ({
        ...base,
        color: 'var(--color-white)',
        fontFamily: 'var(--font-regular)',
        fontSize: '14px',
        lineHeight: '21px',
      }),
      dropdownIndicator: base => ({
        ...base,
        color: 'var(--color-secondary)',
        '&:hover': {
          color: 'var(--color-icons)',
        },
        padding: '4px',
      }),
      indicatorSeparator: () => ({
        display: 'none',
      }),
    }}
  />
);
