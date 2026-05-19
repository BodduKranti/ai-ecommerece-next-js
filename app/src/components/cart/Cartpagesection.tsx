'use client'
import { CartItem } from '../../types';
import { useAppSelector } from '../../store/hook';
import CartList from './CartList';

const Cartpagesection = () => {
    const cartList: CartItem[] = useAppSelector((state) => state.cart.items);
    console.log('cartList', cartList)
    return (
        <CartList cartList={cartList} />
    )
}

export default Cartpagesection
