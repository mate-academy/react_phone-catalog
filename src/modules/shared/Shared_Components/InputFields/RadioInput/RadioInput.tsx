import { useContext } from 'react';
import { DarkModeContext } from '../../../../../Store/StoreThemeMode';
import { UserPaymentOptions } from '../../../Types/types';
import classNames from 'classnames';

interface Props {
  data: UserPaymentOptions;
  onSelectHandler: () => void;
}

export const RadioInput: React.FC<Props> = ({ data, onSelectHandler }) => {
  const { isDark } = useContext(DarkModeContext);

  return (
    <div
      className={classNames('radio-input', {
        'radio-input--is-Checked': data.isChecked,
        'radio-input--dark': isDark,
        'radio-input--dark-is-checked': isDark && data.isChecked,
      })}
      onClick={() => onSelectHandler()}
    >
      <input
        type="radio"
        className="radio-input__radio"
        checked={data.isChecked}
        readOnly
      />

      <div className="radio-input__text-container">
        <h4
          className={classNames('title title--h4 radio-input__title', {
            'title--is-Dark': isDark,
          })}
        >
          {data.paymentTitle}
        </h4>

        <p className="body-text radio-input__text">{data.paymentDescription}</p>
      </div>
    </div>
  );
};
