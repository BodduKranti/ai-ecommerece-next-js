import { CartItem } from "../../types";
import CartItems from "./CartItems";

interface CartListProps {
    cartList: CartItem[];
}

const CartList = ({ cartList }: CartListProps) => {
    return (
        <div className="flow-root">
            <ul role="list" className="-my-6 divide-y divide-gray-200">
                {cartList.map((product) => (
                    <CartItems product={product} />
                ))}
            </ul>
        </div>
    )
}

export default CartList
