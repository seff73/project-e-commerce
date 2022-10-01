import React from 'react';
import { AiFillInstagram, AiOutlineTwitter } from 'react-icons/ai'

export default function Footer() {
  return (
    <div className='footer-container'>
      <p>Copyright © 2022 Smart and Sapiens</p>
      <p className='icons'>
        <AiFillInstagram />
        <AiOutlineTwitter />
      </p>
    </div>
  )
}
