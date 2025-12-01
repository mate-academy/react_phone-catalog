import React from 'react'
type ProductGalleryProps = {
  photos?: string[];
}

const ProductGallery:React.FC<ProductGalleryProps> = ({photos}) => {
  return (
    <div>ProductGallery</div>
  )
}

export default ProductGallery
