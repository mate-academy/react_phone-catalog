// eslint-disable
import './footer.scss';

type Props = {
  onClick: () => void,
};

export const Footer: React.FC<Props> = ({ onClick }) => {
  return (
    <div className="footer">

      <div
        className="text-navbar--left navbar-box-item mp-0"
        style={{ marginLeft: 24 }}
      >
        <img src="./img/icons/logo2.svg" alt="img" />
      </div>

      <div className="footer-arrow-block">
        <div className="footer-center-text mr-64">Github</div>
        <div className="footer-center-text mr-64">Contacts</div>
        <div className="footer-center-text mr-64">Rights</div>
      </div>
      <div
        className="footer-arrow-block"
        onClick={onClick}
        onKeyDown={onClick}
        role="button"
        tabIndex={0}
      >
        <div className="footer-arrow-text">Back to top</div>
        <div
          className="footer-arrow"
          style={{ marginRight: 24 }}
        >
          <img src="./img/icons/arrowTop.svg" alt="img" />
        </div>
      </div>

    </div>
  );
};
