import { UserPaymentOptions } from '../../../Types/types';
import classNames from 'classnames';

interface Props {
  data: UserPaymentOptions;
  onSelectHandler: () => void;
}

export const RadioInput: React.FC<Props> = ({ data, onSelectHandler }) => {
  return (
    <div
      className={classNames('radio-input', {
        'radio-input--is-Checked': data.isChecked,
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
        <h4 className="title title--h4 radio-input__text">
          {data.paymentTitle}
        </h4>

        <p className="body-text radio-input__text">{data.paymentDescription}</p>
      </div>
    </div>
  );
};
