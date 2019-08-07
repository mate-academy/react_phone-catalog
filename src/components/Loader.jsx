import React from 'react'

const Loader = ({isLoading}) => (
  <div>
    {
      isLoading && <div class="loading"></div>
    }
  </div>
)

export default Loader