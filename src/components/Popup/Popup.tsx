import { CLOSING_SVG } from '../../utils/SVG';
import { ContainerStyled, ExitPopUpStyled, PopUpStyled } from './styled';
import ReactDOM from 'react-dom';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <PopUpStyled>
      <ContainerStyled>
        <ExitPopUpStyled onClick={onClose}>
          <CLOSING_SVG />
        </ExitPopUpStyled>

        {children}
      </ContainerStyled>
    </PopUpStyled>,
    document.getElementById('modal-root') as HTMLElement,
  );
};

export default Modal;
