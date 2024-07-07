import './ToggleButton.scss';

type Props = {
  onDark: () => void;
  isDark: boolean;
};

export const ToggleButton = ({ onDark, isDark }: Props) => {
  return (
    <>
      <div className="toggle__container">
        <input
          type="checkbox"
          id="check"
          className="toggle"
          onChange={onDark}
          checked={isDark}
        />

        <label htmlFor="check">{}</label>
      </div>
    </>
  );
};
