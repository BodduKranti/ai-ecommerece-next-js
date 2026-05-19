'use client'
import React, { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { persistor, Store } from '../store/store'
import { PersistGate } from 'redux-persist/integration/react'

const ReduxProvider = ({ children }: { children: ReactNode }) => {
    return (
        <Provider store={Store}>
            <PersistGate loading={null} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    )
}

export default ReduxProvider
