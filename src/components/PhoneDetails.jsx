import React from 'react'

const PhoneDetails = ({id, phone, details}) => {
  console.log(details);

  return (
    <div>
      <section
        className='currentPhone__top-block'
      >
        <img 
          className='currentPhone__top-block-current-img'
          src={`/${phone.imageUrl}`}
          alt="phone_photo"
        />
        <h1 className='currentPhone__top-block-title'>
          {phone.name}
        </h1>
        <div
          className='currentPhone__top-block-snippet'
        >
          {phone.snippet}
        </div>
        <ul className='currentPhone__top-block-all-imgs'>
          {
            details.images.map(image => 
              <img 
                className='currentPhone__top-block-all-imgs-item'
                src={`/${image}`} 
                alt=""
              />
            )
          }
        </ul>
      </section>
      <section>
      </section>
    </div>
  )
}

export default PhoneDetails