import './EmptyModal.scss';

type Props = {
  name?: string;
};

const EmptyModal: React.FC<Props> = ({ name = 'Not found' }) => (
  <div className="empty-modal">
    <span className="empty-modal__name">
      {`${name}`}
    </span>
  </div>
);

export default EmptyModal;
