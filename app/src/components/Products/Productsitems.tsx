import Link from 'next/link'
import React from 'react'

interface ProductsitemsProps {
    id: number,
    title: string,
    category: string,
    price: number,
    discountPercentage: number,
    rating: number,
    stock: number,
    brand: string,
    thumbnail: string,
}

const Productsitems = ({ id, title, category, price, discountPercentage, rating, stock, brand, thumbnail }: ProductsitemsProps) => {
    return (
        <div key={id} className="group relative">
            <img
                alt={title}
                src={thumbnail}
                className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
            />
            <div className="mt-4 flex justify-between">
                <div>
                    <h3 className="text-sm text-gray-700">
                        <Link
                            href={{
                                pathname: `/product/${id}`,
                                query: { title: title, id: id },
                            }}
                        >
                            <span aria-hidden="true" className="absolute inset-0" />
                            {title}
                        </Link>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{category}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">${price.toFixed(2)}</p>
            </div>
        </div>
    )
}

export default Productsitems
