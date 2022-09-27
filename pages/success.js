import React, { useEffect } from 'react';
import Link from 'next/link';
import { BsBagCheckFill } from 'react-icons/bs';

import { useStateContext } from '../context/StateContext';

export default function success() {
    const { setCartItems, setTotalPrice, setTotalQuantities, setShowCart } = useStateContext();

    useEffect(() => {
      //setShowCart(false)
      localStorage.clear();
      setCartItems([]);
      setTotalPrice(0);
      setTotalQuantities(0);
      
      
    }, []);

  return (
    <div className='success-wraper'>
        <div className='success'>
            <p className='icon'>
                <BsBagCheckFill />
            </p>
            <h2>Thank you for your order!</h2>
            <p className='email-msg'>Check your email inbox for the receipt.</p>
            <p className='description'>
                If you have any questions, please email
                <a className='email' href='mailto:seff73@gmail.com'>
                  support@smartandsapiens.com
                </a>
            </p>
            <Link href='/'> 
                <button type='button' width='300px' className='btn'>  
                    Continue Shopping
                </button>
            </Link>
        </div>
    </div>
  )
}
