import React from 'react'

const Loader = ({isLoading}) => (
  <div>
    {
      isLoading && <div className="loading"></div>
    }
  </div>
)

export default Loader