/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import '../../styles/components/Input/Input.scss';

type Props = {
  position: string;
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
};

export const Input: React.FC<Props> = ({
  position,
  value,
  onChange,
  onClear,
}) => {
  return (
    <div className={classNames('search', {
      'has-icon': !value,
    })}
    >
      <input
        placeholder={`Search in ${position}`}
        value={value}
        className="search__input"
        onChange={event => onChange(event.target.value)}
      />

      <button
        type="button"
        className={classNames('search__button', {
          'is-visible': !!value,
        })}
        onClick={onClear}
      />
    </div>
  );
};
