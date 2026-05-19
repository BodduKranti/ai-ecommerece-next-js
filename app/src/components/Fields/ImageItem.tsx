import Image from 'next/image';
import React from 'react'
interface ImageItemProps {
    src: string;
    alt: string;
    className: string;
}

const ImageItem = ({ src, alt, className }: ImageItemProps) => {
    return (
        <Image
            src={src}
            alt={alt}
            width={150}
            height={150}
            objectFit='fill'
            className={className}
        />

    )
}

export default ImageItem
