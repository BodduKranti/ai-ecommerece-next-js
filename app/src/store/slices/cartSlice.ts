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
    total: number
}

const initialState: CartState = {
    items: [],
    total: 0
};

const CartSlice = createSlice({
    name: "cart",
    initialState,

    reducers: {
        addToCart: (
            state: any,
            action: PayloadAction<CartItem>
        ) => {
            const existingItem = state.items.find(
                (item: CartItem) => item.id === action.payload.id
            );

            if (existingItem) {
                // Increase quantity if item already exists
                existingItem.quantity += action.payload.quantity;
            } else {
                // Add new item
                state.items.push({
                    ...action.payload,
                    quantity: action.payload.quantity || 1,
                });
            }
            state.total = state.items.reduce(
                (sum: number, item: any) => sum + item.price * item.quantity,
                0
            );
            console.log("updated cart", state.items);
            console.log("state.total", state.total);
        },

        removeFromCart: (
            state,
            action: PayloadAction<string>
        ) => {
            state.items = state.items.filter(
                (item) => item.id !== action.payload
            );
            state.total = state.items.reduce(
                (sum: number, item: any) => sum + item.price * item.quantity,
                0
            );
            console.log("state.total", state.total);

        },

        subtotal: (state: any) => {
            state.total = state.items.reduce(
                (sum: number, item: any) => sum + item.price * item.quantity,
                0
            );
            console.log('subtotal', state.total)
        }
    },
});

export const {
    addToCart,
    removeFromCart,
    subtotal
} = CartSlice.actions;

export default CartSlice.reducer;