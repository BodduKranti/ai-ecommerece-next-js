import { signOutHandler } from '../../utils/Methds';
import { useState } from 'react';
import { Search, ShoppingCart, SquareMenu } from 'lucide-react';
import { PopoverGroup } from '@headlessui/react';
import { navigation } from './Navigation';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import HeaderCart from '../cart/HeaderCart';

const Header = () => {

    const { data: session, status }: any = useSession()

    const [open, setOpen] = useState<boolean>(false)

    const authenticatedPages = [
        {
            name: 'Login',
            href: '/login',
            auth: status === 'authenticated' ? false : true
        },
        {
            name: 'Register',
            href: '/register',
            auth: status === 'authenticated' ? false : true
        }
    ]

    return (
        <header className="relative bg-white">
            <p className="flex h-10 items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
                Get free delivery on orders over $100
            </p>

            <nav aria-label="Top" className="w-full">
                <div className="border-b border-gray-200">

                    <div className="flex h-16 items-center mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <button
                            type="button"
                            onClick={() => setOpen(true)}
                            className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
                        >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Open menu</span>
                            <SquareMenu aria-hidden="true" className="size-6" />
                        </button>

                        {/* Logo */}
                        <div className="ml-4 flex lg:ml-0">
                            <a href="#">
                                <span className="sr-only">Your Company</span>
                                <img
                                    alt=""
                                    src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                                    className="h-8 w-auto"
                                />
                            </a>
                        </div>

                        {/* Flyout menus */}
                        <PopoverGroup className="hidden lg:ml-8 lg:block lg:self-stretch">
                            <div className="flex h-full space-x-8">
                                {navigation.pages.map((page: any) => (
                                    <Link
                                        key={page.name}
                                        href={page.href}
                                        className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                                    >
                                        {page.name}
                                    </Link>
                                ))}
                            </div>
                        </PopoverGroup>

                        <div className="ml-auto flex items-center">
                            <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                                {
                                    status !== 'authenticated' &&
                                    authenticatedPages.map((page: any, index: number) => (
                                        page.auth &&
                                        <>
                                            <Link href="#" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                                                {page.name}
                                            </Link>
                                            {index >= 0 && index !== authenticatedPages.length - 1 && <span aria-hidden="true" className="h-6 w-px bg-gray-200" />}
                                        </>

                                    ))
                                }

                                {
                                    status === 'authenticated' &&
                                    <div onClick={signOutHandler} className='px-3 py-1 bg-red-600 rounded text-sm w-30 flex justify-center items-center text-white cursor-pointer'>
                                        Sign Out
                                    </div>

                                }

                                {/* <a href="#" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                                    Sign in
                                </a>
                                <span aria-hidden="true" className="h-6 w-px bg-gray-200" />
                                <a href="#" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                                    Create account
                                </a> */}
                            </div>

                            <div className="hidden lg:ml-8 lg:flex">
                                <Link href="#" className="flex items-center text-gray-700 hover:text-gray-800">
                                    <img
                                        alt=""
                                        src="https://tailwindcss.com/plus-assets/img/flags/flag-canada.svg"
                                        className="block h-auto w-5 shrink-0"
                                    />
                                    <span className="ml-3 block text-sm font-medium">CAD</span>
                                    <span className="sr-only">, change currency</span>
                                </Link>
                            </div>

                            {/* Search */}
                            <div className="flex lg:ml-6">
                                <Link href="#" className="p-2 text-gray-400 hover:text-gray-500">
                                    <span className="sr-only">Search</span>
                                    <Search aria-hidden="true" className="size-6" />
                                </Link>
                            </div>

                            {/* Cart */}
                            <HeaderCart />

                        </div>

                    </div>
                </div>
            </nav>

        </header>
    )
}

export default Header
