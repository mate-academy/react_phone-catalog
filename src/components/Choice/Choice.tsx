export const Choice: React.FC = () => (
  <>
    <span className="small-text small-text--light">
      Available colors
    </span>
    <br />
    <div className="container">
      <div className="container--circle">
        <div
          title="this option is not available now"
          className="color-option color-option--pink"
        />
      </div>
      <div className="container--circle">
        <div
          title="this option is not available now"
          className="color-option color-option--grey"
        />
      </div>
      <div className="container--circle">
        <div
          title="this option is not available now"
          className="color-option color-option--light-grey"
        />
      </div>
      <div className="container--circle">
        <div
          title="this option is not available now"
          className="color-option color-option--silver"
        />
      </div>
    </div>
    <div className="row" />
    <br />
    <span className="small-text small-text--light">
      Select capacity
    </span>
    <br />
    <div className="container">
      <div
        title="this option is not available now"
        className="container container--center container--capacity text"
      >
        64 GB
      </div>
      <div
        title="this option is not available now"
        className="container container--center container--capacity text"
      >
        256 GB
      </div>
      <div
        title="this option is not available now"
        className="container container--center container--capacity text"
      >
        512 GB
      </div>
    </div>
    <div className="row" />
  </>
);
