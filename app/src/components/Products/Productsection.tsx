import { Handbag, ShoppingCart, Star } from 'lucide-react';
import CommonBtns from '../Buttons/CommonBtns';
import { useAppDispatch } from '../../store/hook';
import { addToCart } from '../../store/slices/cartSlice';
interface reviews {
    rating: number,
    comment: string,
    date: string,
    reviewerName: string,
    reviewerEmail: string
}
interface ProductsectionProps {
    id: any,
    rating: number,
    price: any,
    title: string,
    description: string,
    discountPercentage: number,
    stock: number,
    brand: string,
    category: string,
    reviews: reviews[],
    warrantyInformation: string,
    shippingInformation: string,
    returnPolicy: string,
    sellerInformation: string,
    thumbnail: string,
}

const Productsection = ({ id, rating, price, title, description, thumbnail, discountPercentage, stock, brand, category, reviews, warrantyInformation, shippingInformation, returnPolicy, sellerInformation }: ProductsectionProps) => {
    const totalStars = 5;
    const dispatch = useAppDispatch()
    const product: any = { id, price, title, thumbnail }
    // const cartItem = useAppSelector((state) => state.cart);

    // console.log('cartItem', cartItem)

    return (
        <div className='md:w-1/2 w-full'>
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{title}</h1>
            </div>

            <div className="mt-4 lg:row-span-3 lg:mt-0">
                <h2 className="sr-only">Product information</h2>
                <p className="text-3xl tracking-tight text-gray-900 mt-2">${price}</p>

                <div className="mt-6">
                    <h3 className="sr-only">Ratings</h3>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                            {[...Array(totalStars)].map((_, index) => {
                                const starNumber = index + 1;

                                return (
                                    <div
                                        key={index}
                                        className={`w-8 h-8 flex items-center justify-center rounded-full 
                                            ${starNumber <= Math.round(rating)
                                                ? "bg-yellow-400 text-white"
                                                : "bg-gray-200 text-gray-400"
                                            }`}
                                    >
                                        {starNumber <= Math.round(rating) ? (
                                            <Star size={16} />
                                        ) : (
                                            <Star size={16} />
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                        <p className="text-sm text-gray-600">{rating} out of 5 stars</p>
                    </div>

                    <div className='w-full md:flex grid grid-cols-1 gap-4 py-4'>
                        <CommonBtns
                            btnText={`Add to Cart`}
                            btnIcon={<ShoppingCart className='w-4 h-4' />}
                            btnIconSide='left'
                            buttonType='btn-dashboard'
                            className={'md:w-auto w-full'}
                            type='button'
                            onClick={() =>
                                dispatch(
                                    addToCart({
                                        ...product,
                                        quantity: 1,
                                    })
                                )
                            }
                        />

                        <CommonBtns
                            btnText={`Buy Now`}
                            btnIcon={<Handbag className='w-4 h-4' />}
                            btnIconSide='left'
                            buttonType='btn-activate'
                            className={'md:w-auto w-full text-white!'}
                            type='button'
                        // onClick={() =>
                        //     dispatch(
                        //         addToCart({
                        //             ...product,
                        //             quantity: 1,
                        //         })
                        //     )
                        // }
                        />
                    </div>

                </div>



                <div className="py-10 lg:col-span-2 lg:col-start-1  lg:pt-6 lg:pr-8 lg:pb-16">
                    {/* Description and details */}
                    <div>
                        <h3 className="sr-only">Description</h3>

                        <div className="space-y-6">
                            <p className="text-base text-gray-900">{description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Productsection
