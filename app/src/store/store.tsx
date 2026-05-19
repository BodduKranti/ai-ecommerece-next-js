import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import { persistStore } from "redux-persist";

import CartSliceReducer from "./slices/cartSlice";

// Type assertion to satisfy TypeScript
const createNoopStorage = () => {
    return {
        getItem(_key: string) {
            return Promise.resolve(null);
        },
        setItem(_key: string, _value: string) {
            return Promise.resolve();
        },
        removeItem(_key: string) {
            return Promise.resolve();
        },
    };
};

const storage = typeof window !== 'undefined'
    ? require('redux-persist/lib/storage').default // Use localStorage on the client
    : createNoopStorage();

const rootReducer = combineReducers({
    cart: CartSliceReducer,
    // electionlist: ElectionListReducer,
    // accountConfig: AccountConfigReducer,
    // questionForm: CreatequestionReducer,
    // emaillayout: EmailTemplatelayoutReducer,
    // election: electionReducer,
    // theme: themeReducer,
});

const persistConfig = {
    key: 'root', // Key for storage
    storage,     // Type of storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const Store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore redux-persist actions
                ignoredActions: [
                    "persist/PERSIST",
                    "persist/REHYDRATE",
                    "persist/REGISTER",
                ],
            },
        }),
})

export const persistor = persistStore(Store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof Store.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof Store.dispatch

