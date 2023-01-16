type Props = {
  isContacts: boolean,
  setIsContacts: (value: boolean) => void
};

export const ContacsModal: React.FC<Props> = ({
  isContacts,
  setIsContacts,
}) => (
  <div className="modal is-active">
    <div className="modal-background" />
    <div className="notification is-dark">
      <button
        type="button"
        className="delete"
        aria-label="close"
        onClick={() => {
          setIsContacts(!isContacts);
        }}
      />
      <p className="is-size-5">+380981111111</p>
    </div>
  </div>
);
