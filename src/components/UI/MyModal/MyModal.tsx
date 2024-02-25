import { Link } from 'react-router-dom';
import './MyModal.scss';
import { setScrollState } from '../../../helpers/pageHelper';

type Props = {
  children: React.ReactNode;
  closeModal: () => void;
};

export const MyModal: React.FC<Props> = ({ children, closeModal }) => {
  return (
    <section className="my-modal" id="modal">
      <div className="my-modal__content scale-in-center">
        <Link
          to="."
          aria-label="close dialog window"
          className="my-modal__close"
          onClick={() => {
            closeModal();
            setScrollState('auto');
          }}
        />
        {children}
      </div>
    </section>
  );
};
