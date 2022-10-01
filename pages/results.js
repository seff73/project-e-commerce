import Link from 'next/link';
import React from 'react'
import { Product } from '../components'
import { useStateContext } from '../context/StateContext'
import { useRouter } from 'next/router';

export default function Results() {
    const { searchResult, allProducts } = useStateContext();
    const router = useRouter();

    const handleClick = () => {
        router.push('/');
    }
  return (
    <div>
        <div className='products-container'>
        {searchResult[0]? searchResult.map((product) => <Product key={product._id} product={product} />)
        :
          <>
            <div className='empty-result-container'>
                <p className='empty-result'>Sorry! No result found:(
                </p>
                <p className='empty-result-desc'>
                    We are sorry what you were looking for. Please try another search
                </p>
                <button type='button' onClick={handleClick}>Smart and Sapiens</button>
            </div>
            <div className='products-container'>
                {allProducts?.map((product) => 
                    <Product key={product._id} product={product} />
                )}
            </div>
          </>}
        </div>
    </div>
  )
}
