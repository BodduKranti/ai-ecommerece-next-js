import React from 'react'
import Productsitems from './Productsitems'

interface ProductsListProps {
    products: any[]
}

const ProductsList = ({ products }: ProductsListProps) => {
    return (
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
                <Productsitems key={product.id} {...product} />
            ))}
        </div>
    )
}

export default ProductsList
