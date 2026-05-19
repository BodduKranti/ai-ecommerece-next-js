'use client'
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useEffect, useState } from 'react'

interface ProductImageGalleryProps {
    images: string[],
    thumbnail: string
}

const ProductImageGallery = ({ images, thumbnail }: ProductImageGalleryProps) => {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerView, setItemsPerView] = useState(1);

    // Update items per view based on screen size
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            console.log('width', width)
            if (width >= 1501) {
                setItemsPerView(8); // md breakpoint
            }
            if (width >= 1500) {
                setItemsPerView(8); // md breakpoint
            }
            else if (width >= 1300) {
                setItemsPerView(8); // sm breakpoint
            }
            else if (width >= 1280) {
                setItemsPerView(8); // sm breakpoint
            }
            else if (width >= 640) {
                setItemsPerView(8); // sm breakpoint
            } else {
                setItemsPerView(8); // xs
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const maxIndex = Math.max(0, images.length - itemsPerView);

    const goToPrevious = () => {
        setCurrentIndex((prev) => Math.max(0, prev - 1));
    };

    const goToNext = () => {
        setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
    };

    // Calculate translation percentage
    const getTranslateValue = () => {
        const itemWidth = 100 / itemsPerView;
        return -(currentIndex * itemWidth);
    };
    console.log('itemsPerView', itemsPerView)
    return (
        <div className='md:w-1/2 w-full'>
            <div className='w-full h-62.5'>
                <img src={thumbnail} alt='Product Image'
                    className='w-full h-full object-contain rounded-lg' />
            </div>

            {/* imageGallery */}
            <div className="relative group md:px-4 px-2 my-4">
                <div className="overflow-hidden">
                    <div
                        className="flex transition-transform duration-500 ease-out"
                        style={{ transform: `translateX(${getTranslateValue()}%)` }}
                    >
                        {images.map((image, index) => (
                            <div
                                key={index}
                                className="shrink-0 px-1 "
                                style={{ width: `${100 / itemsPerView}%` }}
                            >
                                <div className='w-full h-full bg-gray-200 p-2'>
                                    <img src={image} alt='Product Image' className='w-full h-full object-contain' />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Navigation Buttons */}
                <button
                    onClick={goToPrevious}
                    disabled={currentIndex === 0}
                    className="absolute md:group-hover:block md:hidden block left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                    aria-label="Previous slide"
                >
                    <ChevronLeft className="w-6 h-6 text-gray-800" />
                </button>

                <button
                    onClick={goToNext}
                    disabled={currentIndex >= maxIndex}
                    className="absolute md:group-hover:block md:hidden block right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                    aria-label="Next slide"
                >
                    <ChevronRight className="w-6 h-6 text-gray-800" />
                </button>
            </div>

        </div>
    )
}

export default ProductImageGallery
