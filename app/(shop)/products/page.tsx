'use client'

import LoaderPage from '@/app/src/components/common/LoaderPage'
import NoRecords from '@/app/src/components/common/NoRecords'
import Pagination from '@/app/src/components/common/Pagination'
import FieldsComponent from '@/app/src/components/Fields/FieldsComponent'
import MainLayout from '@/app/src/components/layout/MainLayout'
import ProductsList from '@/app/src/components/Products/ProductsList'
import { useProductsListMethod } from '@/app/src/hooks/products/useProducts'
import { useState } from 'react'

const ProductPage = () => {
    // Pagination
    // pagination setup   
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [search, setSearch] = useState<string>('')

    let skip: any = (page - 1) * rowsPerPage

    const { data: list, isLoading }: any = useProductsListMethod(skip, rowsPerPage, search)
    const products = list !== undefined ? list?.products : []
    // console.log('list', list !== undefined ? list?.products : [])


    const count = list ? Math.ceil(list?.total / rowsPerPage) : 0

    return (
        <MainLayout>
            <div className='w-1/2'>
                {/* <FieldsComponent
                                    name='search'
                                    type='text'
                                    placeholder='Search Product Title'
                                    Onchange={(e: any) => {
                                        setSearch(e.target.value)
                                        setPage(1)
                                    }}
                                /> */}
                <input
                    type='text'
                    name='search'
                    data-testid={`dashboard-search`}
                    value={search}
                    id="filterSearch"
                    className="form-control w-full"
                    placeholder="Search Product Title"
                    onChange={(e: any) => {
                        setSearch(e.target.value)
                        setPage(1)
                    }}
                />
            </div>
            {
                isLoading ?
                    <LoaderPage />
                    :
                    list !== undefined && products?.length > 0 ?
                        <>
                            <ProductsList products={products} />
                            <div className='w-full flex justify-end pt-5'>
                                <Pagination
                                    pageCount={count}
                                    pageNumber={page}
                                    setPerPage={setPage}
                                    rowsPerPage={rowsPerPage}
                                    itemslength={list?.total}
                                />
                            </div>

                        </>
                        :
                        <NoRecords Message='No products found.' />
            }


        </MainLayout>
    )
}

export default ProductPage
