import RightsImage from '../../img/rights/rights_reserved.png';

type Props = {
  isRights: boolean,
  setIsRights: (value: boolean) => void
};

export const RightsModal: React.FC<Props> = ({
  isRights,
  setIsRights,
}) => (
  <div className="modal is-active">
    <div className="modal-background" />
    <div className="modal-content">
      <button
        type="button"
        className="delete is-large"
        aria-label="close"
        onClick={() => {
          setIsRights(!isRights);
        }}
      />
      <figure className="image">
        <img src={RightsImage} alt="AllRightsReserved" />
      </figure>
    </div>
  </div>
);
