import './Modal.scss';
import { ButtonIcon } from '../../elements/ButtonIcon/ButtonIcon';
import { capitalize } from '../../helpers/utils/capitalize';

type Props = {
  type: 'cart' | 'favourite';
};

export const Modal: React.FC<Props> = ({ type }) => {
  return (
    <div className="modal">
      <div className="modal__icon" />

      <h1 className="modal__title">Product was added</h1>

      <div className="modal__content">
        <p className="modal__text">
          {`Click to check your ${capitalize(type)}`}
        </p>
        <ButtonIcon
          type="link"
          path={`/${type}`}
          shape={`${type}-big`}
          dynamicClasses={['no-border', 'biggest']}
        />
      </div>
    </div>
  );
};
