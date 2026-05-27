import { useContext } from 'react';
import './SearchInput.scss';
import { ThemeContext } from '../../context/ThemeContext';

type Props = {
  value: string;
  onChange: (value: string) => void;
  onClose: () => void;
};

export const SearchInput = ({ value, onChange, onClose }: Props) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="search-input">
      <input
        type="search"
        className="search-input__field"
        placeholder="Search..."
        value={value}
        onChange={event => onChange(event.target.value)}
      />

      <button type="button" className="search-input__close" onClick={onClose}>
        <img
          src={
            theme === 'dark'
              ? '/img/icons/close.svg'
              : '/img/icons-light/close-light.svg'
          }
          alt="Close search"
        />
      </button>
    </div>
  );
};
