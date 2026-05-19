import React from 'react'

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='mx-auto max-w-7xl py-4 px-4 sm:px-6 lg:px-8'>
            {children}
        </div>
    )
}

export default MainLayout
