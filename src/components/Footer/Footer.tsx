import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as ArrowUP } from '../../img/icons/VectorUP.svg';
import { srollToTop } from '../../utils/scrollToTop';
import { ContacsModal } from './ContactsModal';
import { RightsModal } from './RightsModal';

export const Footer = () => {
  const [isContacts, setIsContacts] = useState(false);
  const [isRights, setIsRights] = useState(false);

  const contactsHandler = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setIsContacts(!isContacts);
  };

  const rightsHandler = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setIsRights(!isRights);
  };

  return (
    <section style={{ boxShadow: '0px -1px 0px #e2e6e9' }} className="section">
      <div className="container">
        {isContacts && (
          <ContacsModal
            isContacts={isContacts}
            setIsContacts={setIsContacts}
          />
        )}
        {isRights && (
          <RightsModal
            isRights={isRights}
            setIsRights={setIsRights}
          />
        )}
        <div className="columns is-mobile">
          <div className="column is-flex is-align-items-center">
            <Link to="/" className="navibar__logo">
              <span className="navibar__logo" />
            </Link>
          </div>
          <div className="
            column
            is-flex
            is-justify-content-space-between
            is-hidden-mobile
            "
          >
            <a
              href="https://github.com/Yaroslav-Radchuk"
              className="
                has-text-grey-light
                has-text-weight-bold
                is-size-7
                is-flex
                is-align-items-center
              "
            >
              <p>GITHUB</p>
            </a>
            <a
              href="#0"
              className="
                has-text-grey-light
                has-text-weight-bold
                is-size-7
                is-flex
                is-align-items-center
              "
              onClick={contactsHandler}
            >
              <p>CONTACTS</p>
            </a>
            <a
              href="#0"
              className="
                has-text-weight-bold
                is-size-7
                has-text-grey-light
                is-flex
                is-align-items-center
              "
              onClick={rightsHandler}
            >
              <p>RIGHTS</p>
            </a>
          </div>
          <div className="
            column
            is-flex
            is-justify-content-flex-end
            is-align-items-center
            "
          >
            <p
              className="
                has-text-weight-semibold
                is-size-7
                has-text-grey-light
                mr-3
                "
            >
              Back to top
            </p>
            <button
              type="button"
              className="button navibar__button p-0"
              onClick={srollToTop}
            >
              <ArrowUP />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
