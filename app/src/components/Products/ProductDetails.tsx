import React from 'react'
import ProductImageGallery from './ProductImageGallery'
import Productsection from './Productsection'

const ProductDetails = ({ productDetails }: { productDetails: any }) => {
    console.log('productDetails', productDetails)
    return (
        <div className='w-full md:flex grid grid-cols-1 gap-4 py-4'>
            <ProductImageGallery {...productDetails} />
            <Productsection {...productDetails} />
        </div>
    )
}

export default ProductDetails
