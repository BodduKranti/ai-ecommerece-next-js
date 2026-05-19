import {
    createSlice,
    PayloadAction,
} from "@reduxjs/toolkit";

interface CartItem {
    id: string;
    title: string;
    price: number;
    thumbnail: string;
    quantity: number;
}

interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: [],
};

const CartSlice = createSlice({
    name: "cart",
    initialState,

    reducers: {
        addToCart: (
            state,
            action: PayloadAction<CartItem>
        ) => {
            state.items.push(action.payload);
        },

        removeFromCart: (
            state,
            action: PayloadAction<string>
        ) => {
            state.items = state.items.filter(
                (item) => item.id !== action.payload
            );
        },
    },
});

export const {
    addToCart,
    removeFromCart,
} = CartSlice.actions;

export default CartSlice.reducer;