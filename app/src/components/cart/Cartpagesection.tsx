'use client'
import { CartItem } from '../../types';
import { useAppSelector } from '../../store/hook';
import CartList from './CartList';
import NoRecords from '../common/NoRecords';

const Cartpagesection = () => {
    const cartList: CartItem[] = useAppSelector((state) => state.cart.items);
    console.log('cartList', cartList)
    return (
        cartList?.length > 0 ?
            <CartList cartList={cartList} /> :
            <NoRecords
                Message={'Empty Cart'}
            />
    )
}

export default Cartpagesection
