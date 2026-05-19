import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { useAppSelector } from '../../store/hook';
import { CartItem } from '../../types';
import CartHeaderDailog from './CartHeaderDailog';

const HeaderCart = () => {
    const cartList: CartItem[] = useAppSelector((state) => state.cart.items);
    // console.log('cartList', cartList)
    const [open, setOpen] = React.useState<boolean>(false)

    return (
        <>
            <div className="ml-4 flow-root lg:ml-6" onClick={() => setOpen(!open)}>
                <Link href="/cart" className="group -m-2 flex items-center p-2">
                    <ShoppingCart
                        aria-hidden="true"
                        className="size-6 shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                        {cartList?.length || 0}
                    </span>
                    <span className="sr-only">items in cart, view bag</span>
                </Link>
            </div>
            <CartHeaderDailog
                open={open}
                setOpen={setOpen}
                products={cartList}
            />
        </>

    )
}

export default HeaderCart
