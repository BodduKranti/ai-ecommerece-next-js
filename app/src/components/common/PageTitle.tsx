import React from 'react'

const PageTitle = ({ pageTitle }: { pageTitle: string }) => {
    return (
        <h1 className='text-2xl font-bold text-gray-900'>
            {pageTitle}
        </h1>
    )
}

export default PageTitle
