'use client'
import Breadcrumb from '@/app/src/components/Breadcrumb/Breadcrumb';
import LoaderPage from '@/app/src/components/common/LoaderPage';
import NoRecords from '@/app/src/components/common/NoRecords';
import MainLayout from '@/app/src/components/layout/MainLayout';
import ProductDetails from '@/app/src/components/Products/ProductDetails';
import { useProductbyIDMethod } from '@/app/src/hooks/products/useProducts';
import { BreadcrumbItemprops } from '@/app/src/types';
import { useSearchParams } from 'next/navigation';

const page = () => {
    const searchParams = useSearchParams();
    const product_id = searchParams.get('id');

    const { data: product, isLoading } = useProductbyIDMethod(product_id ? product_id : '')
    console.log('product Details', product !== undefined && product)

    const breadcrumbs: BreadcrumbItemprops[] = [
        { id: 1, pagename: 'Home', href: '/' },
        { id: 2, pagename: product?.category, href: `/products/category/${product?.category}` },
        { id: 3, pagename: product !== undefined && product?.title ? product?.title : '', href: '' }
    ]

    return (
        <MainLayout>
            {
                isLoading ?
                    <LoaderPage />
                    :
                    product !== undefined && Object.keys(product).length > 0 ?
                        <>
                            <Breadcrumb breadcrumbs={breadcrumbs} />
                            <ProductDetails productDetails={product} />
                        </>

                        :
                        <NoRecords Message='Product not found.' />
            }

        </MainLayout>
    )
}

export default page
