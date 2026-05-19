import Cartpagesection from '@/app/src/components/cart/Cartpagesection'
import SubtotalCard from '@/app/src/components/cart/SubtotalCard'
import PageTitle from '@/app/src/components/common/PageTitle'
import MainLayout from '@/app/src/components/layout/MainLayout'
import React from 'react'

const CartPage = () => {

    return (
        <MainLayout>
            <PageTitle pageTitle='Cart' />

            <div className='w-full md:flex grid grid-cols-1 gap-4 mt-4'>
                <div className='md:w-2/3 w-full'>
                    <Cartpagesection />
                </div>
                <div className='md:w-1/3 w-full'>
                    <SubtotalCard />
                </div>
            </div>
        </MainLayout>
    )
}

export default CartPage
