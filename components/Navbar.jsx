import React, { useEffect } from 'react';
import Link from 'next/link';
import { CgShoppingCart } from 'react-icons/cg';

import { Cart } from './';
import { useStateContext } from '../context/StateContext';
import SearchBar from './SearchBar';

export default function Navbar() {
  const { showCart, setShowCart, cartItems, totalQuantities, allProducts, setSearchResult, setLocalContext, totalPrice, setTotalPrice, setTotalQuatities, setCartItems } = useStateContext();


  /*useEffect(() => {
    const localData = JSON.parse(localStorage.getItem('state'));
    localData.totalPrice && setLocalContext(localData);
    
    
  },[]);*/
  
  
  return (
    <div className='navbar-container'>
      <p className='logo'>
        <Link href='/'>Smart & Sapiens</Link>
      </p>

      <SearchBar placeholder='Search Smart and Sapiens...' data={allProducts} setSearchResult={setSearchResult}/>

      <button type='button' className='cart-icon' onClick={() => setShowCart(true)}>
        <CgShoppingCart />
        <span className='cart-item-qty'>{totalQuantities}</span>
      </button>

      {showCart && <Cart />} 
    </div>
  )
}
