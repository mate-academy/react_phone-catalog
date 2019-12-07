import React from 'react';

const CheckMark = (objectPropForCheck) => {
  if (objectPropForCheck[0] !== false) {
    return (
      <img
        className='icon'
        src="./img/check_circle.svg"
        alt="Yes"
      />
    )
  } else {
    return (
      <img
        className='icon'
        src="./img/no_circle.svg"
        alt="No"
      />
    )
  }
}

export default CheckMark;