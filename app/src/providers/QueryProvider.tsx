'use client'

import Myapp from '@/app/Myapp'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'
import React from 'react'

const client = new QueryClient()

const QueryProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <SessionProvider basePath="/api/auth">
            <QueryClientProvider client={client}>
                <Myapp>{children}</Myapp>
            </QueryClientProvider>
        </SessionProvider>

    )
}

export default QueryProvider
