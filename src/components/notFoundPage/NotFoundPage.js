import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div>
    <div>
      404
      Not Found
    </div>

    <div>
      {`You may go to `}
      <Link to="/">
        Home page
      </Link>
      {` and try find what you look for`}
    </div>
  </div>
);

export default NotFoundPage;
