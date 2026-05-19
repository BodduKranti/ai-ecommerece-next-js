import Link from 'next/link'

const CartItems = ({ product }: { product: any }) => {
    return (
        <li key={product.id} className="flex py-6">
            <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                <img alt={product.title} src={product.thumbnail} className="size-full object-cover" />
                {/* <ImageItem
                                                                src={product.thumbnail}
                                                                alt={product.title}
                                                                className="size-full object-cover"
                                                            /> */}
            </div>

            <div className="ml-4 flex flex-1 flex-col">
                <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                            <Link
                                href={{
                                    pathname: `/product/${product?.id}`,
                                    query: { title: product?.title, id: product?.id },
                                }}                            >
                                {product?.title}
                            </Link>
                        </h3>
                        <p className="ml-4">{product.price}</p>
                    </div>
                </div>
                <div className="flex flex-1 items-end justify-between text-sm">
                    <p className="text-gray-500">Qty {product.quantity}</p>

                    <div className="flex">
                        <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Remove
                        </button>
                    </div>
                </div>
            </div>
        </li>
    )
}

export default CartItems
