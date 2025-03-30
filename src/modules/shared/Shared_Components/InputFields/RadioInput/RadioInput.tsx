import { UserPaymentOptions } from '../../../Types/types';
import classNames from 'classnames';

interface Props {
  data: UserPaymentOptions;
  listOfOptions: UserPaymentOptions[];
  onCheck: (arr: UserPaymentOptions[], val: UserPaymentOptions) => void;
}

export const RadioInput: React.FC<Props> = ({
  data,
  listOfOptions,
  onCheck,
}) => {
  const setNewChecked = (optionId: string) => {
    const newList = listOfOptions.map(item => {
      return item.paymentId === optionId
        ? { ...item, isChecked: true }
        : { ...item, isChecked: false };
    });

    onCheck(newList, data);
  };

  return (
    <div
      className={classNames('radio-input', {
        'radio-input--is-Checked': data.isChecked,
      })}
      onClick={() => setNewChecked(data.paymentId)}
    >
      <input
        type="radio"
        className="radio-input__radio"
        checked={data.isChecked}
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
