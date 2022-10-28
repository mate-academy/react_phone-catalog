import { Link } from 'react-router-dom';
import { ReactComponent as ArrowUP } from '../../img/icons/VectorUP.svg';

export const Footer = () => {
  const srollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <section className="section">
      <div className="container">
        <div className="columns">
          <div className="column is-flex is-align-items-center">
            <Link to="/" className="navibar__logo">
              <span className="navibar__logo" />
            </Link>
          </div>
          <div className="column is-flex is-justify-content-space-between">
            <a
              href="#0"
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
              onClick={srollTop}
            >
              <ArrowUP />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
