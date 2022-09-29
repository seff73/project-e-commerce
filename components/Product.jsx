import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router'

import { urlFor } from '../lib/client';

export default function Product({ product: { image, name, slug, price } }) {
  
  const nameSplited = name.split(" by ");
  const router = useRouter();

  const handleClick = () => {
    router.push(`/product/${slug.current}`)
  }

  return (
    <div>
        {/*<Link href={`/product/${slug.current}`}>*/}
            <div className='product-card' onClick={handleClick}>
                <img 
                    src={urlFor(image && image[0])}
                    width={250}
                    height={250}
                    className='product-image'
                />
                <p className='product-name'>{nameSplited[0]}</p>
                <p className='product-name'>{nameSplited[1]}</p>
                <p className='product-price'>${price}</p>
            </div>
        {/*</Link>*/}
        
    </div>
  )
}
