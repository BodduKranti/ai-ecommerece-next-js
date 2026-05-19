'use client'
import { useSession } from 'next-auth/react';
import React, { use, useEffect } from 'react'
import { AUTH_STATUS } from './src/types';
import { usePathname, useRouter } from 'next/navigation';
import Header from './src/components/Header/Header';

const Myapp = ({ children }: { children: React.ReactNode }) => {
    const { data: session, status } = useSession();
    const router = useRouter()
    const pathname = usePathname()
    console.log('session', session)
    console.log('status', status)
    console.log('pathname', pathname)

    const isLogged = session && status === AUTH_STATUS.AUTHENTICATED ? true : false

    useEffect(() => {

        if (status === 'loading') return;
        if (typeof window !== "undefined") {
            // const hostname = window.location.hostname;
            // // console.log('hostname', window.location.pathname)
            // const domainParts = hostname.split(".");
            // const isLocalhost = hostname.includes("localhost");
            // const currentHost = window.location.origin;
            // console.log('currenthost', currentHost)
            // console.log('domainParts', domainParts)
            // console.log('isLocalhost', isLocalhost)
            // console.log('hostname', hostname)

            if (!isLogged && (pathname.indexOf('/login') === -1)) {
                router.push('/login');
            }
            else if (isLogged && (pathname.indexOf('/login') !== -1 || window.location.pathname === '/')) {
                router.push('/products');
            }
        }

    }, [session, isLogged, pathname])

    return (
        <div className='w-full'>
            {
                session !== null &&
                    status === AUTH_STATUS.AUTHENTICATED ?
                    <Header /> : ''
            }
            {children}
        </div>
    )
}

export default Myapp
