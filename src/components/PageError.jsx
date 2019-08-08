import React from 'react'
import { Link } from 'react-router-dom';

const PageError = () => (
  <div className="error-message">
    <div className="error-image" />

    <Link
      to="/"
      className="back-to-home-error-button"
    >
      Back to Home Page
    </Link>
  </div>
)

export default PageError
