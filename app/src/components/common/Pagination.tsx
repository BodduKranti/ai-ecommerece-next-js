'use client'
import React, { Dispatch, FC, SetStateAction } from 'react'

import { usePagination } from '../../hooks/pagination/usePagination';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Paginationprops {
    pageCount: number,
    pageNumber: number,
    setPerPage: Dispatch<SetStateAction<any>>,
    rowsPerPage: any,
    itemslength: any
}

const Pagination: FC<Paginationprops> = ({
    pageCount,
    pageNumber,
    setPerPage,
    rowsPerPage,
    itemslength
}) => {

    const paginationRange = usePagination({
        totalPageCount: Math.ceil(itemslength / rowsPerPage),
        currentPage: pageNumber,
    });

    const handlePageChange = (value: number) => {
        setPerPage(value);
    };
    const pageNum: any = [];
    for (let i = 1; i <= pageCount; i++) {
        pageNum.push(i)
    }


    const handleNextPage = (itemsLength: number) => {
        if (pageNumber * rowsPerPage < itemsLength) {
            setPerPage(pageNumber + 1);
        }
    };

    const handlePreviousPage = () => {
        if (pageNumber > 1) {
            setPerPage(pageNumber - 1);
        }
    };

    let DOTS = "..."

    return (
        <div className="voters-table-footer__pagination">
            <button
                type='button'
                disabled={pageNumber === 1}
                className='voters-pagination__btn'
                onClick={() => handlePreviousPage()}
            >
                <ChevronLeft className='w-4 h-4' />
            </button>
            {paginationRange.map((num, index) => (
                <button
                    key={index}
                    className={`voters-pagination__btn 
                        ${num === DOTS
                            ? 'pointer-events-none text-gray-400 border-0! text-[13px]!'
                            : pageNumber === num
                                ? 'is-active'
                                : ''
                        }`}
                    onClick={() => typeof num === 'number' && handlePageChange(num)}
                >
                    {num}
                </button>
            ))}
            <button
                type='button'
                className='voters-pagination__btn'
                onClick={() => handleNextPage(itemslength)}
                disabled={pageNumber * rowsPerPage >= itemslength}>
                <ChevronRight className='w-4 h-4' />
            </button>
        </div>
    )
}

export default Pagination
