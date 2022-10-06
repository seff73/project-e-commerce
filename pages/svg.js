import Image from 'next/image';
import React from 'react';
import logo from '../utils/logoSmartDarkBg2.svg'
import logo2 from '../utils/logoSmart2.png'

export default function Svg() {
  return (
    <div>
        <Image 
            src={logo}
            alt='logo'
        />

        <Image
            src={logo2}
            alt='logo2'
        />
    </div>


  )
}
